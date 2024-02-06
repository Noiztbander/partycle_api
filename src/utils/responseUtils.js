function generateResponse({ data = null, error = null }) {
  return {
    isSuccessful: data ? true : false,
    data: data,
    error: error,
  };
}

function getTotalPages(totalCount, pageSize) {
  return totalCount % pageSize
    ? Math.floor(totalCount / pageSize) + 1
    : Math.floor(totalCount / pageSize);
}

function buildPaginatedData(pageSize, currentPage, totalPages, items) {
  return {
    pageSize,
    currentPage,
    totalPages,
    items,
  };
}

module.exports = {
  generateResponse: generateResponse,
  getTotalPages: getTotalPages,
  buildPaginatedData: buildPaginatedData,
};
