# Project title
Image Processing API

# Project description
This project contains an API that resize the source images as per the input dimensions and stores them to the target folder.
We use sharp module to resize our input images and store them into the preferred file location.

# How to run the project

For starting the project and run the src folder(containing .ts files) : `npm run start`

For building the project: `npm run build`

For running the build folder( containing .js files): `node build/index`

For running the unit tests: `npm run test`


# API endpoint 

To run the API on your local machine,
1. Run the server using `npm run start`.

2. Hit the endpoint URL : [http://localhost:{port}/image-resize?height={height}&width={width}&fileName={fileName}](http://localhost:{port}/image-resize?height={height}&width={width}&fileName={fileName}) - Here, fileName is the name of the file present in the assets/full directory to be resized and height and width are the dimensions in which we want the image to be resized.

3.  After we hit the URL, we will be able to see the rendered image as per the dimensions and it will be stored in the assets/thumb directory.

4. Hitting the URL again would not generate a new file, just give the already existing resized image on the screen.

5. Validations of height and width to be a number has been added. Also, the validation that the input file should exist in the directory is present.

# Additional Points

1. All the linting errors have been resolved. They can be verified using the script : `npm run lint`.
2. Also, prettier package has been used for formatting purposes. Script : `npm run prettier`.
3. Additional Libraries used: `sharp`
