import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import checkErrors from './errors/checkErrors.js';

const app = express();
const { PORT = 3000 } = process.env;

await mongoose.connect('mongodb://localhost:27017/mestodb');
console.log('MongoDB connected');

app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
  checkErrors(err, res, next);
});
app.listen(PORT);
