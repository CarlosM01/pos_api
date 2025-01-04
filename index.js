import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db.js';
import cors from 'cors'

import userRouter from './routes/user.js';
import productsRouter from './routes/products.js';


const PORT = process.env.PORT || 8080

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.use('/user', userRouter);
app.use('/products', productsRouter)

app.get('/', (req, res) => {
  res.send('API funcionando');
});


(async () => {
  try {
    await sequelize.authenticate();  // Verifiy connection with Sequelize 
    console.log('Database connection established');

    await sequelize.sync({ alter: true });  // Synchronize tables
    console.log('Models synchronized with the database');

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error starting the application:', error);
  }
})();