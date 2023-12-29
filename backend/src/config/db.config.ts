import {connect, ConnectOptions} from 'mongoose'

const mongoURL = process.env.MONGO_URI;
export const dbConnect = () => {
    connect(mongoURL!,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () =>  console.log('Connect Successfully'),
        (error) => console.log(error)
    )
}