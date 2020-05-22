const {Service} = require('node-windows');
const path = require('path');

const svc = new Service({
  name: 'Discord Deduplicator',
  description: 'Discord Deduplicator',
  script: path.join(__dirname, 'index.js')
});

svc.on('install', () => {
  svc.start();
});

if (process.argv[2] === 'install') {
  svc.install();
} else if (process.argv[2] === 'uninstall') {
  svc.uninstall();
} else {
  console.error('Argument should be install or uninstall!');
}
