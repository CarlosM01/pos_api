// /db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // This will create a database file in your project root
  // You can customize the path as needed
});

// Function to test the database connection
const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
    }
  };

testConnection();

export default sequelize;

//Environment variables are used to keep sensitive information secure