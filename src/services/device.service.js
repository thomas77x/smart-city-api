const Device = require('../models/device.model');
const User = require('../models/user.model');
const Zone = require('../models/zone.model');

class DeviceService {

    async getAllDevices() {
        return Device.find()
            .populate('ownerId', 'name email')
            .populate('zoneId', 'name')
            .populate('sensors');
    }

    async getDeviceById(id) {
        return Device.findById(id)
            .populate('ownerId', 'name email')
            .populate('zoneId', 'name')
            .populate('sensors');
    }

    async createDevice(deviceData) {
        const userExists = await User.findById(deviceData.ownerId);
        if (!userExists) {
            throw new Error(`El usuario con ID ${deviceData.ownerId} no existe.`);
        }

        const zoneExists = await Zone.findById(deviceData.zoneId);
        if (!zoneExists) {
            throw new Error(`La zona con ID ${deviceData.zoneId} no existe.`);
        }

        return Device.create(deviceData);
    }

    async updateDevice(id, updateData) {
         Device.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteDevice(id) {
        const device = await Device.findById(id);
        if (!device) throw new Error('Dispositivo no encontrado');

        if (device.sensors && device.sensors.length > 0) {
            throw new Error(`No se puede eliminar el dispositivo porque tiene ${device.sensors.length} sensores asignados. Elimine o desvincule los sensores primero.`);
        }

        return Device.findByIdAndDelete(id);
    }
}

module.exports = new DeviceService();