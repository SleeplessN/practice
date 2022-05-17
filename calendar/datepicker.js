import { myCalendar } from "./calendar.js";

const myPicker = function ($picker) {
  // picker가 있으면 그 다음 형제로 캘린더 생성
  const calendar = document.createElement("div");
  calendar.classList.add("calendar");
  $picker.after(calendar);
  const $calendar = $picker.nextSibling;
  myCalendar($calendar);
  $calendar.style.display = "none";

  // input 클릭시 달력 보이도록
  $picker.addEventListener("click", () => {
    const $calendar = $picker.nextSibling;
    $calendar.style.display = "block";
  });

  const $pickerCalendar = $picker.nextSibling;
  const $calendarDate = $pickerCalendar.childNodes[1].childNodes[1];

  // input에 날짜표시
  $calendarDate.addEventListener("click", function (e) {
    if (
      e.target.className === "day" ||
      e.target.className === "prev-day" ||
      e.target.className === "next-day"
    ) {
      $picker.value = sessionStorage.getItem("clickDate");
      sessionStorage.removeItem("clickDate");
      $calendar.style.display = "none";
    }
    e.target.classList.add("pick-mark");
  });

  // 다른데 클릭시 달력 사라지도록
  const $body = document.querySelector("body");
  $body.addEventListener("click", function (e) {
    if (e.target.className === "") {
      $calendar.style.display = "none";
    }
  });
};
export default myPicker;
