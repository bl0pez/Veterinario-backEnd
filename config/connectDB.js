import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        const url = `${db.connection.host}:${db.connection.port}/${db.connection.name}`;
        console.log(`Connect to ${url}`);
    } catch (error) {
        console.log(`Error_connectMongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDB;