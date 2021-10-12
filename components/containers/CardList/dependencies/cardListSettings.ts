export const filterUrl = (sort: string, order: string, baseSortUrl: string) => {
  const url = `${baseSortUrl}/${sort}/${order}/1`;
  return url;
};
