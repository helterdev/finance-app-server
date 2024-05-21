import mongoose from 'mongoose';
import accessenv from '../config';

const DATABASE = accessenv.DATABASE!;

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
