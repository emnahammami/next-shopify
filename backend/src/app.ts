const express = require('express');
const mongoose = require('mongoose');
import productRoutes from './routes/productRoutes';
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://emna:MANA123mana123@products.ve86cpe.mongodb.net/', {
  
});
const db = mongoose.connection;

// Écouter l'événement de connexion réussie
db.on('connected', () => {
  console.log('Connecté à MongoDB avec succès');
});

// Écouter l'événement d'erreur de connexion
db.on('error', (err:any) => {
  console.error(`Erreur de connexion à MongoDB : ${err.message}`);
});
// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
