const getArticles = async ({ limit = 0, skip = 0 }, options) =>
  fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`, options)
    .then((res) => res.json())
    .then((articles) => articles.result.items)
    .catch((err) => {
      throw new Error(err.message);
    });

const getTotalCount = async (_, options) =>
  fetch(
    "/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count",
    options
  )
    .then((res) => res.json())
    .then(({ result }) => {
      return result.count;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

const getArticleInfoById = async ({ id }, options) =>
  fetch(
    `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    options
  )
    .then((res) => res.json())
    .then(({ result }) => {
      return result;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

export const get = {
  articles: getArticles,
  totalCount: getTotalCount,
  articleInfoById: getArticleInfoById,
};
