const express = require('express');
const app = express();
const router = express.Router();

const IP = '69.85.85.193';
const port = 80;

app.use(express.static(__dirname));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mess');

const mess = new mongoose.Schema({
    Company: { type: String },
    Address: { type: String },
    Mailbox: { type: String },
    Phone: { type: Number },
    Notes: { type: String },
    Data: { type: Date, default: Date.now }
});

var message = mongoose.model('mess', mess);

router.post('/set?*', (res, req) => {
    message.create(res.query, function (err, data) {
        if (err) {
            req.end(err);
            return;
        }
        console.log(data);
    });
    req.end('提交成功');
});

router.get('/get', (res, req) => {
    message.find({}, (err, data) => {
        if (err) {
            req.end(err);
            return;
        }
        req.json(data);
    })
});

app.use(router);

app.listen(port, IP);

console.log(`${IP}:${port}`);
