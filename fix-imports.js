const fs = require('fs');
const path = require('path');

const services = ['api-gateway', 'user-service', 'hackathon-service', 'team-service', 'submission-service', 'judging-service'];

services.forEach(service => {
  const controllersPath = path.join(__dirname, 'services', service, 'src', 'controllers');
  if(fs.existsSync(controllersPath)) {
    const files = fs.readdirSync(controllersPath);
    files.forEach(file => {
      const filePath = path.join(controllersPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('../../../packages/')) {
        content = content.replace(/\.\.\/\.\.\/\.\.\/packages\//g, '../../../../packages/');
        fs.writeFileSync(filePath, content);
        console.log('Fixed imports in ' + filePath);
      }
    });
  }

  const routesPath = path.join(__dirname, 'services', service, 'src', 'routes');
  if(fs.existsSync(routesPath)) {
    const files = fs.readdirSync(routesPath);
    files.forEach(file => {
      const filePath = path.join(routesPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('../../../packages/')) {
        content = content.replace(/\.\.\/\.\.\/\.\.\/packages\//g, '../../../../packages/');
        fs.writeFileSync(filePath, content);
        console.log('Fixed imports in ' + filePath);
      }
    });
  }
});
