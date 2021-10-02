export const filterUrl = (sort, order, baseSortUrl) => {
  const url = `${baseSortUrl}/${sort}/${order}/1`;
  return url;
};
