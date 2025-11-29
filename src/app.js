require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');

const app = express();

const userRoutes = require('./routes/user.routes');
const zoneRoutes = require('./routes/zone.routes');
const deviceRoutes = require('./routes/device.routes');
const sensorRoutes = require('./routes/sensor.routes');
const readingRoutes = require('./routes/reading.routes');

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/readings', readingRoutes);

app.get('/', (req, res) => {
    res.send('Smart City API se esta ejecutando');
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});