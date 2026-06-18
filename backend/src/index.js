const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectMongo } = require('./mongo');

// Load environment variables from backend/.env
dotenv.config({ path: __dirname + '/../.env' });
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // allow large Base64 images

// Connect to MongoDB
connectMongo();

// Routes
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Spice Shop Backend is running');
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
