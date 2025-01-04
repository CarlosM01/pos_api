import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    let role = 'user'; // Default role

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'User registered',
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error registering user' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
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
    res.status(500).json({ error: error.message || 'Error logging in' });
  }
};

export const profile = (req, res) => {
  if (req.user) {
    res.json({
      message: 'Access granted',
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    });
  } else {
    res.status(401).json({ error: 'Unauthorized access' });
  }
};

// PUT method to update user profile
export const updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.user.id;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Encrypt new password

    await user.save();

    res.json({
      message: 'Profile updated',
      userId: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error updating profile' });
  }
};

// DELETE method to remove a user
export const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error deleting user' });
  }
};
