const fs = require('fs');
const path = require('path');

const services = ['api-gateway', 'user-service', 'hackathon-service', 'team-service', 'submission-service', 'judging-service'];

services.forEach(service => {
  const tsconfigPath = path.join(__dirname, 'services', service, 'tsconfig.json');
  if(fs.existsSync(tsconfigPath)) {
    let content = fs.readFileSync(tsconfigPath, 'utf8');
    if(!content.includes('rootDir')) {
      content = content.replace('"compilerOptions": {', '"compilerOptions": {\n    "rootDir": "../../..",');
      fs.writeFileSync(tsconfigPath, content);
      console.log('Fixed ' + service);
    }
  }
});

const notifPkgPath = path.join(__dirname, 'services', 'notification-service', 'package.json');
if(fs.existsSync(notifPkgPath)) {
  let pkg = JSON.parse(fs.readFileSync(notifPkgPath, 'utf8'));
  if(pkg.scripts && pkg.scripts.dev) {
    delete pkg.scripts.dev;
    fs.writeFileSync(notifPkgPath, JSON.stringify(pkg, null, 2));
    console.log('Fixed notification-service');
  }
}
