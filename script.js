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

  const fab = document.querySelector('.fab');
  const modal = document.getElementById('lessonModal');
  const closeModal = document.getElementById('closeModal');
  const lessonDate = document.getElementById('lessonDate');
  const lessonTime = document.getElementById('lessonTime');

  let currentDate = new Date();

  const dayNames = [
    'Воскресенье','Понедельник','Вторник',
    'Среда','Четверг','Пятница','Суббота'
  ];

  function formatDate(date) {
    return ${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth()+1).padStart(2,'0')};
  }

  function isWeekend(date) {
    const d = date.getDay();
    return d === 0 || d === 6;
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

  prevBtn.onclick = () => {
    currentDate.setDate(currentDate.getDate() - 1);
    renderDate();
  };

  nextBtn.onclick = () => {
    currentDate.setDate(currentDate.getDate() + 1);
    renderDate();
  };

  menuBtn.onclick = () => {
    sideMenu.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  overlay.onclick = () => {
    sideMenu.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  function openModal() {
    modal.classList.remove('hidden');
    lessonDate.value = currentDate.toISOString().slice(0,10);
    lessonTime.value = '10:00';
  }

  function closeLessonModal() {
    modal.classList.add('hidden');
  }

  fab.onclick = openModal;
  closeModal.onclick = closeLessonModal;

  modal.addEventListener('click', e => {
    if (e.target === modal) closeLessonModal();
  });

  renderDate();
});
