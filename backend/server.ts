import express, { Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import QnArouter from './routes/question';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
// app.use('/api/users', userRouter);
app.use('/api/qna', QnArouter);

// Custom error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});