async function handleAsync(func) {
  try {
    return await func();
  } catch (error) {
    throw new Error("An error occurred");
  }
}

module.exports = handleAsync;
