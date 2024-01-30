import {connect, ConnectOptions, startSession} from 'mongoose'

const mongoURL = process.env.MONGO_URI;
export const dbConnect = async () => {
    try {
        await connect(mongoURL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        const session = await startSession();
        console.log('Connected to MongoDB successfully');
        return { session };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
