import { Router } from 'express';
import User from '../models/User';

const QnArouter = Router();

QnArouter.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

QnArouter.post('/', async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.json(savedUser);
});

export default QnArouter;