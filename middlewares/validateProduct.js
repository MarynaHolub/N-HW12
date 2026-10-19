const ALLOWED_FIELDS = ['name', 'price', 'description'];

function checkFields(data) {
  const errors = [];

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim() === '') {
      errors.push('Name must be a non-empty string');
    }
  }

  if (data.price !== undefined) {
    if (
      typeof data.price !== 'number' ||
      !Number.isFinite(data.price) ||
      data.price < 0
    ) {
      errors.push('Price must be a valid non-negative number');
    }
  }

  if (data.description !== undefined) {
    if (typeof data.description !== 'string') {
      errors.push('Description must be a string');
    }
  }

  return errors;
}

export function validateCreateProduct(req, res, next) {
  const { name, price, description } = req.body || {};

  if (name === undefined || price === undefined) {
    return res.status(400).json({
      error: 'name, price are required',
    });
  }

  const data = { name, price, description };

  const errors = checkFields(data);

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
    });
  }

  req.body = data;
  next();
}

export function validateUpdateProduct(req, res, next) {
  const data = req.body || {};

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      error: `Nothing to update. Allowed fields: ${ALLOWED_FIELDS.join(', ')}`,
    });
  }

  const invalidFields = Object.keys(data).filter(
    (field) => !ALLOWED_FIELDS.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: `Unknown fields: ${invalidFields.join(', ')}`,
    });
  }

  const errors = checkFields(data);

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
    });
  }

  req.body = data;
  next();
}