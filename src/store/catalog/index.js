import { codeGenerator } from "../../utils";
import StoreModule from "../module";
import { get } from "../../api/articles/get";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async setArticles({ limit, skip }) {
    const articles = await get.articles(
      { limit, skip },
      { headers: { "Accept-Language": "ru" } }
    );

    this.setState(
      {
        ...this.getState(),
        list: articles,
      },
      "Загружены товары из АПИ"
    );
  }

  async getTotalCount() {
    return await get.totalCount();
  }

  async getArticleInfoById({ id }) {
    return await get.articleInfoById(
      { id },
      { headers: { "Accept-Language": "ru" } }
    );
  }
}

export default Catalog;
