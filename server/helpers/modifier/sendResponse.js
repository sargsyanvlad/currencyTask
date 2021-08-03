module.exports = (res, result, status, message) => {
  const response = {
    status: status || 200,
    message: message || 'Success',
    result,
  };
  return res.status(response.status).json(response);
};
