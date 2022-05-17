// module화
import { myCalendar, linkAdd } from "./calendar.js";
import myPicker from "./datepicker.js";
const $container = document.querySelectorAll(".calendar");
linkAdd();
$container.forEach(myCalendar);

const $picker = document.querySelectorAll(".picker");

$picker.forEach(myPicker);
