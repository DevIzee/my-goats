# My Greatest Of All Times (My GOATS)

**Personal project** to manage and browse my favorite works (movies, series, anime, documentaries, YouTube videos).

## Features

- Browse list in **cards** or **table** view with toggle
- **Search** by name
- **Filters** by type, rating, genre, status, platform
- **Sort** by name, year, or rating
- **Refresh** button to reload data from `goats.json`
- Clickable links to external videos (YouTube, etc.)
- Manual data management via `goats.json`

## Project Structure

```
my-goats/
│
├── index.html       <- main page
├── script.js        <- JS logic (rendering, filters, toggle)
├── goats.json       <- works data (read-only)
├── style.css        <- optional if Tailwind CDN not used
└── README.md
```

## Installation & Running

### Prerequisites

- **Python 3** installed on your machine
- Modern browser (Chrome, Firefox, Edge…)

### Steps

1. Open a terminal in the project folder `my-goats`
2. Start the local server:

```bash
python -m http.server 8000
```

3. Open your browser at:

```
http://localhost:8000
```
