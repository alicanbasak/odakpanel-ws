const handleAsync = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = handleAsync;
