// do something!
import { news, subscribe } from "../App.js";

const NewsList = ($categoryList) => {
  const $newsListContainer = document.createElement("div");
  $newsListContainer.classList.add("news-list-container");
  const $article = document.createElement("article");
  $article.classList.add("news-list");
  $newsListContainer.append($article);
  $categoryList.append($newsListContainer);
  const $scrollObserver = document.createElement("div");
  $scrollObserver.classList.add("scroll-observer");
  $scrollObserver.innerHTML = `
    <img src="img/ball-triangle.svg" alt="Loading..." />
    `;
  $article.after($scrollObserver);

  let page = 1;
  const loadNews = async () => {
    try {
      const apiKey = "1112deff5a7c4a01960a47aa5d78db1d";
      const pageSize = 5;
      let category = news.category;
      const API_URL = `https://newsapi.org/v2/top-headlines?country=kr&category=${
        category === "all" ? "" : category
      }&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
      const response = await axios.get(API_URL);
      showNews(response.data.articles);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const showNews = (list) => {
    list.forEach((news) => {
      const $news = document.createElement("section");
      $news.classList.add("news-item");
      $news.innerHTML = `
        <div class="thumbnail">
          <a href="${news.url}" target="_blank" rel="noopener noreferrer">
          <img
            src="${news.urlToImage}" alt="thumbnail" />
          </a>
        </div>
        <div class="contents">
          <h2>
            <a href="${news.url}" target="_blank" rel="noopener noreferrer">
              ${news.title}
            </a>
          </h2>
          <p>
            ${news.description}
          </p>
        </div>
      `;
      $article.appendChild($news);
    });
  };
  window.addEventListener("DOMContentLoaded", () => {
    loadNews();
  });
  subscribe(loadNews);

  //무한스크롤
  // const fetchMore = async () => {
  //   page++;
  //   await loadNews();
  // };

  // const fetchMoreObserver = new IntersectionObserver(([isIntersecting]) => {
  //   if (isIntersecting) fetchMore();
  // });
  // fetchMoreObserver.observe($scrollObserver);
};

export default NewsList;
