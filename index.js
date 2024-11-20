import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db.js';
import cors from 'cors'

import authRouter from './routes/user.js';
import productsRouter from './routes/products.js';


const PORT = process.env.PORT || 8080

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', productsRouter)

app.get('/', (req, res) => {
  res.send('API funcionando');
});


(async () => {
  try {
    await sequelize.authenticate();  // Verificar la conexión
    console.log('Conexión a la base de datos establecida');

    await sequelize.sync({ alter: true });  // Sincronizar tablas
    console.log('Modelos sincronizados con la base de datos');

    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
})();