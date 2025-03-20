const pathHandler = (req, res) => {
  const message = "Not found path";
  const data = {
    method: req.method,
    url: req.originalUrl,
    error: message,
  };
  return res.status(404).json(data);
};

export default pathHandler;