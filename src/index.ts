import express from "express";
import resizeImage from "./resize";
const app = express();
const port: number = 3000;

app.listen(port, () => {
    console.log("Listening on Port:", port);
});

app.get('/image-resize', (req, res): void => {
    const fileName = (req.query.fileName as unknown) as string;
    const width = (req.query.width as unknown) as string;
    const height = (req.query.height as unknown) as string;
    resizeImage(fileName, width, height);
    res.send('hello')
    console.log(width, height, fileName);
});
