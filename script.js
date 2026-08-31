console.log("script.js is running");
const styleButtons = document.querySelectorAll('.style-option');

styleButtons.forEach(button => {
  button.addEventListener('click', () => {
    styleButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});
const photoInput = document.getElementById('room-photo');
const resultImage = document.getElementById('result-image');

photoInput.addEventListener('change', () => {
  console.log("change event fired");
  const file = photoInput.files[0];
  console.log("file:", file);
  if (file) {
    resultImage.src = URL.createObjectURL(file);
    console.log("new src:", resultImage.src);
  }
});
