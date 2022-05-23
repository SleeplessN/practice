// do something!
import { news } from "../App.js";

const Nav = ($root) => {
  // 기본틀
  const $categoryList = document.createElement("nav");
  $categoryList.classList.add("category-list");
  $categoryList.innerHTML = `
  <ul>
    <li id="all" class="category-item active">전체보기</li>
    <li id="business" class="category-item">비즈니스</li>
    <li id="entertainment" class="category-item">엔터테인먼트</li>
    <li id="health" class="category-item">건강</li>
    <li id="science" class="category-item">과학</li>
    <li id="sports" class="category-item">스포츠</li>
    <li id="technology" class="category-item">기술</li>
  </ul>
  `;
  $root.append($categoryList);

  // 전체 active 삭제
  const removeActive = function () {
    $categoryList.childNodes[1].childNodes.forEach((list) => {
      if (list.tagName === "LI") {
        list.classList.remove("active");
      }
    });
  };

  //버튼 이벤트
  $categoryList.addEventListener("click", (e) => {
    if (e.target.id) {
      $categoryList.nextSibling.firstChild.innerHTML = "";
      news.category = e.target.id;
      removeActive();
      e.target.classList.add("active");
    }
  });
};

export default Nav;
