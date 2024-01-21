import  asyncHandler  from 'express-async-handler';
import { Router } from 'express';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';



const router = Router();

router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;
    if (requestOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty')
        return
    }

    await OrderModel.deleteOne({
        user: req.userId,
        status: OrderStatus.NEW
    })

    const newOrder = new OrderModel({...requestOrder, user: req.userId});
    await newOrder.save()
    res.send(newOrder)
}))

router.get('/newOrderForCurrentUser', 
asyncHandler(async (req:any, res) => {
    const order = await OrderModel.findOne({user: req.userId, status: OrderStatus.NEW})
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}))

export default router;