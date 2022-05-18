// do something!
const linkAdd = () => {
  const themeLink = document.createElement("link");
  themeLink.href = "theme.css";
  themeLink.rel = "stylesheet";
  const linkAll = document.querySelectorAll("link");
  const lastLink = linkAll[linkAll.length - 1];
  lastLink.after(themeLink);
};
const myCalendar = ($container) => {
  //기본틀
  //calendar 자식요소 추가
  const calendarNav = document.createElement("div");
  const calendarGrid = document.createElement("div");
  calendarNav.classList.add("calendar-nav");
  calendarGrid.classList.add("calendar-grid");
  $container.append(calendarNav, calendarGrid);

  //calendarNav 자식요소 추가
  const $calendarNav = $container.firstChild;
  const prevNav = document.createElement("div");
  const currentDate = document.createElement("div");
  const nextNav = document.createElement("div");
  prevNav.classList.add("prev-nav");
  currentDate.classList.add("current-date");
  nextNav.classList.add("next-nav");
  $calendarNav.append(prevNav, currentDate, nextNav);
  const $currentDate = $calendarNav.childNodes[1];
  const currentMonthTag = document.createElement("div");
  const currentYearTag = document.createElement("div");
  currentMonthTag.classList.add("current-month");
  currentYearTag.classList.add("current-year");
  $currentDate.append(currentMonthTag, currentYearTag);

  //calendarGrid 자식요소 추가
  const $calendarGrid = $container.childNodes[1];
  const calendarDay = document.createElement("div");
  const calendarDate = document.createElement("div");
  calendarDay.classList.add("calendar-day");
  calendarDate.classList.add("calendar-date");
  $calendarGrid.append(calendarDay, calendarDate);

  const $calendarDay = $calendarGrid.firstChild;
  //요일 추가
  const weekList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  for (let i = 0; i < weekList.length; i++) {
    let dayDisplay = document.createElement("div");
    dayDisplay.classList.add("week");
    dayDisplay.innerText = weekList[i];
    $calendarDay.append(dayDisplay);
  }

  const $calendarDate = $calendarGrid.childNodes[1];
  // 기본틀 완료

  // 날짜 정보 가져오기
  const today = new Date();
  let thisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  let currentYear = thisMonth.getFullYear();
  let currentMonth = thisMonth.getMonth();

  const calendarRender = function ($thisMonth) {
    currentYear = $thisMonth.getFullYear();
    currentMonth = $thisMonth.getMonth();

    // 이번 달, 년도 Render
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const thisMonthDisplay = document.createElement("div");
    const thisYearDisplay = document.createElement("div");
    thisMonthDisplay.classList.add("current-month");
    thisYearDisplay.classList.add("current-year");
    thisMonthDisplay.innerText = monthList[$thisMonth.getMonth()];
    thisYearDisplay.innerText = $thisMonth.getFullYear();
    $currentDate.append(thisMonthDisplay, thisYearDisplay);

    // 지난 달 며칠까지 있는지
    const prevMonth = new Date(
      $thisMonth.getFullYear(),
      $thisMonth.getMonth(),
      0
    );
    const prevMonthLastDate = prevMonth.getDate();
    const prevMonthLastDay = prevMonth.getDay();

    // 지난 달
    if (prevMonthLastDay < 6) {
      for (
        let i = prevMonthLastDate - prevMonthLastDay;
        i <= prevMonthLastDate;
        i++
      ) {
        let date = new Date(currentYear, currentMonth - 1, i);
        let dateValue = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 10);
        let prevRender = document.createElement("div");
        prevRender.setAttribute("value", `${dateValue}`);
        prevRender.classList.add("prev-day");
        prevRender.innerText = i;
        $calendarDate.append(prevRender);
      }
    }

    // 이번 달 며칠까지 있는지
    const thisLastDate = new Date(
      $thisMonth.getFullYear(),
      $thisMonth.getMonth() + 1,
      0
    );
    const thisMonthLastDate = thisLastDate.getDate();

    for (let i = 1; i <= thisMonthLastDate; i++) {
      let date = new Date(currentYear, currentMonth, i);
      let dateValue = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .substring(0, 10);
      let thisRender = document.createElement("div");
      thisRender.setAttribute("value", `${dateValue}`);
      thisRender.classList.add("day");
      thisRender.innerText = i;
      $calendarDate.append(thisRender);
    }

    // 다음 달
    const nextMonth = new Date(
      $thisMonth.getFullYear(),
      $thisMonth.getMonth() + 1
    );
    const nextMonthDay = nextMonth.getDay();
    if (nextMonthDay > 0) {
      for (let i = 1; i <= 7 - nextMonthDay; i++) {
        let date = new Date(currentYear, currentMonth + 1, i);
        let dateValue = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 10);
        let nextRender = document.createElement("div");
        nextRender.setAttribute("value", `${dateValue}`);
        nextRender.classList.add("next-day");
        nextRender.innerText = i;
        $calendarDate.append(nextRender);
      }
    }

    // 오늘 날짜 표시
    if (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth
    ) {
      const todayDate = today.getDate();
      $calendarDate.childNodes[todayDate - 1].classList.add("today-mark");
    }
  };

  calendarRender(today);

  // prev, next 버튼
  const $prevGo = $calendarNav.firstChild;
  const $nextGo = $calendarNav.childNodes[2];
  let clickDate;
  $prevGo.addEventListener("click", function () {
    thisMonth = new Date(currentYear, currentMonth - 1, 1);
    $currentDate.innerHTML = "";
    $calendarDate.innerHTML = "";
    calendarRender(thisMonth);
  });
  $nextGo.addEventListener("click", function () {
    thisMonth = new Date(currentYear, currentMonth + 1, 1);
    $currentDate.innerHTML = "";
    $calendarDate.innerHTML = "";
    calendarRender(thisMonth);
  });
  // 클릭시 현재 날짜 표시
  $calendarDate.addEventListener("click", function (e) {
    console.log(e.target.getAttribute("value"));
  });
};

export { myCalendar, linkAdd };
