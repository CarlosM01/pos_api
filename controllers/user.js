import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'El username y el password son obligatorios' });
  }

  try {
    let role = 'user'; // Rol predeterminado

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'Usuario registrado',
      userId: newUser.id,
      role: newUser.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'El username y el password son obligatorios' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al iniciar sesión' });
  }
};

export const profile = (req, res) => {
  if (req.user) {
    res.json({
      message: 'Acceso permitido',
      username: req.user.username,
      role: req.user.role,
    });
  } else {
    res.status(401).json({ error: 'Acceso no autorizado' });
  }
};
