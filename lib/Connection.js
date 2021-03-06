'use strict';

var childPty = require('child_pty');

var Auth = require('./Auth');

function Connection(server) {
  this.server = server;
  this.timeout = 2500;
}

Connection.prototype.connect = function (cb) {
  console.info('Connecting...');

  var ssh = childPty.spawn('ssh-agent', ["/bin/sh"], {
    columns: process.stdout.columns,
    rows: process.stdout.rows
  });

  // ssh.stdin.write("ssh-agent\n");
  if (this.server.auth.pemFiles) {
    this.server.auth.pemFiles.forEach(pemFile => {
      ssh.stdin.write("ssh-add -K " + pemFile + " > /dev/null 2>&1\n");
    })
  }
  ssh.stdin.write("ssh-add -K " + this.server.auth.pemFile + " > /dev/null 2>&1\n");

  ssh.stdin.write("ssh " + this.createSshParams().join(" ") + "\n");

  process.stdout.on('resize', function () {
    ssh.stdout.resize({ columns: process.stdout.columns, rows: process.stdout.rows });
  });

  ssh.on('close', onClose);
  ssh.stdout.once('data', onConnect);
  ssh.stdout.on('data', sshToOutput);
  ssh.stderr.on('data', sshToError);
  process.on('SIGINT', ctrlCPressed);

  function onClose(code, signal) {
    process.stdin.setRawMode(false);
    process.stdin.removeListener('data', inputToSsh);
    process.removeListener('SIGINT', ctrlCPressed);

    cb(code, signal);
  }

  function onConnect(data) {
    process.stdin.setRawMode(true);
    process.stdin.on('data', inputToSsh);
  }

  function sshToOutput(data) {
    process.stdout.write(data);
  }

  function sshToError(data) {
    process.stderr.write(data);
  }

  function inputToSsh(data) {
    ssh.stdin.write(data);
  }

  function ctrlCPressed() {
    ssh.kill('SIGINT');
  }
};

Connection.prototype.createSshParams = function () {
  var params = [this.server.user + '@' + this.server.host];

  if (this.server.auth.type === Auth.PEM) {
    params.unshift(this.server.auth.pemFile);
    params.unshift('-i');
  }

  if (this.server.secondHost) {
    params.unshift('-t');
    params.push("ssh");
    params.push(this.server.secondHost);
  }

  return params;
};

module.exports = Connection;
