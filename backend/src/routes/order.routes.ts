import  asyncHandler  from 'express-async-handler';
import { Router } from 'express';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';
import verifyToken from '../middleware/authJwt';
import { dbConnect } from '../config/db.config';
import { FurnitureModel } from '../models/furniture.model';

const omise = require('omise')({
    secretKey: process.env.OMISE_SECRET_KEY,
    omiseVersion: '2019-05-29'
})

const router = Router();

router.post('/create',verifyToken,
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;
    if (requestOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty')
        return
    }

    await OrderModel.deleteOne({
        user: req.userId,
        status: 'pending'
    })

    const newOrder = new OrderModel({...requestOrder, user: req.userId});
    await newOrder.save()
    res.send(newOrder)
}))

router.get('/newOrderForCurrentUser', verifyToken,
asyncHandler(async (req:any, res) => {
    const order = await OrderModel.findOne({user: req.userId, status: 'pending'})
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}))

router.get('/getId/:orderId', asyncHandler(
  async (req:any, res:any) => {
    const orderId = req.params.orderId;
    const order = await OrderModel.findOne({ orderId: orderId });

    if (order) {
      res.send(order);
    } else {
      res.status(HTTP_BAD_REQUEST).send();
    }
  }
));


const createCharge = (source:any, amount:any, orderId:any) => {
    return new Promise((resolve, reject) => {
      omise.charges.create({
        amount: (amount * 100),
        currency: 'THB',
        return_uri: `http://localhost:4200/success?order=${orderId}`,
        metadata: {
          orderId
        },
        source,
      }, (err:any, resp:any) => {
        if (err) {
          return reject(err)
        }
        resolve(resp)
      })
    })
  }

router.post('/placeOrder',verifyToken, asyncHandler(
    async (req:any, res:any) => {
        const userUid = req.userId
        const checkoutData = req.body.checkout
        let omiseResponse:any = {}
      
        try {
          const { session }:any = await dbConnect();
      
          await session.withTransaction(async () => {
            const orderData = await OrderModel.findOne({ _id: checkoutData.id });
              for (const product of orderData!.items) {
                const productRef = await FurnitureModel.findOne({ _id: product.furniture.id });
                if (productRef!.remainQuantity - product.quantity < 0) {
                  throw new Error(`Product ${productRef!.name} out of stock`);
                }
                await FurnitureModel.updateOne(
                  { _id: product.furniture.id },
                  { $set: { remainQuantity: productRef!.remainQuantity - product.quantity } }
                )
              }
          });
      
          // Close the connection after the transaction
          await session?.endSession();
        } catch (error) {
          // console.error('Transaction aborted:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
        
        omiseResponse = await createCharge(
            req.body.source,
            checkoutData.totalPrice,
            checkoutData._id
          )

            res.json({
                message: 'Hello',
                redirectUrl: omiseResponse.authorize_uri
            })
          const orderData = {
            chargeId: omiseResponse.id, // นำ charge id ไปเก็บใน order
            name: checkoutData.name,
            address: checkoutData.address,
            addressLatLng: checkoutData.addressLatLng,
            note: checkoutData.note || '',
            totalPrice: checkoutData.totalPrice,
            paymentMethod: omiseResponse.source.type,
            items: checkoutData.items,
            status: 'pending',
            orderId: checkoutData._id,
          }
          await OrderModel.deleteOne({
            user: req.userId,
            status: 'pending'
        })
    
        const newOrder = new OrderModel({...orderData, user: req.userId});
        await newOrder.save()
        res.send(newOrder)
    }
))


router.post('/webhook', async (req, res) => {
  // console.log(req.body)
  try {
    if (req.body.key === 'charge.complete') {
      const paymentData = req.body.data
      const chargeId = paymentData.id
      const orderId = paymentData.metadata.orderId
      const statusOrder = paymentData.status
      const orderData = await OrderModel.findOne({ orderId: orderId });

      // check correct order
      if (
        orderData!.chargeId === chargeId &&
        orderData!.status === 'pending'
      ) {
        await OrderModel.updateOne(
          { _id: orderData!._id },
          { $set: { status: paymentData.status } }
        )
        try {
          const { session }:any = await dbConnect();
      
          await session.withTransaction(async () => {
            if (statusOrder !== 'successful') {
              for (const product of orderData!.items) {
                const productRef = await FurnitureModel.findOne({ _id: product.furniture.id });
                await FurnitureModel.updateOne(
                  { _id: product.furniture.id },
                  { $set: { remainQuantity: productRef!.remainQuantity + product.quantity } }
                )
              }
            }
          });
      
          // Close the connection after the transaction
          await session?.endSession();
        } catch (error) {
          // console.log('Transaction aborted:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      
      console.log('success data', {
        chargeId,
        orderId
      })
    }
  } catch (error) {
    console.log('error', error)
  }
})
export default router;