import { Schema, model } from "mongoose";

export interface Furniture {
    id:string;
    name:string;
    price:number;
    tags:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
}

export const FurnitureSchema = new Schema<Furniture>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String]},
        favorite: {type: Boolean, default: false},
        imageUrl: {type: String, required: true},
        stars: {type: Number, required: true},
        origins: {type: [String], required: true},
    },{
        toJSON:{
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
)

export const FurnitureModel = model<Furniture>('furniture', FurnitureSchema)