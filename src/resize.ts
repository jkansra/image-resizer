import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

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
      `../assets/thumb/${fileName}-${width}-${height}.jpeg`
    );
    if (!fs.existsSync(originalPath)) {
      return 'No file exists with this name';
    }
    // Update image if different dimensions are passed for same image
    // Fetching dimensions using image-size package
    if (fs.existsSync(resizedPath)) {
      console.log('Resized File Already Exists');
      return resizedPath;
    }
    await sharp(originalPath).resize(width, height).toFile(resizedPath);
    console.log('File Created Successfully!');
    return resizedPath;
  } catch (error) {
    console.log(error);
  }
};

export default resizeImage;
