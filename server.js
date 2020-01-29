// Requirments
const http = require('http');
const app = require('./backend/app');
// Setting port
const port = process.env.port || 3001;
app.set('port', process.env.port || 3001);

// Creation of server
const server = http.createServer(app);

// Listening on server
server.listen((port), () => {
  console.log(`Server listening on port ${port}`);
})
// For start server  ||    npm run start:server
