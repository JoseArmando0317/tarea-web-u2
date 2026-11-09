const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Definir las rutas HTTP y conectarlas con el controlador
router.get('/reservas', reservaController.obtenerReservas);
router.post('/reservas', reservaController.crearReserva);

module.exports = router;