import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.DATABASE!;

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE);
    console.log('Database connected');
  } catch (error) {
    if (error instanceof mongoose.Error) {
      console.log('Error Moongose:', error.message);
    }
    console.log('General Error:', error);
  }
};
