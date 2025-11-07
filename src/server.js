import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors as celebrateErrorHandler } from 'celebrate';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use('/', notesRoutes);
app.use(authRoutes);

app.use(notFoundHandler);
app.use(celebrateErrorHandler());
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

await connectMongoDB();

app.listen(port, () => console.log(`Server is running at ${port} port`));
