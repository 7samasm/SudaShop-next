export const doFilter = (sort, order, baseSortUrl, push) => {
  const url = `${baseSortUrl}/${sort}/${order}/1`;
  push(url);
};
