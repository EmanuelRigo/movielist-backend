import express from 'express';
import http from 'http';

//server
const app = express();
const port = 8080;

//HTTP server
const server = http.createServer(app);

//start server
server.listenerCount(port, () => {
    console.log('Server started on port ' + port);
});

//routers
app.use(indexRouter);


