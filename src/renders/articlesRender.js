import articleMocks from "@/mocks/articles.js";
import articlesTemplate from "@/views/articles.handlebars";

export const renderArticles = () => {
  const $mainRight = $(".main-right");
  const articlesStr = articlesTemplate({ articles: articleMocks });
  $mainRight.html(articlesStr);
};