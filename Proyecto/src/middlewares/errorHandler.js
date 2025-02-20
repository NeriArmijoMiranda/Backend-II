const errorHandler = (error, req, res, next) => {
    console.log(error);
    const message = error.message || "SERVER ERROR";
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      method: req.method,
      url: req.originalUrl,
      error: message,
    });
  };
  
  export default errorHandler;