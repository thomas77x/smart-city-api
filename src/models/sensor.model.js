const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    type: {
        type: String,

        enum: ['temperature', 'humidity', 'co2', 'noise'],
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sensor', sensorSchema);