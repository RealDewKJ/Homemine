import {model, Schema, Types} from 'mongoose';
import { Furniture, FurnitureSchema } from './furniture.model';
import { OrderStatus } from '../constants/order_status';

export interface LatLng{
    lat: string;
    lng: string;
}

export const LatLngSchema = new Schema<LatLng>(
    {
        lat: {type: String, required: true},
        lng: {type: String, required: true}
    }
)

export interface OrderItem {
    furniture: Furniture;
    price: number;
    quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        furniture: {type: FurnitureSchema, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true}
    }
)

export interface Order {
    id: string;
    chargeId: string
    items:OrderItem[]
    totalPrice:number
    name: string
    address: string
    addressLatLng: LatLng
    paymentId: string
    status: OrderStatus
    orderId: string
    user: Types.ObjectId
    createdAt: Date
    updatedAt: Date
  }

  const orderSchema = new Schema<Order>({
    name: {type: String, required: true},
    chargeId: {type: String},
    address: {type: String, required: true},
    addressLatLng: {type: LatLngSchema, required: true},
    paymentId: {type: String},
    totalPrice: {type: Number, required: true},
    items: {type:[OrderItemSchema], required: true},
    status: {type: String, default: OrderStatus.PENDING},
    orderId: {type: String},
    user: {type: Schema.Types.ObjectId, required: true}
  }, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
  })

  export const OrderModel = model('order', orderSchema)