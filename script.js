import { isHoliday } from './holidays.js';

document.addEventListener('DOMContentLoaded', () => {
  const dayNameEl = document.getElementById('dayName');
  const dateEl = document.getElementById('date');
  const header = document.querySelector('.header');

  const prevBtn = document.getElementById('prevDay');
  const nextBtn = document.getElementById('nextDay');

  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');

  let currentDate = new Date();

  const dayNames = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];

  function formatDate(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return ${d}.${m};
  }

  function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  function renderDate() {
    dayNameEl.textContent = dayNames[currentDate.getDay()];
    dateEl.textContent = formatDate(currentDate);

    if (isWeekend(currentDate) || isHoliday(currentDate)) {
      header.classList.add('holiday');
    } else {
      header.classList.remove('holiday');
    }
  }

  prevBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    renderDate();
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    renderDate();
  });

  // Меню
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

  overlay.addEventListener('click', () => {
    sideMenu.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  renderDate();
});
