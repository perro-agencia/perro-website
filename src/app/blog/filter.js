const filterButtons = document.querySelectorAll('.blogNav button');
const items = document.querySelectorAll('.item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    items.forEach(item => {
      item.style.display = 'none';
      if (filter === 'all' || item.id === filter) {
        item.style.display = 'block';
      }
    });
  });
});