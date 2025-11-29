const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El dispositivo debe tener un propietario (Owner)']
    },
    zoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
        required: [true, 'El dispositivo debe estar asignado a una zona']
    },
    installedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'maintenance', 'offline'],
        default: 'active'
    },

    sensors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);