const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const walk = require('walk');

const s3 = new AWS.S3();
const bucket = 'todo.sticknet.net';

const mimeType = (filename) => {
  switch (path.extname(filename)) {
    case '.css':
      return 'text/css';
    case '.html':
      return 'text/html';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
};

//
// Build file list
//

const files = ['favicon.png'];

// Walker options
const walker = walk.walk('./build', { followLinks: false });

walker.on('file', (root, stat, next) => {
  if (!stat.name.startsWith('.')) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
  }
  next();
});

walker.on('end', () => {
  //
  // Upload to S3
  //

  files.forEach((filename) => {
    const readableStream = fs.createReadStream(filename);
    const objectKey = filename.replace(/^\.\/build\//, '');
    const contentType = mimeType(filename);
    const params = {
      Bucket: bucket,
      Key: objectKey,
      Body: readableStream,
      ACL: 'public-read',
      ContentType: contentType
    };
    s3.putObject(params, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Uploaded ' + objectKey);
      }
    });
  });
});
