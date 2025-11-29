const express = require('express');
const router = express.Router();
const DeviceService = require('../services/device.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - serialNumber
 *         - ownerId
 *         - zoneId
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado
 *         serialNumber:
 *           type: string
 *           description: Número de serie único
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         ownerId:
 *           type: string
 *           description: ID del Usuario propietario (User)
 *         zoneId:
 *           type: string
 *           description: ID de la Zona asignada (Zone)
 *         status:
 *           type: string
 *           enum: [active, maintenance, offline]
 *           default: active
 *       example:
 *         serialNumber: SN-2024-001
 *         model: ESP32-WROOM
 *         ownerId: 65f1a2b3c4d5e6f7a8b9c0d1
 *         zoneId: 65f1a2b3c4d5e6f7a8b9c0d2
 *         status: active
 */

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: API de gestión de dispositivos IoT
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Retorna todos los dispositivos (con datos populados de Owner y Zone)
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: Lista de dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */
router.get('/', async (req, res, next) => {
    try {
        const devices = await DeviceService.getAllDevices();
        res.json(devices);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Crear un nuevo dispositivo
 *     description: Requiere ownerId y zoneId válidos existentes.
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Dispositivo creado exitosamente
 *       500:
 *         description: Error si el Owner o Zone no existen
 */
router.post('/', async (req, res, next) => {
    try {
        const newDevice = await DeviceService.createDevice(req.body);
        res.status(201).json(newDevice);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Obtener dispositivo por ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del dispositivo
 *     responses:
 *       200:
 *         description: Detalle del dispositivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo no encontrado
 */
router.get('/:id', async (req, res, next) => {
    try {
        const device = await DeviceService.getDeviceById(req.params.id);
        if (!device) return res.status(404).json({message: 'Dispositivo no encontrado'});
        res.json(device);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Actualizar dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del dispositivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Dispositivo actualizado
 *       404:
 *         description: Dispositivo no encontrado
 */
router.put('/:id', async (req, res, next) => {
    try {
        const updatedDevice = await DeviceService.updateDevice(req.params.id, req.body);
        if (!updatedDevice) return res.status(404).json({message: 'Dispositivo no encontrado'});
        res.json(updatedDevice);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Eliminar dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del dispositivo
 *     responses:
 *       200:
 *         description: Dispositivo eliminado
 *       500:
 *         description: Error si tiene sensores asociados
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedDevice = await DeviceService.deleteDevice(req.params.id);
        if (!deletedDevice) return res.status(404).json({message: 'Dispositivo no encontrado'});
        res.json({message: 'Dispositivo eliminado correctamente'});
    } catch (error) {
        next(error);
    }
});

module.exports = router;