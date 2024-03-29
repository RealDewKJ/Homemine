import {Schema, model} from 'mongoose'

export interface User{
    id: string;
    email: string;
    name: string;
    password: string;
    address: string;
    googleAccess: boolean;
    isAdmin: boolean;
    imageUrl: string
  }

  export const  UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true,}, // unique:true
    password: {type: String, required: true},
    address: {type: String, required: true},
    googleAccess: {type: Boolean, required: true},
    isAdmin: {type: Boolean, required: true},
    imageUrl: {type: String}
  }, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
  })

  export const UserModel = model('user', UserSchema)
  