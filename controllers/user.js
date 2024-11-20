import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'El username, email y password son obligatorios' });
  }

  try {
    let role = 'user'; // Rol predeterminado

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'Usuario registrado',
      userId: newUser.id,
      email: newUser.email,
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
      email: user.email,
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
      email: req.user.email,
      role: req.user.role,
    });
  } else {
    res.status(401).json({ error: 'Acceso no autorizado' });
  }
};

// Método PUT para actualizar el perfil de usuario
export const updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.user.id;

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los campos si se proporcionan
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Encriptar nueva contraseña

    await user.save();

    res.json({
      message: 'Perfil actualizado',
      userId: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al actualizar el perfil' });
  }
};

// Método DELETE para eliminar un usuario
export const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar al usuario
    await user.destroy();

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al eliminar el usuario' });
  }
};
