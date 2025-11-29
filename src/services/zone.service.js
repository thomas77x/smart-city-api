const Zone = require('../models/zone.model');
const Device = require('../models/device.model');

class ZoneService {

    async getAllZones() {
        return Zone.find();
    }

    async getZoneById(id) {
        return Zone.findById(id);
    }

    async createZone(zoneData) {
        return Zone.create(zoneData);
    }

    async updateZone(id, updateData) {
        return Zone.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    }

    async deleteZone(id) {
        const devicesInZone = await Device.countDocuments({ zoneId: id });

        if (devicesInZone > 0) {
            throw new Error(`No se puede eliminar la zona. Hay ${devicesInZone} dispositivos asignados a ella.`);
        }

        return Zone.findByIdAndDelete(id);
    }
}

module.exports = new ZoneService();