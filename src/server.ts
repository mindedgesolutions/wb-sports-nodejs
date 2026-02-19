import express, { Application, NextFunction, Request, Response } from 'express';
import appRoutes from '@/routes/app.route';
import { StatusCodes } from 'http-status-codes';
import { CustomError, NotFoundException } from '@/core/error.core';
import cookieParser from 'cookie-parser';
import { logger } from '@/globals/logs/logger';
import { PORT } from './globals/constants';
import cors from 'cors';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
  }

  // ---------------------------

  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.listenServer();
  }

  // ---------------------------

  private setupMiddleware(): void {
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // ---------------------------

  private setupRoutes(): void {
    console.log('Routes loaded');
    appRoutes(this.app);
  }

  // ---------------------------

  private setupGlobalError(): void {
    this.app.use((req, res, next) => {
      next(new NotFoundException(`URL ${req.originalUrl} not found`));
    });

    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({
            message: error.message,
          });
        }

        logger.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Something went wrong',
        });
      },
    );
  }

  // ---------------------------

  private listenServer() {
    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}
export default Server;
