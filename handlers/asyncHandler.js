async function handleAsync(func) {
  try {
    return await func();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = handleAsync;
