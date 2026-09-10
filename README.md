# 🛋️ AI Interior Design Assistant

## 📌 The Problem

People often want to see how their room would look in a different style before spending money on furniture, paint, or décor. Hiring an interior designer is expensive, and manually visualizing "what if my living room was Bohemian instead of Modern?" is hard without design software or Photoshop skills.

## 🎯 Purpose

Build a simple, accessible web app where anyone can:
1. Upload a photo of their room
2. Pick a design style (Modern, Minimalist, Bohemian, Industrial)
3. Instantly see an AI-generated visual of what that style could look like

The goal was to make interior design inspiration free and instant — no software, no expertise, no cost.

## 🔍 The Challenge We Ran Into

The original vision was **true photo editing** — taking the user's *exact* uploaded photo and transforming it (same layout, same room, new décor). During development, we discovered that **every provider capable of real image-to-image editing** (Replicate, Google Gemini, Hugging Face's image-to-image models) **requires billing enabled** — even though usage itself often costs fractions of a cent. There is currently no reliable, genuinely free way to do true photo-based editing.

We also found that Hugging Face has been actively deprecating its free image-to-image models (e.g. `instruct-pix2pix` was removed from its free `hf-inference` provider mid-project), which added extra instability to that path.

## ✅ The Solution We Built

To keep the app **fully free to run** while still being useful, we pivoted to a **text-to-image generation approach**:

- The user still uploads a room photo and picks a style (kept for UX — it sets expectations and personalizes the experience)
- Instead of editing that exact photo, the app builds a descriptive prompt from the chosen style (e.g. *"a modern living room with clean lines, neutral colors, and minimal furniture"*)
- That prompt is sent to **Hugging Face's free Inference Providers API**, using the `stabilityai/stable-diffusion-3-medium-diffusers` model, which generates a brand-new AI room image matching the style
- A random seed is included with each request so repeated generations in the same style produce varied results instead of an identical image every time

**Trade-off, stated plainly:** the generated image is a *new* room in the chosen style — not the user's actual room redesigned. This was a deliberate compromise to keep the tool free and usable, rather than gated behind a paid API.

## 🛠️ Built With
- HTML5
- CSS3 (custom properties, Flexbox, responsive design)
- Vanilla JavaScript
- Vercel Serverless Functions (Node.js) as an API proxy
- AI image generation via Hugging Face's `hf-inference` provider (Stable Diffusion 3 Medium — text-to-image)

## 📌 Progress
- [x] Project setup
- [x] Basic page structure (HTML)
- [x] Styling (CSS)
- [x] Interactivity (JavaScript) — style selection, photo preview, button wiring
- [x] Serverless function scaffolding (Vercel `/api` route)
- [x] Hugging Face API integration (live text-to-image generation working)
- [x] Connect AI response to frontend result image
- [x] Add randomized seed so repeated generations vary
- [ ] True photo-based editing (blocked on a free image-to-image provider becoming available, or adding a paid provider like Replicate/Gemini)
- [ ] Furniture & color suggestions
- [ ] Save & manage designs
- [ ] Polish & deploy

## 🗂️ Project Structure
ai-interior-design-assistant/
├── api/
│ └── generate.js
├── index.html
├── script.js
├── style.css
├── .env.local (not committed — holds Hugging Face API token)
├── .gitignore
└── README.md

## 🔑 Environment Variables
| Variable | Description |
|---|---|
| `HUGGINGFACE_API_KEY` | Fine-grained Hugging Face token with **"Make calls to Inference Providers"** permission enabled |

Set locally in `.env.local`, and in the Vercel dashboard for deployed environments (`vercel env add HUGGINGFACE_API_KEY`).

## 🏃 Running Locally
```bash
vercel dev
```
Then open [http://localhost:3000](http://localhost:3000).

## 👩‍💻 Author
Built by Savaira Ameer — learning frontend development and backend fundamentals one commit at a time.
