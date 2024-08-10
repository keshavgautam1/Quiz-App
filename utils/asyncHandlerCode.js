const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)); // if we have an error in the requestHandler function then we will pass the error to the next middleware function (error handler middleware function
  };
};

export { asyncHandler };
