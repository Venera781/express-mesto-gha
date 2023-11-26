import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const app = express();
const { PORT = 3000 } = process.env;

await mongoose.connect('mongodb://localhost:27017/mestodb');
console.log('MongoDB connected');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6560bd24ca3617eeee046211',
  };
  next();
});
app.use(routes);
app.listen(PORT);
