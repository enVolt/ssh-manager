'use strict';

var fs = require('fs');

function Auth(type, pemFile, pemFiles) {
  this.type = type;
  this.pemFile = pemFile;
  this.pemFileName = pemFile && pemFile.split("/").slice(-1)[0].slice(0, -4);
  if (pemFiles && pemFiles.length) {
    this.pemFileName = pemFiles.map(p => p.split("/").slice(-1)[0].slice(0, -4)).join(", ");
  }
  this.pemFiles = pemFiles || [];
}

Auth.PASSWORD = 'password';
Auth.PEM = 'pem';

Auth.prototype.existsPemFile = function (cb) {
  if (this.type === Auth.PEM) {
    fs.exists(this.pemFile, function (exists) {
      if (exists) {
        cb(true);
      } else {
        cb(false);
      }
    });
  } else {
    cb(true);
  }
};

Auth.prototype.toString = function () {
  return this.type;
};

module.exports = Auth;
