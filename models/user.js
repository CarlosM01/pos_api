import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Asegúrate de exportar sequelize en index.mjs

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
