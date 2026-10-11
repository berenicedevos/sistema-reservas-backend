export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const sendError = (res, error) => {
  const statusCode = error.statusCode || error.status || 500;
  if (statusCode === 500) {
    console.error(error);
  }
  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'Error interno del servidor' : error.message
  });
};