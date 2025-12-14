# 🎬 Indian Movie Recommender

A beautiful, responsive movie recommendation application featuring Indian cinema across multiple languages including Hindi, Tamil, Telugu, Kannada, Malayalam, and Marathi.

## ✨ Features

### 🎯 Smart Recommendations
- **Personalized Suggestions**: Get movie recommendations based on your rating history
- **Genre-Based Scoring**: The recommendation engine analyzes your genre preferences from rated movies
- **Similar Movies**: Discover movies similar to ones you've already enjoyed

### ⭐ Rating System
- **5-Star Rating**: Rate movies with an intuitive star rating interface
- **Persistent Storage**: Your ratings are saved locally and persist across sessions
- **Rating History**: View and manage all your movie ratings

### 🎭 Genre Filtering
- Filter movies by multiple genres simultaneously
- Supported genres: Action, Drama, Romance, Comedy, Thriller, Mystery, Biography, Historical, Family, Musical
- Visual genre preferences panel showing your top-rated genres

### 🌐 Language Filtering
- Filter movies by Indian regional languages
- Supported languages: Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi
- Multi-select capability for viewing movies from multiple languages

### 🌍 Multi-Language UI
- Interface available in 22 Indian languages
- Seamless language switching via the header dropdown
- Fully translated labels, buttons, and descriptions

### 🎨 Beautiful Design
- Dark theme with glassmorphism effects
- Responsive grid layout for all screen sizes
- Smooth animations and hover effects
- Movie poster cards with language badges

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Component Library |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Utility-First Styling |
| **shadcn/ui** | Pre-built UI Components |
| **Lucide React** | Icon Library |
| **React Router** | Client-Side Routing |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── GenreFilter.tsx        # Genre selection component
│   ├── GenrePreferences.tsx   # User's genre preferences display
│   ├── Header.tsx             # App header with language selector
│   ├── LanguageFilter.tsx     # Language filtering component
│   ├── LanguageSelector.tsx   # UI language switcher
│   ├── MovieCard.tsx          # Individual movie display card
│   ├── NavLink.tsx            # Navigation link component
│   ├── RecommendationSection.tsx # Personalized recommendations
│   └── StarRating.tsx         # Interactive star rating
├── data/
│   └── movies.ts              # Movie database with 20+ Indian films
├── hooks/
│   ├── useLanguage.ts         # UI language management
│   └── useRatings.ts          # User ratings state management
├── lib/
│   ├── i18n.ts                # Internationalization translations
│   ├── recommendations.ts     # Recommendation algorithm
│   └── utils.ts               # Utility functions
├── pages/
│   ├── Index.tsx              # Main application page
│   └── NotFound.tsx           # 404 error page
└── index.css                  # Global styles & design tokens
```

## 🎬 Featured Movies

The app includes popular Indian movies across various languages:

- **Hindi**: 3 Idiots, Dangal, PK, Lagaan, Drishyam, Andhadhun
- **Telugu**: Baahubali, RRR, Pushpa
- **Tamil**: Vikram, Master, Ponniyin Selvan
- **Kannada**: KGF, Kantara
- **Malayalam**: Manjummel Boys, Premam, Drishyam
- **Marathi**: Sairat, Natsamrat

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔧 How the Recommendation Engine Works

1. **Collect Ratings**: User rates movies on a 1-5 star scale
2. **Analyze Preferences**: System calculates average ratings per genre
3. **Score Unrated Movies**: Each unrated movie receives a score based on genre overlap with user preferences
4. **Rank & Recommend**: Top-scoring movies are presented as recommendations

```typescript
// Simplified recommendation logic
const score = movie.genres.reduce((total, genre) => {
  const preference = genrePreferences.find(g => g.genre === genre);
  return total + (preference?.score || 0);
}, 0) / movie.genres.length;
```

## 📱 Responsive Design

- **Desktop**: Full sidebar with filters, 3-4 column movie grid
- **Tablet**: Collapsible sidebar, 2-3 column grid
- **Mobile**: Stacked layout, single column, touch-friendly controls

## 🎨 Design System

The app uses a custom dark theme with CSS custom properties:

- `--background`: Deep dark background
- `--primary`: Accent color for interactive elements
- `--muted`: Subtle backgrounds for cards
- `--border`: Glassmorphism borders

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Movie data inspired by popular Indian cinema
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Built with ❤️ using [Lovable](https://lovable.dev)
