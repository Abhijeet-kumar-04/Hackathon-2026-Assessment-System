const fs = require('fs');
const path = require('path');

const services = ['api-gateway', 'user-service', 'hackathon-service', 'team-service', 'submission-service', 'judging-service'];

services.forEach(service => {
  const pkgPath = path.join(__dirname, 'services', service, 'package.json');
  if(fs.existsSync(pkgPath)) {
    let content = fs.readFileSync(pkgPath, 'utf8');
    if(content.includes('ts-node-dev --respawn --transpile-only')) {
      content = content.replace('ts-node-dev --respawn --transpile-only', 'tsx watch');
      fs.writeFileSync(pkgPath, content);
      console.log('Fixed package.json in ' + service);
    }
  }
});
