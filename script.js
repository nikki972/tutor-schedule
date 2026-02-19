document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');

  menuBtn.addEventListener('click', () => {
    sideMenu.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

  overlay.addEventListener('click', () => {
    sideMenu.classList.add('hidden');
    overlay.classList.add('hidden');
  });
});
