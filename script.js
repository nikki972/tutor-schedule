import { isHoliday } from './holidays.js';
import { openDB, addLesson, getLessonsByDate, lessonExists } from './db.js';

document.addEventListener('DOMContentLoaded', async () => {
  await openDB();

  const dayNameEl = document.getElementById('dayName');
  const dateEl = document.getElementById('date');
  const header = document.querySelector('.header');
  const lessonsEl = document.querySelector('.lessons');

  const prevBtn = document.getElementById('prevDay');
  const nextBtn = document.getElementById('nextDay');
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');

  const fab = document.querySelector('.fab');
  const modal = document.getElementById('lessonModal');
  const closeModal = document.getElementById('closeModal');
  const saveLessonBtn = document.getElementById('saveLesson');

  const lessonDate = document.getElementById('lessonDate');
  const lessonTime = document.getElementById('lessonTime');
  const subjectSelect = document.getElementById('subjectSelect');
  const studentSelect = document.getElementById('studentSelect');

  let currentDate = new Date();

  const dayNames = [
    'Воскресенье','Понедельник','Вторник',
    'Среда','Четверг','Пятница','Суббота'
  ];

  function iso(date) {
    return date.toISOString().slice(0,10);
  }

  function renderHeader() {
    dayNameEl.textContent = dayNames[currentDate.getDay()];
    dateEl.textContent =
      `${String(currentDate.getDate()).padStart(2,'0')}.${String(currentDate.getMonth()+1).padStart(2,'0')}`;

    header.classList.toggle(
      'holiday',
      currentDate.getDay() === 0 ||
      currentDate.getDay() === 6 ||
      isHoliday(currentDate)
    );
  }

  async function renderLessons() {
    lessonsEl.innerHTML = '';
    const lessons = await getLessonsByDate(iso(currentDate));

    lessons
      .sort((a,b) => a.time.localeCompare(b.time))
      .forEach(l => {
        const row = document.createElement('div');
        row.className = 'lesson-row';
        row.innerHTML = `
          <div class="lesson-time">${l.time}</div>
          <div class="lesson-info">
            <div class="lesson-student">${l.studentName}</div>
            <div class="lesson-subject">${l.subject}</div>
          </div>
        `;
        lessonsEl.appendChild(row);
      });
  }

  prevBtn.onclick = () => {
    currentDate.setDate(currentDate.getDate() - 1);
    renderHeader();
    renderLessons();
  };

  nextBtn.onclick = () => {
    currentDate.setDate(currentDate.getDate() + 1);
    renderHeader();
    renderLessons();
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
  modal.classList.add('active');
  lessonDate.value = iso(currentDate);
  lessonTime.value = '10:00';
}

function closeLessonModal() {
  modal.classList.remove('active');
}

  fab.onclick = openModal;
  closeModal.onclick = closeLessonModal;

  saveLessonBtn.onclick = async () => {
    const lesson = {
      id: crypto.randomUUID(),
      date: lessonDate.value,
      time: lessonTime.value,
      subject: subjectSelect.value,
      studentId: 'temp',
      studentName: 'Ученик',
      status: 'planned'
    };

    if (await lessonExists(lesson)) {
      alert('Такое занятие уже существует');
      return;
    }

    await addLesson(lesson);
    closeLessonModal();
    renderLessons();
  };

  renderHeader();
  renderLessons();
});
