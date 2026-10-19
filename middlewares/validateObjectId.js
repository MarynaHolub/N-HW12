import { ObjectId } from "mongodb";

// проверяет, правильно ли указан id пользователя перед выполнением основного обработчика маршрута
export function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {    // ObjectId.isValid(id) — это метод из библиотеки mongodb, который проверяет, можно ли исп перед знач как идентификатор MongoDB типа ObjectId
    return res.status(400).json({
        error: 'Invalid user ID'
    })
  }
  next()
}