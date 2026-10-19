import 'dotenv/config';
import { MongoClient } from 'mongodb';

let client;
let dbConnection;

export async function connectionToDatabase() {
  const url = process.env.MONGO_URL;

  if (!url) {
    throw new Error("'MONGO_URL' is not defined in .env");
  }

  client = new MongoClient(url); // Создаем клиента для подключения к БД (создаёт объект клиента, который умеет взаимодействовать с сервером MongoDB)

  await client.connect(); // Устанавливает соединение

  dbConnection = client.db(); // client.db() возвращает объект базы данных, с которым можно выполнять запросы и получать коллекции (получаем в том числе и имя БД)имя Если нет, можно передать его явно

  console.log(
    `Connected successfully to MongoDB (db: ${dbConnection.databaseName})`,
  );
}

// функция позволяет получить объект базы данных из другого файла
export function getDb() {
  if (!dbConnection) {
    throw new Error('Database not connected');
  }

  return dbConnection;  // возвращаем её объект, чтобы использовать для работы с коллекциями
}

// Корректное закрытие подключение
export async function closeDatabase() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}
