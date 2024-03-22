const express = require('express');
const router = express.Router();
const server = require('./server');
const spModel = require('./sanphamModel');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.send('URI:' + server.uri);
});

router.get('/list', async (req, res) => {
    try {
        await mongoose.connect(server.uri);

        let sanphams = await spModel.find();

        console.log(sanphams);

        res.send(sanphams);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});

router.post('/add', async (req, res) => {
    try {
        const newsanphamModel = new spModel(req.body);
        await newsanphamModel.save();
        res.status(201).send('Dữ liệu đã được thêm thành công');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
        res.status(500).send('Đã xảy ra lỗi khi thêm dữ liệu');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await mongoose.connect(server.uri);

        let id = req.params.id;
        let result = await spModel.deleteOne({ _id: id });

        if (result) {
            res.json({
                "status": 200,
                "messenger": "Xóa thành công",
                "data": result
            });
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, xóa không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await mongoose.connect(server.uri);

        const id = req.params.id;
        const data = req.body;

        const updatesp = await spModel.findByIdAndUpdate(id, data, { new: true });

        res.json({
            "status": 200,
            "messenger": "Cập nhật thành công",
            "data": updatesp
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});

module.exports = router;