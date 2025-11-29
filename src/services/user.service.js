const User = require('../models/user.model');
const Device = require('../models/device.model'); // Necesario para verificar relaciones

class UserService {

    async getAllUsers() {
        return User.find().select('-password');
    }

    async getUserById(id) {
        return User.findById(id).select('-password');
    }

    async createUser(userData) {
        return User.create(userData);
    }

    async updateUser(id, updateData) {
        return User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        }).select('-password');
    }

    async deleteUser(id) {
        const devicesCount = await Device.countDocuments({ ownerId: id });

        if (devicesCount > 0) {
            throw new Error(`No se puede eliminar el usuario. Tiene ${devicesCount} dispositivos asociados.`);
        }

        return User.findByIdAndDelete(id);
    }
}

module.exports = new UserService();