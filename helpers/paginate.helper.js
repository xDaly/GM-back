exports.paginate = (page, pageSize, orderBy, direction) => {
  const offset = page * pageSize;
  const limit = pageSize;
  const order = [[orderBy, direction]];
  return {
    offset,
    limit,
    order,
  };
};
