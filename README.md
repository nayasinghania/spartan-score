# Spartan Score

## About

Spartan Score is a GPA calculator designed for SJSU students to be able to easily calculate their GPA with just a screenshot of their grades

### Tech Stack

- Next.js
- Shadcn UI
- Tesseract OCR
- MongoDB
- Python

## Setup

## Frontend

1. `npm install`
2. `npm run dev`
3. `http://localhost:3000`

## Scraper (inserts course data into database)

1. `npm run scraper:install`
2. cp `.env.example` `.env`
3. `npm run db:start`
4. `npm run scraper:courses` (scrapes coursees)
5. `npm run scraper:professors` (scrapes professors)
