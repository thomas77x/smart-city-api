const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    sensorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor',
        required: [true, 'La lectura debe pertenecer a un sensor']
    },
    time: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Number,
        required: [true, 'El valor de la lectura es obligatorio']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reading', readingSchema);