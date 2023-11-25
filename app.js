import express from 'express';
import mongoose from 'mongoose';
import users from './routes/user.js';
import cards from './routes/card.js';

const app = express();
const { PORT = 3000 } = process.env;

await mongoose.connect('mongodb://localhost:27017/mestodb');
console.log('MongoDB connected');

app.listen(PORT);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6560bd24ca3617eeee046211',
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Путь не найден' });
});
