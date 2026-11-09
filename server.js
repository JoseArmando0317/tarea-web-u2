const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use(express.json());

// Pasar 'io' a las rutas
app.set('io', io);

const reservasRoutes = require('./routes/reservasRoutes');
app.use('/api', reservasRoutes);

io.on('connection', (socket) => {
    console.log('Cliente conectado');
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});