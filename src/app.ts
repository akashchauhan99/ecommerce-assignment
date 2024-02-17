import dotenv from 'dotenv';
import express, { NextFunction, Request, Response, Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
dotenv.config();

import { ENV } from './constant/common';
import connectDB from './config/connectDB';
import routes from './routes';

const app: Application = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

// Testing
app.get(
    '/api/healthChecker',
    (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            status: 'success',
            message: 'Welcome',
        });
    }
);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

const port: Number = ENV.PORT;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    // 👇 call the connectDB function here
    connectDB();
});

