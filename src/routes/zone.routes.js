const express = require('express');
const router = express.Router();
const ZoneService = require('../services/zone.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre de la zona
 *         description:
 *           type: string
 *           description: Descripción opcional
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Estado de la zona
 *       example:
 *         name: Laboratorio Norte
 *         description: Área de pruebas de sensores térmicos
 *         isActive: true
 */

/**
 * @swagger
 * tags:
 *   name: Zones
 *   description: API de gestión de zonas geográficas
 */

/**
 * @swagger
 * /api/zones:
 *   get:
 *     summary: Retorna todas las zonas
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: Lista de zonas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zone'
 */
router.get('/', async (req, res, next) => {
    try {
        const zones = await ZoneService.getAllZones();
        res.json(zones);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/zones:
 *   post:
 *     summary: Crear una nueva zona
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       201:
 *         description: Zona creada exitosamente
 */
router.post('/', async (req, res, next) => {
    try {
        const newZone = await ZoneService.createZone(req.body);
        res.status(201).json(newZone);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   get:
 *     summary: Obtener una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Datos de la zona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 *       404:
 *         description: Zona no encontrada
 */
router.get('/:id', async (req, res, next) => {
    try {
        const zone = await ZoneService.getZoneById(req.params.id);
        if (!zone) return res.status(404).json({message: 'Zona no encontrada'});
        res.json(zone);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   put:
 *     summary: Actualizar una zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la zona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       200:
 *         description: Zona actualizada
 *       404:
 *         description: Zona no encontrada
 */
router.put('/:id', async (req, res, next) => {
    try {
        const updatedZone = await ZoneService.updateZone(req.params.id, req.body);
        if (!updatedZone) return res.status(404).json({message: 'Zona no encontrada'});
        res.json(updatedZone);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   delete:
 *     summary: Eliminar una zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Zona eliminada correctamente
 *       404:
 *         description: Zona no encontrada
 *       500:
 *         description: Error al eliminar (ej. tiene dispositivos asignados)
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedZone = await ZoneService.deleteZone(req.params.id);
        if (!deletedZone) return res.status(404).json({message: 'Zona no encontrada'});
        res.json({message: 'Zona eliminada correctamente'});
    } catch (error) {
        next(error);
    }
});

module.exports = router;