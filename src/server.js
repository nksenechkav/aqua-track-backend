// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

//дозволені домени, з яких можна робити запити
// const allowedOrigins = [
//   //локалхост для тестування
//   'http://localhost:5173',
//   'http://localhost:3000',

//  //деплой-продакшен
//   'https://aquatrack-taupe.vercel.app',
//   'https://aqua-track-backend.onrender.com',
// ];

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // app.use(
  //   cors({
  //     origin: function (origin, callback) {
  //       // Перевірте, чи є `origin` у списку дозволених
  //       if (allowedOrigins.includes(origin) || !origin) {
  //         // Якщо так, дозволити запит
  //         callback(null, true);
  //       } else {
  //         // Інакше заборонити запит
  //         callback(new Error('Not allowed by CORS'));
  //       }
  //     },
  //     credentials: true, // Дозволити передачу файлів cookie
  //   }),
  // );

  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true, // приклад опції для кольорового виведення
        },
      },
    }),
  );

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
