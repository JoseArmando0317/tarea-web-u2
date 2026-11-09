const db = require('../config/db');

exports.obtenerReservas = async (req, res) => {
    try {
        const [reservas] = await db.query('SELECT * FROM reservas');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error', error });
    }
};

exports.crearReserva = async (req, res) => {
    const { huesped, habitacion, fecha_entrada } = req.body;
    if (!huesped || !habitacion || !fecha_entrada) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }
    try {
        const [resultado] = await db.query(
            'INSERT INTO reservas (huesped, habitacion, fecha_entrada) VALUES (?, ?, ?)',
            [huesped, habitacion, fecha_entrada]
        );

        // Evento en tiempo real
        const io = req.app.get('io');
        io.emit('nueva_reserva', { id: resultado.insertId, huesped, habitacion });

        res.status(201).json({ mensaje: 'Reserva creada exitosamente', id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error', error });
    }
};