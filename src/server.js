import express from 'express';
import cors from 'cors';
import PinoHttp from 'pino-http';
import 'dotenv/config';

const app = express();
const logger = PinoHttp({
  transport: {
    target: 'pino-pretty',
  },
});

app.use(cors());
app.use(logger);
app.use(express.json());

app.get('/notes', (req, res) => {
  res.json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  res.json({
    message: 'Retrieved note with ID: id_param',
  });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server is running at 3000 port`));
