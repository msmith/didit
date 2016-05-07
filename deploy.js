var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var walk = require('walk');

//
// Build file list
//

var files = [];

// Walker options
var walker = walk.walk('./build', { followLinks: false });

walker.on('file', function(root, stat, next) {
  if (!stat.name.startsWith('.')) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
  }
  next();
});

walker.on('end', function() {
  //
  // Upload to S3
  //

  var s3 = new AWS.S3();
  var bucket = 'todo.sticknet.net';

  files.forEach(function(filename) {
    var readableStream = fs.createReadStream(filename);
    var objectKey = filename.replace(/^\.\/build\//, "");
    var contentType;
    switch (path.extname(filename)) {
      case '.css':
        contentType = 'text/css'
        break;
      case '.js':
        contentType = 'text/javascript'
        break;
      case '.html':
        contentType = 'text/html'
        break;
      default:
        contentType = 'application/octet-stream'
        break;
    }
    var params = {
      Bucket: bucket,
      Key: objectKey,
      Body: readableStream,
      ACL: 'public-read',
      ContentType: contentType
    };
    s3.putObject(params, function(err, data) {
      if (err)
        console.log(err)
      else
        console.log("Uploaded " + objectKey);
    });
  });
});
