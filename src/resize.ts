import sharp from 'sharp';

const resizeImage = async (fileName: string, width: string, height: string): Promise<void> => {
    try {
        await sharp(`../assets/full/${fileName}.jpeg`).resize(Number(width), Number(height)).toFile(`../assets/thumb/${fileName}-resized.jpeg`);
    }
    catch (error) {
        console.log(error);
    }
}

export default resizeImage;
