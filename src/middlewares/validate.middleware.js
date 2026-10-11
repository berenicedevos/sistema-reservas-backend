import { OBJECT_ID_REGEX } from '../validations/common.validation.js';

const formatIssues = (error) =>
  error.issues.map((issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`);

export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});
  if (!result.success) {
    return res.status(400).json({
      status: 'error',
      message: 'Datos inválidos',
      errors: formatIssues(result.error)
    });
  }
  req.body = result.data;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({
      status: 'error',
      message: 'Query params inválidos',
      errors: formatIssues(result.error)
    });
  }
  req.validatedQuery = result.data;
  next();
};

export const validateObjectId =
  (...params) =>
  (req, res, next) => {
    for (const param of params) {
      if (!OBJECT_ID_REGEX.test(req.params[param])) {
        return res.status(400).json({
          status: 'error',
          message: `El parámetro ${param} no es un ID válido`
        });
      }
    }
    next();
  };