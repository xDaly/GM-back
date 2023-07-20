exports.paginate = (page, pageSize, orderBy, direction) => {
  console.log(page, pageSize, orderBy, direction);
  const offset = page * pageSize;
  const limit = pageSize;
  const order = [[orderBy || "createdAt", direction || "DESC"]];
  return {
    offset,
    limit,
    order
  };
};
