import path from 'path';
import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
const request = supertest(app);

describe('Test if the endpoint is running', () => {
  it('gets the api endpoint', async function () {
    const response = await request.get('/image-resize');
    expect(response.status).toBe(200);
  });
});

describe('Test if the error message is returned if no query param is sent', () => {
  it('get the error message', async function () {
    const response = await request.get('/image-resize');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Please enter numeric dimensions');
  });
});

describe('Test if the error message is returned if height/width dimension is less than or equal to zero', () => {
  it('get the error message', async function () {
    const response = await request
      .get('/image-resize')
      .query({ height: 0, width: 0, fileName: 'fjord' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Please enter valid dimensions');
  });
});

describe('Test success if fileName getting resized first time', () => {
  it('get the error message', async function () {
    const response = await request
      .get('/image-resize')
      .query({ height: 500, width: 500, fileName: 'icelandwaterfall' });
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
  });
});

describe('Test success if image is getting processed', () => {
  const resizedPath: string = path.join(
    __dirname,
    `../../assets/thumb/icelandwaterfall-500-500.jpeg`
  );
  it('get the processed image', async function () {
    fs.unlinkSync(resizedPath);
    const response = await request
      .get('/image-resize')
      .query({ height: 500, width: 500, fileName: 'icelandwaterfall' });
    try {
      if (fs.existsSync(resizedPath)) {
        expect(response.status).toBe(200);
        expect(response.type).toBe('image/jpeg');
      }
    } catch (err) {
      console.error(err);
    }
  });
});
