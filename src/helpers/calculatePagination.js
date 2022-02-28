

const calculatePagination = (size, page) => {
  const sizeInt = parseInt(size || Number.MAX_SAFE_INTEGER);
  const pageInt = parseInt(page || 0);
  return { limit: sizeInt, offset: sizeInt * pageInt };
};

module.exports = { calculatePagination };
