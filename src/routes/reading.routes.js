const express = require('express');
const router = express.Router();
const ReadingService = require('../services/reading.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       required:
 *         - sensorId
 *         - value
 *       properties:
 *         id:
 *           type: string
 *         sensorId:
 *           type: string
 *           description: ID del Sensor asociado
 *         time:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la lectura (auto si vacío)
 *         value:
 *           type: number
 *           description: Valor numérico medido
 *       example:
 *         sensorId: 65f1a2b3c4d5e6f7a8b9c0d3
 *         value: 25.4
 */

/**
 * @swagger
 * tags:
 *   name: Readings
 *   description: Historial de lecturas de sensores
 */

/**
 * @swagger
 * /api/readings:
 *   get:
 *     summary: Obtener historial completo de lecturas
 *     tags: [Readings]
 *     responses:
 *       200:
 *         description: Lista de lecturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reading'
 */
router.get('/', async (req, res, next) => {
    try {
        const readings = await ReadingService.getAllReadings();
        res.json(readings);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/readings/sensor/{sensorId}:
 *   get:
 *     summary: Obtener lecturas de un sensor específico
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sensor a consultar
 *     responses:
 *       200:
 *         description: Lista filtrada de lecturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reading'
 */
router.get('/sensor/:sensorId', async (req, res, next) => {
    try {
        const readings = await ReadingService.getReadingsBySensorId(req.params.sensorId);
        res.json(readings);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   get:
 *     summary: Obtener lectura individual por ID
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Detalle de la lectura
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reading'
 *       404:
 *         description: Lectura no encontrada
 */
router.get('/:id', async (req, res, next) => {
    try {
        const reading = await ReadingService.getReadingById(req.params.id);
        if (!reading) return res.status(404).json({message: 'Lectura no encontrada'});
        res.json(reading);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/readings:
 *   post:
 *     summary: Registrar una nueva lectura
 *     description: Requiere un sensorId válido.
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reading'
 *     responses:
 *       201:
 *         description: Lectura guardada
 *       500:
 *         description: Error si el sensor no existe
 */
router.post('/', async (req, res, next) => {
    try {
        const newReading = await ReadingService.createReading(req.body);
        res.status(201).json(newReading);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   put:
 *     summary: Corregir una lectura (update)
 *     tags: [Readings]
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
 *             $ref: '#/components/schemas/Reading'
 *     responses:
 *       200:
 *         description: Lectura actualizada
 *       404:
 *         description: Lectura no encontrada
 */
router.put('/:id', async (req, res, next) => {
    try {
        const updatedReading = await ReadingService.updateReading(req.params.id, req.body);
        if (!updatedReading) return res.status(404).json({message: 'Lectura no encontrada'});
        res.json(updatedReading);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   delete:
 *     summary: Eliminar una lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lectura eliminada
 *       404:
 *         description: Lectura no encontrada
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedReading = await ReadingService.deleteReading(req.params.id);
        if (!deletedReading) return res.status(404).json({message: 'Lectura no encontrada'});
        res.json({message: 'Lectura eliminada correctamente'});
    } catch (error) {
        next(error);
    }
});

module.exports = router;