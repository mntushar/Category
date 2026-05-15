import mongoose from 'mongoose';

export async function connectMongoDB(uri: string): Promise<void> {
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
