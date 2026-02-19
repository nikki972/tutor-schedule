document.addEventListener('DOMContentLoaded', () => {

  const dayNameEl = document.getElementById('dayName');
  const dateEl = document.getElementById('date');
  const header = document.querySelector('.header');

  const prevBtn = document.getElementById('prevDay');
  const nextBtn = document.getElementById('nextDay');
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const addBtn = document.getElementById('addLessonBtn');

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

  const FIXED_HOLIDAYS = [
    '01-01','01-02','01-03','01-04','01-05','01-06','01-07','01-08',
    '02-23','03-08','05-01','05-09','06-12','11-04'
  ];

  function isHoliday(date) {
    const mmdd = date.toISOString().slice(5, 10);
    return FIXED_HOLIDAYS.includes(mmdd);
  }

  function isWeekend(date) {
    const d = date.getDay();
    return d === 0 || d === 6;
  }

  function formatDate(date) {
    return String(date.getDate()).padStart(2, '0') + '.' +
           String(date.getMonth() + 1).padStart(2, '0');
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

  addBtn.onclick = () => {
    alert('Добавление занятия — следующий шаг 🙂');
  };

  renderDate();
});
