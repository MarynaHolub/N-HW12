import { ObjectId } from 'mongodb';
import { getDb } from '../db/index.js';
import HttpError from '../utils/HttpError.js';

function productsCollection() {
  return getDb().collection('products'); // обращаемся к getDb() и подтягиваем конкретную коллекцию collection('products')
}

export async function createProduct(req, res, next) {
  try {
    const product = {
      ...req.body,
      createdAt: new Date(),
    };

    // new Date() // объект Date: 2026-10-15T10:02:00.000Z
    // Date.now() // число (миллисекунды с 1 января 1970 UTC): 1792058520000

    const result = await productsCollection().insertOne(product);
    res.status(201).json({ message: 'Product created successfully', result });
    
  } catch (error) {
    next(error);
  }
}

export async function getProducts(req, res, next) {
  try {
    const products = await productsCollection().find().toArray();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const productId = new ObjectId(req.params.id); // преобразует ID из URL в ObjectId
    const product = await productsCollection().findOne({ _id: productId });

    if (!product) {
      //   return res.status(404).json({ error: 'product not found' });
      return next(new HttpError(404, 'product not found'));
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProductById(req, res, next) {
  try {
    const productId = new ObjectId(req.params.id); // преобразует ID из URL в ObjectId
    const product = await productsCollection().findOne({ _id: productId });

    if (!product) {
      //   return res.status(404).json({ error: 'product not found' });
      return next(new HttpError(404, 'Product not found'));
    }

    await productsCollection().updateOne({ _id: productId }, { $set: req.body });

    const updatedProduct = await productsCollection().findOne({ _id: productId });

    res.json({ updatedProduct });
  } catch (error) {
    next(error);
  }
}

export async function deleteProductById(req, res, next) {
  try {
    const productId = new ObjectId(req.params.id); // преобразует ID из URL в ObjectId
    const product = await productsCollection().findOne({ _id: productId });

    if (!product) {
      //   return res.status(404).json({ error: 'product not found' });
      return next(new HttpError(404, 'product not found'));
    }

    const result = await productsCollection().deleteOne({ _id: productId });

    if (!result) {
    //   res.status(500).json({message: 'Внутрення ошибка сервера при удалении пользователя'});
    return next(new HttpError(500, 'Внутрення ошибка сервера при удалении пользователя'));
        
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}
