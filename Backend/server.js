require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

console.log('Mongo URI:', process.env.MONGO_URL);

const app = express();
app.use(cors({
  origin: 'https://ecommerce-new-demo.vercel.app/', // replace with your actual frontend URL
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected")
  app.listen(PORT, () => {
    console.log('Server running on port', process.env.PORT);
  });
}).catch((err) => console.error(err) 
)
