# 🛋️ AI Interior Design Assistant

An AI-powered web app that helps you reimagine your space — upload a photo of your room, pick a design style, and get AI-generated redesign concepts along with furniture and color suggestions.

> 🚧 **Status:** In progress — built step by step as a learning + portfolio project focused on strengthening core HTML, CSS, JavaScript, and serverless backend skills.

## ✨ Planned Features
- 📸 Upload a room photo
- 🎨 Choose an interior design style
- 🖼️ Generate redesigned room concepts using AI (via [Replicate](https://replicate.com))
- 🛋️ Get furniture & color suggestions
- 💾 Save your favorite design concepts

## 🛠️ Built With
- HTML5
- CSS3 (custom properties, Flexbox, responsive design)
- Vanilla JavaScript
- Vercel Serverless Functions (Node.js) as an API proxy
- AI image generation via Replicate (integration in progress)
- `localStorage` for saving designs (planned)

## 📌 Progress
- [x] Project setup
- [x] Basic page structure (HTML)
- [x] Styling (CSS)
- [x] Interactivity (JavaScript) — style selection, photo preview, button wiring
- [x] Serverless function scaffolding (Vercel `/api` route)
- [ ] Replicate API integration (env var configured, real call in progress)
- [ ] Connect AI response to frontend result image
- [ ] Save & manage designs
- [ ] Polish & deploy

## 🗂️ Project Structure
ai-interior-design-assistant/
├── api/
│ └── generate.js
├── index.html
├── script.js
├── style.css
├── .env.local (not committed — holds Replicate API token)
├── .gitignore
└── README.md

## 👩‍💻 Author
Built by Savaira Ameer — learning frontend development and backend fundamentals one commit at a time.