const styleButtons = document.querySelectorAll('.style-option');

styleButtons.forEach(button => {
  button.addEventListener('click', () => {
    styleButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});