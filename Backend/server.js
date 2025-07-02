require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

console.log('Mongo URI:', process.env.MONGO_URL);

const app = express();

// ✅ CORS Options
const corsOptions = {
  origin: "https://ecommerce-new-demo.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 200
};

// ✅ Apply CORS Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight for all routes

app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  // These two options are deprecated in latest driver, safe to remove or keep
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => console.error(err));
