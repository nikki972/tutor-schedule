const modal = document.getElementById('lessonModal');
const addBtn = document.getElementById('addLessonBtn');
const cancelBtn = document.getElementById('cancelLessonBtn');
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const lessonsList = document.getElementById('lessonsList');

addBtn.onclick = () => modal.classList.remove('hidden');
cancelBtn.onclick = () => modal.classList.add('hidden');

menuBtn.onclick = () => {
  sideMenu.classList.toggle('hidden');
};

function renderLesson(time, name, subject) {
  const div = document.createElement('div');
  div.className = 'lesson';
  div.innerHTML = `
    <div class="lesson-content">
      <div class="lesson-time">${time}</div>
      <div class="lesson-info">
        <div class="lesson-name">${name}</div>
        <div class="lesson-subject">${subject}</div>
      </div>
    </div>
    <button class="delete-btn">Удалить</button>
  `;
  lessonsList.appendChild(div);
}

renderLesson('15:00', 'Иван', 'Математика');

let swiped = null;
let startX = 0;

document.addEventListener('touchstart', e => {
  const lesson = e.target.closest('.lesson');
  if (!lesson) return;
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  const lesson = e.target.closest('.lesson');
  if (!lesson) return;

  const diff = e.changedTouches[0].clientX - startX;

  if (diff < -40) {
    if (swiped && swiped !== lesson) swiped.classList.remove('swiped');
    lesson.classList.add('swiped');
    swiped = lesson;
  }

  if (diff > 40 && !lesson.classList.contains('swiped')) {
    modal.classList.remove('hidden');
  }
});

document.addEventListener('click', e => {
  if (swiped && !e.target.closest('.lesson')) {
    swiped.classList.remove('swiped');
    swiped = null;
  }
});
