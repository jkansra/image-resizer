"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./resize"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log('Listening on Port:', port);
});
app.get('/image-resize', (req, res) => {
    const fileName = req.query.fileName;
    const width = req.query.width;
    const height = req.query.height;
    // Check for valid dimensions
    if (isNaN(Number(width)) || isNaN(Number(height))) {
        res.send('Please enter valid dimensions');
        return;
    }
    (0, resize_1.default)(fileName, Number(width), Number(height)).then((value) => {
        const path = value;
        try {
            res.sendFile(path);
        }
        catch (error) {
            res.send(path);
            console.log(error);
        }
    });
});
