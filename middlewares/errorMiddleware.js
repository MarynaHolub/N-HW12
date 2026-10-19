import HttpError from "../utils/HttpError.js";

export function errorMiddleware(error, _req, res, _next) {
  console.error('[ERROR]:', error);

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      error: error.message,
    });
  }

  // Ошибка уникальности: например, email уже существует
  if (error.code === 11000) {
    return res.status(409).json({
      error: 'Такая запись уже существует',
    });
  }

  // Ошибка проверки схемы MongoDB
  if (error.code === 121) {
    return res.status(400).json({
      error: 'Некорректные данные',
    });
  }

  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
  });
}
