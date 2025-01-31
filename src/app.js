import express from 'express';
import http from 'http';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import productsRouter from './routers/api/movies.router.js';
import connectDB from './config/index.js';
//server
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser('codercookieCAMBIARENV'));

//midleware it can be deleted
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});
//another midleware it can be deleted
app.use((req, res, next) => {
    console.log('Request Type:', req.method);
    next();
});

// const auth = (req, res, next) => {
//     if (!req.user) {
//        return res.send('Not allowed');
//     } else {
//         res.status(401).send("Allowed");
//     }
// };




connectDB()
// //HTTP server
// const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/movies', productsRouter);

//start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

// //routers
// app.use(indexRouter);


