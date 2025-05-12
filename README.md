# PixelVault: Retro Game Finder & Wishlist

PixelVault is a modern web application that helps retro gaming enthusiasts discover, explore, and track classic video games. Built with React and powered by the RAWG API, it provides a seamless experience for browsing retro games, viewing detailed information, and managing a personal wishlist.

## 🌟 Features

- **Game Discovery**

  - Browse curated retro games (1980-1999)
  - Search functionality with debounced input
  - Detailed game information including ratings, release dates, and descriptions
  - Responsive grid layout for game cards

- **Personal Wishlist**

  - Add/remove games to your personal wishlist
  - Persistent storage using localStorage
  - Dedicated wishlist page
  - Quick access to wishlist management

- **User Experience**
  - Dark/Light theme support
  - Responsive design
  - Smooth navigation
  - Loading states and error handling
  - Accessible interface

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6 with SWC
- **State Management & Data Fetching:**
  - TanStack Query (React Query) v5 for server state
  - React Context API for client state
- **Routing:** TanStack Router v1 (file-based routing)
- **Styling:** TailwindCSS v4 with Prettier plugin
- **Development Tools:**
  - TypeScript 5.8
  - ESLint 9 with React Hooks and Prettier integration
  - Prettier 3.5 with Tailwind plugin
  - TanStack Router DevTools
  - React Query DevTools
- **UI Components:**
  - Lucide React for icons
- **Validation:** Zod for runtime type checking
- **Package Manager:** pnpm (recommended)
- **API Integration:** RAWG Games Database API

## 📦 Project Structure

```
pixel-vault/
├── src/
│   ├── assets/                   # Static assets
│   ├── components/               # Reusable UI components
│   │   ├── GameCard.tsx         # Individual game display card
│   │   ├── GameList.tsx         # Grid of game cards
│   │   ├── GameListLoader.tsx   # Loading state component
│   │   ├── Navbar.tsx           # Navigation component
│   │   └── ThemeToggleButton.tsx # Theme switcher
│   ├── context/                 # React Context definitions
│   ├── hooks/                   # Custom React hooks
│   ├── layout/                  # Layout components
│   ├── providers/               # Context providers
│   ├── routes/                  # Route components (using TanStack Router)
│   │   ├── __root.tsx          # Root layout
│   │   ├── index.tsx           # Home page
│   │   ├── about.tsx           # About page
│   │   ├── wishlist.tsx        # Wishlist page
│   │   └── gamedetails.$gameId.tsx # Game details page
│   ├── schemas/                 # TypeScript/validation schemas
│   ├── index.css               # Global styles (Tailwind imports)
│   ├── main.tsx                # Application entry point
│   └── routeTree.gen.ts        # Generated route tree
├── public/                     # Public static files
├── dist/                       # Production build output
├── .env                        # Environment variables
├── .gitignore                 # Git ignore rules
├── .prettierrc                # Prettier configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── pnpm-lock.yaml            # PNPM lock file
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TS config
├── tsconfig.node.json        # Node-specific TS config
└── vite.config.ts            # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm (recommended)
- RAWG API key (get one at [rawg.io](https://rawg.io/apidocs))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pixel-vault.git
   cd pixel-vault
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create a `.env` file in the root directory:

   ```
   VITE_RAWG_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## 💻 Usage

### Browsing Games

- The home page displays a grid of retro games
- Use the search bar to find specific games
- Click on a game card to view detailed information

### Managing Wishlist

- Click "Add to Wishlist" on any game card
- Access your wishlist via the navigation bar
- Remove games from your wishlist as needed
- Your wishlist persists between sessions

### Theme Switching

- Toggle between light and dark themes using the theme button in the navigation bar
- Theme preference is saved in localStorage

## 🔧 Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript type checking

### Code Style

- Follow the TypeScript and React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful component and function documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [RAWG Video Games Database API](https://rawg.io/apidocs) for game data
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- All contributors and supporters of the project
