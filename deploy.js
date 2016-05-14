const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const walk = require('walk');
const exec = require('child_process').exec;

const s3 = new AWS.S3();

const BUCKET = 'todo.sticknet.net';
const BUILD_DIR = './build';

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

const uploadToS3 = (filename) => {
  const readableStream = fs.createReadStream(filename);
  const objectKey = path.basename(filename);
  console.log(objectKey);
  const contentType = mimeType(filename);
  const params = {
    Bucket: BUCKET,
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
};

const tag = () => {
  const tagName = 'deploy-' + new Date().getTime();
  exec('git tag -a ' + tagName + ' -m "Deploy"',
    (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });
};

//
// Build file list
//
process.chdir(BUILD_DIR);
const files = ['../favicon.png'];

// Walker options
const walker = walk.walk('.', { followLinks: false });

walker.on('file', (root, stat, next) => {
  if (!stat.name.startsWith('.')) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
  }
  next();
});

walker.on('end', () => {
  files.forEach(uploadToS3);
  tag();
});
