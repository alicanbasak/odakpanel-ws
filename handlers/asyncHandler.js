const handleAsync = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error });
  }
};

module.exports = handleAsync;
