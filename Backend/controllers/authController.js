const Parent = require('../models/Parent');
const { encriptarPassword, compararPassword, crearToken } = require('../services/authService');

exports.registrar = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Parent.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await encriptarPassword(password);
    const newParent = await Parent.createParent(name, email, hashedPassword);
    res.status(201).json({ message: 'Padre registrado correctamente', parent: newParent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar al padre' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const parent = await Parent.findByEmail(email);
    if (!parent) return res.status(404).json({ message: 'Usuario no encontrado' });

    const match = await compararPassword(password, parent.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = crearToken(parent.id);
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      parent: {
        id: parent.id,
        name: parent.name,
        email: parent.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};