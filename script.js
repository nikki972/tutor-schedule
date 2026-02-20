const lessonsList = document.getElementById('lessonsList');
const modal = document.getElementById('lessonModal');
const addBtn = document.getElementById('addLessonBtn');
const cancelBtn = document.getElementById('cancelLessonBtn');
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');

let currentDate = new Date();

function renderDate() {
  const dayNames = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  document.getElementById('dayName').textContent = dayNames[currentDate.getDay()];
  document.getElementById('dateValue').textContent =
    currentDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
}

renderDate();

document.getElementById('prevDay').onclick = () => {
  currentDate.setDate(currentDate.getDate() - 1);
  renderDate();
};

document.getElementById('nextDay').onclick = () => {
  currentDate.setDate(currentDate.getDate() + 1);
  renderDate();
};

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

addBtn.onclick = openModal;
cancelBtn.onclick = closeModal;

menuBtn.onclick = () => {
  sideMenu.classList.toggle('hidden');
};

function addLesson(time, name, subject) {
  const div = document.createElement('div');
  div.className = 'lesson';
  div.innerHTML = `
    <div class="lesson-content">
      <div class="lesson-time">${time}</div>
      <div class="lesson-info">
        <div>${name}</div>
        <div class="lesson-subject">${subject}</div>
      </div>
    </div>
    <button class="delete-btn">Удалить</button>
  `;
  lessonsList.appendChild(div);
}

addLesson('15:00', 'Иван', 'Математика');

let swipedLesson = null;
let touchStartX = null;

document.addEventListener('touchstart', e => {
  const lesson = e.target.closest('.lesson');
  if (!lesson) return;
  touchStartX = e.touches[0].clientX;
  lesson._touching = true;
});

document.addEventListener('touchend', e => {
  const lesson = e.target.closest('.lesson');
  if (!lesson || !lesson._touching) return;

  const diffX = e.changedTouches[0].clientX - touchStartX;

  if (diffX < -40) {
    if (swipedLesson && swipedLesson !== lesson) {
      swipedLesson.classList.remove('swiped');
    }
    lesson.classList.add('swiped');
    swipedLesson = lesson;
  }

  if (diffX > 40 && !lesson.classList.contains('swiped')) {
    openEditLesson(lesson);
  }

  lesson._touching = false;
  touchStartX = null;
});

document.addEventListener('click', e => {
  if (swipedLesson && !e.target.closest('.lesson') && !e.target.closest('button')) {
    swipedLesson.classList.remove('swiped');
    swipedLesson = null;
  }
});

function openEditLesson() {
  openModal();
}
