const mongoose = require('mongoose');

const SanphamSchema = mongoose.Schema({

    ten: {
        type: String,
        required: true
    },

    gia: {
        type: Number,
        required: true
    },

    soluong: {
        type: String,
        required: true
    },

    tonkho: {
        type: String
    },

});

const spModel = mongoose.model('sanpham', SanphamSchema);

module.exports = spModel;

