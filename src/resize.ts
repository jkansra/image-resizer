import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const resizeImage = async (fileName: string, width: string, height: string): Promise<string | undefined> => {
    try {
        const originalPath: string = path.join(__dirname, `../assets/full/${fileName}.jpeg`);
        const resizedPath: string = path.join(__dirname, `../assets/thumb/${fileName}-resized.jpeg`);
        if (!fs.existsSync(originalPath)) {
            return "No file exists with this name";
        }
        if (fs.existsSync(resizedPath)) {
            console.log("Resized File Already Exists");
            return resizedPath;
        }
        await sharp(originalPath).resize(Number(width), Number(height)).toFile(resizedPath);
        return resizedPath;
    }
    catch (error) {
        console.log(error);
    }
}

export default resizeImage;
