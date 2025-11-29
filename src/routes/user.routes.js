const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico único
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         role:
 *           type: string
 *           enum: [admin, technician, viewer]
 *           description: Rol del usuario
 *       example:
 *         name: Juan Pérez
 *         email: juan@example.com
 *         password: secreta123
 *         role: admin
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna la lista de todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) return res.status(404).json({message: 'Usuario no encontrado'});
        res.json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/', async (req, res, next) => {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', async (req, res, next) => {
    try {
        const updatedUser = await UserService.updateUser(req.params.id, req.body);
        if (!updatedUser) return res.status(404).json({message: 'Usuario no encontrado'});
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar (ej. tiene dispositivos asociados)
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await UserService.deleteUser(req.params.id);
        if (!deletedUser) return res.status(404).json({message: 'Usuario no encontrado'});
        res.json({message: 'Usuario eliminado correctamente'});
    } catch (error) {
        next(error);
    }
});

module.exports = router;