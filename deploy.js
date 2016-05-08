const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const walk = require('walk');

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

  const s3 = new AWS.S3();
  const bucket = 'todo.sticknet.net';

  files.forEach((filename) => {
    const readableStream = fs.createReadStream(filename);
    const objectKey = filename.replace(/^\.\/build\//, '');
    let contentType;
    switch (path.extname(filename)) {
      case '.css':
        contentType = 'text/css';
        break;
      case '.html':
        contentType = 'text/html';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      default:
        contentType = 'application/octet-stream';
        break;
    }
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
