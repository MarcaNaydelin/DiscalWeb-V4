const Padre = require('../models/Padre');
const { encriptarPassword, compararPassword, crearToken } = require('../services/authService');

exports.registrar = async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    const existente = await Padre.buscarPorCorreo(correo);
    if (existente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await encriptarPassword(password);
    const nuevoPadre = await Padre.crearPadre(nombre, correo, hashedPassword);
    res.status(201).json({ message: 'Padre registrado', padre: nuevoPadre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar padre' });
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const padre = await Padre.buscarPorCorreo(correo);
    if (!padre) return res.status(404).json({ message: 'Usuario no encontrado' });

    const coincide = await compararPassword(password, padre.password);
    if (!coincide) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = crearToken(padre.id);
    res.json({ token, padre: { id: padre.id, nombre: padre.nombre, correo: padre.correo } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
