<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Interior AI Designer

An AI-powered interior design application built with Next.js and Google's Gemini AI. Transform your spaces with image redesign, video generation, and floor plan analysis.

## Features

- 🖼️ **Image Redesign**: Upload room photos and get AI-generated redesigns
- 🎥 **Video Generation**: Create transformation videos using Google's Veo model
- 📐 **Floor Plan Analysis**: Upload floor plans and get detailed room analysis

## Run Locally

**Prerequisites:** Node.js 20+ (recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

3. Set your Gemini API key in `.env.local`:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Get your API key from: https://ai.google.dev/

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19 + Tailwind CSS
- **AI**: Google Gemini AI (@google/genai)
- **Language**: TypeScript
