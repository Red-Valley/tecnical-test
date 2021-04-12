// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(payload);
}

