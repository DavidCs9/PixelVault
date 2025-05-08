## PixelVault: Retro Game Finder & Wishlist \- Project Plan

**Core Idea:** A web application where users can search for classic retro video games, view details about them, and add them to a personal wishlist.

**Tech Stack (to be introduced incrementally):**

- React (using Vite for setup: `npm create vite@latest pixel-vault -- --template react-ts` if you want TypeScript, or `react` for JavaScript)
- React Hooks: `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback`, Custom Hooks
- React Query: For data fetching, caching, and server state management.
- React Router: For client-side navigation.
- Styling: Choose one:
  - CSS Modules (built-in with Vite if you name files `*.module.css`)
  - Styled Components (`npm install styled-components`)
  - Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer` and follow setup)
- (Optional) UI Library: A few components from Material-UI or Chakra UI.

---

### Phase 1: The Basic Game Viewer (Focus: `useState`, `useEffect`)

**Goal:** Display a list of retro games and allow users to see basic details of a selected game.

**Steps & Requirements:**

1. **Project Setup:**

   - Create a new React application using Vite.
   - Get your API key from RAWG. Store it securely (e.g., in a `.env` file, Vite handles this automatically if you prefix with `VITE_`).
     - Example `.env` file: `VITE_RAWG_API_KEY=your_actual_api_key_here`
     - Access in code: `import.meta.env.VITE_RAWG_API_KEY`

2. **`GameCard` Component (`src/components/GameCard.jsx` or `.tsx`):**

   - **Props:** Takes a `game` object as a prop.
   - **Display:** Shows the game's name and background image (`background_image` from API).
   - Make it look like a simple card.

3. **`GameList` Component (`src/components/GameList.jsx`):**

   - **State (`useState`):**
     - `games`: An array to store fetched games (initially empty).
     - `isLoading`: A boolean for loading state (initially `true`).
     - `error`: A string or object to store any fetching error (initially `null`).
   - **Data Fetching (`useEffect`):**
     - On component mount, fetch a list of retro games.
       - API Endpoint: `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&dates=1980-01-01,1999-12-31&ordering=-rating&page_size=12` (fetches games released between 1980-1999, ordered by rating, 12 per page).
     - Update `isLoading` to `false` after fetching (success or fail).
     - Populate `games` state on success.
     - Set `error` state on failure.
     - **Remember the dependency array for `useEffect`\!**
   - **Rendering:**
     - If `isLoading`, display "Loading games... 🕹️".
     - If `error`, display the error message.
     - If games are loaded, map over the `games` array and render a `GameCard` for each game.
     - Add basic styling to display cards in a grid.

4. **`App` Component (`src/App.jsx`):**
   - Render the `GameList` component.
   - Add a simple title like "PixelVault \- Retro Game Finder".

**Checkpoint 1:** You should see a list of retro game cards displayed on the page.

---

### Phase 2: Interactive Details & User Context (Focus: `useState` for selection, `useContext`)

**Goal:** Allow users to click a game to see more details and introduce a theme context.

**Steps & Requirements:**

1. **`GameDetailModal` Component (`src/components/GameDetailModal.jsx`):**

   - **Props:** `game` (the selected game object), `onClose` (a function to close the modal).
   - **Display:**
     - Show more details: name, release date (`released`), rating (`rating`), description (you might need to fetch full game details if the list API doesn't provide enough, or use `game.description_raw` if available).
     - A "Close" button that calls `onClose`.
   - Style it as a modal overlay.

2. **Integrate Modal into `App.jsx` (or `GameList.jsx`):**

   - **State (`useState` in `App.jsx`):**
     - `selectedGame`: Stores the game object that the user clicks on (initially `null`).
   - **Event Handling in `GameCard.jsx`:**
     - Modify `GameCard` to accept an `onGameSelect` prop (a function).
     - When a game card is clicked, call `onGameSelect(game)`.
   - **In `App.jsx` (or wherever `GameList` is rendered):**
     - Pass a handler function to `GameList` that updates `selectedGame`.
     - Conditionally render `GameDetailModal` if `selectedGame` is not `null`, passing `selectedGame` and a function to set `selectedGame` back to `null` (for `onClose`).

3. **Theme Context (`src/contexts/ThemeContext.jsx`):**

   - **Create Context:**
     - Use `createContext` to create `ThemeContext`.
     - Default value: `{ theme: 'light', toggleTheme: () => {} }`.
   - **`ThemeProvider` Component (in the same file):**
     - Manages `theme` state (`useState`: 'light' or 'dark').
     - Provides `theme` and `toggleTheme` function via `ThemeContext.Provider`.
   - **Wrap `App`:** In `src/main.jsx`, wrap your `<App />` component with `<ThemeProvider />`.

4. **`ThemeToggleButton` Component (`src/components/ThemeToggleButton.jsx`):**

   - **Consume Context (`useContext`):**
     - Use `useContext(ThemeContext)` to get `theme` and `toggleTheme`.
   - Render a button that displays "Switch to Dark Mode" or "Switch to Light Mode" and calls `toggleTheme` on click.
   - Place this button in `App.jsx`.

5. **Apply Theme:**
   - In `App.jsx` (or other components), consume `ThemeContext`.
   - Conditionally apply a class name (e.g., `dark-theme`) to the main app container or use styled-components theming based on the `theme` value.
   - Add some basic CSS for `.dark-theme` (e.g., dark background, light text).

**Checkpoint 2:** You can click a game card to see a modal with details. You can toggle between light and dark themes.

---

### Phase 3: Robust Wishlist & Data Fetching with React Query (Focus: `useReducer`, `React Query`, `useCallback`, Custom Hooks)

**Goal:** Implement a wishlist using `useReducer`, refactor data fetching with React Query, and create a custom hook.

**Steps & Requirements:**

1. **Wishlist with `useReducer` (`src/contexts/WishlistContext.jsx`):**

   - **Define Actions & Reducer:**
     - Actions: `ADD_TO_WISHLIST`, `REMOVE_FROM_WISHLIST`.
     - Reducer function (`wishlistReducer`) that takes `state` (array of game objects) and `action` (type and payload).
     - Ensure you don't add duplicate games.
   - **`WishlistProvider` Component:**
     - Use `useReducer` to manage `wishlist` state.
     - Provide `wishlist` state and `dispatch` function (or wrapper functions like `addToWishlist` and `removeFromWishlist` that call `dispatch`) via `WishlistContext.Provider`.
   - **Wrap `App`:** In `src/main.jsx`, wrap `<ThemeProvider />` (or `<App />`) with `<WishlistProvider />`.

2. **Integrate Wishlist Functionality:**

   - **`GameCard.jsx` / `GameDetailModal.jsx`:**
     - Consume `WishlistContext` using `useContext`.
     - Display an "Add to Wishlist" button if the game is not already in the wishlist.
     - Display a "Remove from Wishlist" button if it is.
     - Use `useCallback` for the `addToWishlist` and `removeFromWishlist` handler functions if you plan to memoize these components later or if they are passed down multiple levels.
   - **`WishlistPage` Component (placeholder for now, create `src/pages/WishlistPage.jsx`):**
     - Consume `WishlistContext`.
     - Display the list of games in the wishlist (just names for now). Each item should have a "Remove" button.

3. **Integrate React Query (`npm install @tanstack/react-query`):**

   - **Setup:**
     - In `src/main.jsx`, create a `QueryClient` and wrap `<WishlistProvider />` with `<QueryClientProvider client={queryClient}>`.
   - **Refactor `GameList.jsx`:**
     - Remove `useState` for `games`, `isLoading`, `error`.
     - Remove `useEffect` for data fetching.
     - Define an asynchronous function `fetchRetroGames`.
     - Use `useQuery` hook from React Query:
       const { data: games, isLoading, isError, error } \= useQuery({
       queryKey: \['retroGames'\], // Unique key for this query
       queryFn: fetchRetroGames,
       // Optional: staleTime, cacheTime
       });  

     - Adapt rendering logic to use `isLoading`, `isError`, `error`, and `games` from `useQuery`.

4. **Custom Hook: `useDebounce` (`src/hooks/useDebounce.js` or `.ts`):**

   - Create a custom hook that takes a `value` and a `delay` (e.g., 500ms).
   - It should return the debounced value (only updates after the user stops changing the input value for `delay` milliseconds).
   - Use `useState` and `useEffect` (with a `setTimeout` and `clearTimeout`) inside this custom hook.

5. **Search Functionality in `GameList.jsx`:**
   - Add an input field for searching games.
   - **State (`useState`):** `searchTerm`.
   - Use your `useDebounce` hook to get `debouncedSearchTerm` from `searchTerm`.
   - Modify `fetchRetroGames` function (and the `queryKey` for `useQuery`) to include the `debouncedSearchTerm` if it exists.
     - RAWG API search: `&search=${debouncedSearchTerm}`.
     - Update `queryKey`: `['retroGames', debouncedSearchTerm]` so React Query refetches when the debounced term changes.

**Checkpoint 3:** Game data is fetched via React Query. You can add/remove games from a wishlist. Searching for games works with a debounce.

---

### Phase 4: Navigation, Styling & UI Polish (Focus: `React Router`, Styling Choice, `useMemo`)

**Goal:** Transform into a multi-page app, apply consistent styling, and optionally use a UI library.

**Steps & Requirements:**

1. **React Router (`npm install react-router-dom`):**

   - **Setup:**
     - In `src/main.jsx`, import `BrowserRouter` and wrap `<QueryClientProvider />` with it.
   - **Create Pages (`src/pages/`):**
     - `HomePage.jsx`: Could display `GameList` or a welcome message.
     - `GameDetailPage.jsx`: Will display details for a single game.
     - `WishlistPage.jsx`: (Already created, now flesh it out) Display `GameCard` components for wishlist items.
   - **Define Routes in `App.jsx`:**
     - Use `<Routes>` and `<Route>` components.
     - `/`: `HomePage`
     - `/game/:gameId`: `GameDetailPage` (use `useParams` in this component to get `gameId`).
     - `/wishlist`: `WishlistPage`
   - **`Navbar` Component (`src/components/Navbar.jsx`):**
     - Use `Link` from `react-router-dom` for navigation to Home and Wishlist.
     - Include your `ThemeToggleButton`.
     - Add the `Navbar` to `App.jsx` so it's visible on all pages.
   - **Navigation Logic:**
     - Modify `GameCard` so clicking it navigates to `/game/:gameId` (use `useNavigate` or wrap with `<Link>`).
     - In `GameDetailPage.jsx`, fetch details for the specific game ID using `useQuery` and `useParams`.
       - Query key could be `['gameDetail', gameId]`.

2. **Styling Overhaul:**

   - **Choose and implement your styling strategy** (CSS Modules, Styled Components, or Tailwind CSS).
   - Apply consistent styling to: `Navbar`, `GameCard`, `GameDetailModal` (if still used, or integrate its content into `GameDetailPage`), `WishlistPage`, buttons, inputs.
   - Make it look good and feel cohesive\!
   - Ensure basic responsiveness.

3. **Performance Optimization with `useMemo`:**
   - In `WishlistPage.jsx`, if you want to display a count of wishlist items or some derived data from the wishlist that might be "expensive" to calculate on every render (e.g., "You have X games on your wishlist\!"), use `useMemo` to memoize this calculation.
     const wishlistItemCount \= useMemo(() \=\> {
     console.log("Calculating wishlist count..."); // To see when it runs
     return wishlist.length;
     }, \[wishlist\]); // Recalculates only if wishlist array changes
4. **(Optional) UI Library Integration:**
   - Pick a UI library (e.g., Material-UI: `npm install @mui/material @emotion/react @emotion/styled`).
   - Replace a few components like buttons or the modal with components from the library to get a feel for it. For example, use MUI's `<Button>` or `<Modal>`.

**Checkpoint 4:** The app has multiple pages with routing. It looks polished with consistent styling. `useMemo` is used for a calculated value.

---

### Phase 5: Final Touches & Review (Self-Study)

- **Error Handling:** Ensure robust error handling for API calls (React Query's `isError` and `error` help here). Display user-friendly error messages.
- **Empty States:** What happens if the wishlist is empty? Or if a search returns no results? Implement nice empty state messages.
- **Accessibility (a11y):**
  - Use semantic HTML (e.g., `<nav>`, `<main>`, `<button>`).
  - Ensure buttons and interactive elements are keyboard accessible.
  - Add `alt` text to images.
- **Code Cleanup:** Refactor any messy parts, add comments where necessary.
- **Local Storage for Wishlist (Stretch Goal):**
  - In `WishlistProvider`, use `useEffect` to save the wishlist to `localStorage` whenever it changes.
  - When the provider initializes, try to load the wishlist from `localStorage` as the initial state for `useReducer`.
- **Review & Prepare to Discuss:**
  - Think about the choices you made (e.g., why `useReducer` for wishlist, why React Query).
  - Be ready to explain how each hook works and why you used it.
  - Consider potential improvements or alternative approaches.

---

This project plan is ambitious for 4 days but hitting the core of each phase will give you excellent practice. Focus on understanding _why_ you're using each tool and hook. Good luck, and have fun building PixelVault\!
