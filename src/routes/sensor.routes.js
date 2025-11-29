const express = require('express');
const router = express.Router();
const SensorService = require('../services/sensor.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       required:
 *         - type
 *         - unit
 *         - location
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *           enum: [temperature, humidity, co2, noise]
 *           description: Tipo de medición
 *         unit:
 *           type: string
 *           description: Unidad de medida (ej. °C, %, ppm)
 *         model:
 *           type: string
 *         location:
 *           type: string
 *           description: Coordenadas o descripción de ubicación
 *         isActive:
 *           type: boolean
 *           default: true
 *       example:
 *         type: temperature
 *         unit: "°C"
 *         model: DHT22
 *         location: "Pasillo Principal - Techo"
 *         isActive: true
 */

/**
 * @swagger
 * tags:
 *   name: Sensors
 *   description: API de gestión de sensores
 */

/**
 * @swagger
 * /api/sensors:
 *   get:
 *     summary: Listar todos los sensores
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
 */
router.get('/', async (req, res, next) => {
    try {
        const sensors = await SensorService.getAllSensors();
        res.json(sensors);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/sensors:
 *   post:
 *     summary: Registrar un nuevo sensor
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       201:
 *         description: Sensor creado
 */
router.post('/', async (req, res, next) => {
    try {
        const newSensor = await SensorService.createSensor(req.body);
        res.status(201).json(newSensor);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   get:
 *     summary: Obtener sensor por ID
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Detalle del sensor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       404:
 *         description: Sensor no encontrado
 */
router.get('/:id', async (req, res, next) => {
    try {
        const sensor = await SensorService.getSensorById(req.params.id);
        if (!sensor) return res.status(404).json({message: 'Sensor no encontrado'});
        res.json(sensor);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   put:
 *     summary: Actualizar datos del sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       200:
 *         description: Sensor actualizado
 *       404:
 *         description: Sensor no encontrado
 */
router.put('/:id', async (req, res, next) => {
    try {
        const updatedSensor = await SensorService.updateSensor(req.params.id, req.body);
        if (!updatedSensor) return res.status(404).json({message: 'Sensor no encontrado'});
        res.json(updatedSensor);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   delete:
 *     summary: Eliminar un sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Sensor eliminado
 *       500:
 *         description: Error si tiene lecturas (Readings) asociadas
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedSensor = await SensorService.deleteSensor(req.params.id);
        if (!deletedSensor) return res.status(404).json({message: 'Sensor no encontrado'});
        res.json({message: 'Sensor eliminado correctamente'});
    } catch (error) {
        next(error);
    }
});

module.exports = router;