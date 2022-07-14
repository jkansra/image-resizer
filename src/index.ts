import express from 'express';
import resizeImage from './resize';
const app = express();
const port: number = 3000;

app.listen(port, (): void => {
  console.log('Listening on Port:', port);
});

app.get(
  '/image-resize',
  (req: express.Request, res: express.Response): void => {
    const fileName = req.query.fileName as unknown as string;
    const width = req.query.width as unknown as string;
    const height = req.query.height as unknown as string;
    const widthInNumber: number = Number(width);
    const heightInNumber: number = Number(height);
    // Check for valid dimensions
    if (isNaN(widthInNumber) || isNaN(heightInNumber)) {
      res.send('Please enter numeric dimensions');
      return;
    }
    if (widthInNumber <= 0 || heightInNumber <= 0) {
      res.send('Please enter valid dimensions');
      return;
    }
    resizeImage(fileName, widthInNumber, heightInNumber).then((value) => {
      const path: string = value as unknown as string;
      try {
        res.sendFile(path);
      } catch (error) {
        res.send(path);
        console.log(error);
      }
    });
  }
);

export default app;
