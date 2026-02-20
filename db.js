const DB_NAME = 'TutorScheduleDB';
const DB_VERSION = 1;

let db = null;

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = e => {
      db = e.target.result;

      if (!db.objectStoreNames.contains('lessons')) {
        const store = db.createObjectStore('lessons', { keyPath: 'id' });
        store.createIndex('date', 'date');
      }
    };

    request.onsuccess = e => {
      db = e.target.result;
      resolve(db);
    };

    request.onerror = () => reject('Ошибка открытия БД');
  });
}

export function addLesson(lesson) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('lessons', 'readwrite');
    const store = tx.objectStore('lessons');
    store.add(lesson);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject('Ошибка сохранения занятия');
  });
}

export function getLessonsByDate(date) {
  return new Promise(resolve => {
    const tx = db.transaction('lessons', 'readonly');
    const store = tx.objectStore('lessons');
    const index = store.index('date');
    const request = index.getAll(date);

    request.onsuccess = () => resolve(request.result || []);
  });
}

export function lessonExists({ date, time, studentId }) {
  return new Promise(resolve => {
    const tx = db.transaction('lessons', 'readonly');
    const store = tx.objectStore('lessons');
    const req = store.getAll();

    req.onsuccess = () => {
      const exists = req.result.some(
        l => l.date === date && l.time === time && l.studentId === studentId
      );
      resolve(exists);
    };
  });
}