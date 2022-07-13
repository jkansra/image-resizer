import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import sizeOf from 'image-size';

const resizeImage = async (
  fileName: string,
  width: number,
  height: number
): Promise<string | undefined> => {
  try {
    const originalPath: string = path.join(
      __dirname,
      `../assets/full/${fileName}.jpeg`
    );
    const resizedPath: string = path.join(
      __dirname,
      `../assets/thumb/${fileName}-resized.jpeg`
    );
    if (!fs.existsSync(originalPath)) {
      return 'No file exists with this name';
    }
    // Update image if different dimensions are passed for same image
    // Fetching dimensions using image-size package
    sizeOf(resizedPath, (error, dimensions) => {
      if (
        fs.existsSync(resizedPath) &&
        dimensions?.width === width &&
        dimensions.height === height
      ) {
        console.log('Resized File Already Exists');
        return resizedPath;
      }
    });
    await sharp(originalPath).resize(width, height).toFile(resizedPath);
    return resizedPath;
  } catch (error) {
    console.log(error);
  }
};

export default resizeImage;
