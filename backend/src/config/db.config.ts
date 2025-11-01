import {connect, ConnectOptions, startSession} from 'mongoose'

const mongoURL = process.env.MONGO_URI;
export const dbConnect = async () => {
    try {
        if (!mongoURL) {
            throw new Error('MONGO_URI environment variable is not defined');
        }
        
        await connect(mongoURL);
        const session = await startSession();
        console.log('Connected to MongoDB successfully');
        return { session };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        if (error instanceof Error) {
            if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
                console.error('\n⚠️  DNS Resolution Error - Possible causes:');
                console.error('   1. Check your internet connection');
                console.error('   2. Verify MongoDB Atlas connection string is correct');
                console.error('   3. Ensure MongoDB Atlas allows connections from your IP address');
                console.error('   4. Check if using correct SRV connection string format');
            }
        }
        throw error;
    }
}
 