import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  req.log?.error({ error }, 'Unhandled error');
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message || 'Http error occurred',
    });
  }

  res.status(500).json({
    message: error.message || 'Something went wrong',
  });
};
