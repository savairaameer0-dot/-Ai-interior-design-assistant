console.log("script.js is running");

const styleButtons = document.querySelectorAll('.style-option');
let selectedStyle = null;

styleButtons.forEach(button => {
  button.addEventListener('click', () => {
    styleButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedStyle = button.dataset.style;
  });
});

const photoInput = document.getElementById('room-photo');
const resultImage = document.getElementById('result-image');
const resultPlaceholder = document.getElementById('result-placeholder');
const uploadDropzone = document.getElementById('upload-dropzone');
const uploadPreview = document.getElementById('upload-preview');
const uploadDropzoneContent = document.getElementById('upload-dropzone-content');

let uploadedFile = null;

photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  if (file) {
    uploadedFile = file;
    uploadPreview.src = URL.createObjectURL(file);
    uploadPreview.style.display = 'block';
    uploadDropzoneContent.style.display = 'none';
  }
});

// Drag & drop support
['dragover', 'dragleave', 'drop'].forEach(eventName => {
  uploadDropzone.addEventListener(eventName, (e) => e.preventDefault());
});

uploadDropzone.addEventListener('dragover', () => {
  uploadDropzone.classList.add('dragover');
});

uploadDropzone.addEventListener('dragleave', () => {
  uploadDropzone.classList.remove('dragover');
});

uploadDropzone.addEventListener('drop', (e) => {
  uploadDropzone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) {
    photoInput.files = e.dataTransfer.files;
    photoInput.dispatchEvent(new Event('change'));
  }
});

// Convert a File to base64 (without the "data:image/...;base64," prefix)
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', async () => {
  if (!uploadedFile) {
    alert('Please upload a room photo first.');
    return;
  }
  if (!selectedStyle) {
    alert('Please choose a style first.');
    return;
  }

  generateBtn.classList.add('loading');

  try {
    const imageBase64 = await fileToBase64(uploadedFile);
    const prompt = `Redesign this room in a ${selectedStyle} interior design style. Keep the room's layout and structure, but change furniture, colors, and decor to match the style.`;

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64,
        mimeType: uploadedFile.type,
        prompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    resultImage.src = `data:${data.mimeType};base64,${data.imageBase64}`;
    resultImage.style.display = 'block';
    resultPlaceholder.style.display = 'none';
  } catch (error) {
    console.error('Error calling API:', error);
    alert('Generation failed: ' + error.message);
  } finally {
    generateBtn.classList.remove('loading');
  }
  async function generateRoomDesign(imageBase64, prompt) {
  const res = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64, prompt }),
  });
  const data = await res.json();
  if (data.error) {
    console.error('Error:', data.error);
    return null;
  }
  return data.image; // yeh base64 image tumhare <img> src mein daal sakte ho
}
});
