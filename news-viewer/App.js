// do something!
import Nav from "./components/Nav.js";
import NewsList from "./components/NewsList.js";
const $root = document.querySelector("#root");

// news 카테고리
export let news = {
  category: "all",

  listeners: [],
  notify() {
    this.listeners.forEach((listener) => listener());
  },
};
news = new Proxy(news, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    target.notify();
    return true;
  },
});
export const subscribe = (listener) => {
  news.listeners.push(listener);
};

Nav($root);
NewsList($root);
