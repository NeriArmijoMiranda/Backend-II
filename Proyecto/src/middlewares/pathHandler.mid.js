const pathHandler = (req, res, next) => {
    const message = "Not found path";
    return res.status(404).json({
      method: req.method,
      url: req.originalUrl,
      error: message,
    });
  };
  
  export default pathHandler;