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

  const changeCategory = () => {
    firstPageLoaded = false;
    page = 1;
    loadNews();
  };
  let firstPageLoaded = false;
  let page = 1;
  const loadNews = async () => {
    try {
      const apiKey = "e2ca29d899134449a873aafd5310b5fc";
      const pageSize = 5;
      const category = news.category;
      const API_URL = `https://newsapi.org/v2/top-headlines?country=kr&category=${
        category === "all" ? "" : category
      }&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
      const response = await axios.get(API_URL);
      showNews(response.data.articles);
      firstPageLoaded = true;
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
  subscribe(changeCategory);

  //무한스크롤
  const fetchMore = () => {
    if (firstPageLoaded === true) {
      page++;
      loadNews();
    }
  };

  const fetchMoreObserver = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting) fetchMore();
  });
  fetchMoreObserver.observe($scrollObserver);

  // const fetchMoreObserver = new IntersectionObserver((entry) =>
  //   console.log(entry[0].isIntersecting)
  // );
};

export default NewsList;
