import mongoose, { Document, Schema } from "mongoose";

interface IQnA extends Document {
  question: string;
  answer: string;
  category: string;
  subcategory: string;
}

const QnA: Schema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IQnA>("AllQna", QnA);
