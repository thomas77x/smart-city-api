const Sensor = require('../models/sensor.model');
const Reading = require('../models/reading.model');

class SensorService {

    async getAllSensors() {
        return Sensor.find();
    }

    async getSensorById(id) {
        return Sensor.findById(id);
    }

    async createSensor(sensorData) {
        return Sensor.create(sensorData);
    }

    async updateSensor(id, updateData) {
        return Sensor.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async deleteSensor(id) {
        const readingsCount = await Reading.countDocuments({ sensorId: id });

        if (readingsCount > 0) {
            throw new Error(`No se puede eliminar el sensor. Tiene ${readingsCount} lecturas registradas en el historial.`);
        }

        return Sensor.findByIdAndDelete(id);
    }
}

module.exports = new SensorService();