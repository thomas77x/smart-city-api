const Reading = require('../models/reading.model');
const Sensor = require('../models/sensor.model');

class ReadingService {

    async getAllReadings() {
        return Reading.find().sort({ time: -1 }).populate('sensorId', 'type unit location');
    }

    async getReadingById(id) {
        return Reading.findById(id).populate('sensorId');
    }

    async getReadingsBySensorId(sensorId) {
        return Reading.find({ sensorId }).sort({ time: -1 });
    }

    async createReading(readingData) {
        const sensorExists = await Sensor.findById(readingData.sensorId);
        if (!sensorExists) {
            throw new Error(`El sensor con ID ${readingData.sensorId} no existe. No se puede guardar la lectura.`);
        }

        return Reading.create(readingData);
    }

    async updateReading(id, updateData) {
        return Reading.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteReading(id) {
        return Reading.findByIdAndDelete(id);
    }
}

module.exports = new ReadingService();