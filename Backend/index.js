const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const childRoutes = require('./routes/childRoutes');
const gameAppRoutes = require('./routes/game.app.routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//Rutas de API 
app.use('/api/auth', authRoutes);
app.use('/api/children', childRoutes);
app.use('/api/app/games', gameAppRoutes);

app.get('/', (req, res) => {
  res.send('✅ Servidor backend de DiscalWeb en funcionamiento');
});

// Manejo de errores global simple (opcional pero recomendado)
app.use((err, req, res, next) => {
  console.error("----- ERROR NO CAPTURADO -----");
  console.error(err.stack);
  console.error("-----------------------------");
  res.status(500).send('¡Algo salió muy mal en el servidor!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});