import WishlistContext from "../context/WishlistContext";
import { useReducer } from "react";
import type { Game } from "../schemas/gameSchema";
import type { WishListAction } from "../schemas/wishListActionsSchema";

function wishlistReducer(state: Game[], action: WishListAction) {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return [...state, action.game];
    case "REMOVE_FROM_WISHLIST":
      return state.filter((game) => game.id !== action.game.id);
  }
}

function WishlistProvider({ children }: { children: React.ReactNode }) {
  const mockWishList: Game[] = [
    {
      id: 1,
      slug: "the-witcher-3-wild-hunt",
      name: "The Witcher 3: Wild Hunt",
      released: "2015-05-19",
      tba: false,
      background_image: "https://example.com/witcher3.jpg",
      rating: 4.66,
      rating_top: 5,
      ratings: {}, // Mock data, refine if needed
      ratings_count: 5000,
      reviews_text_count: "1200",
      added: 15000,
      added_by_status: {}, // Mock data, refine if needed
      metacritic: 92,
      playtime: 100,
      suggestions_count: 250,
      updated: "2024-01-01T10:00:00Z",
      esrb_rating: {
        id: 4,
        slug: "mature",
        name: "Mature",
      },
      platforms: [
        {
          platform: {
            id: 4,
            slug: "pc",
            name: "PC",
          },
          released_at: "2015-05-19",
          requirements: {
            minimum: "Minimum requirements for PC",
            recommended: "Recommended requirements for PC",
          },
        },
        {
          platform: {
            id: 18,
            slug: "playstation4",
            name: "PlayStation 4",
          },
          released_at: "2015-05-19",
          requirements: {
            minimum: "Minimum requirements for PS4",
            recommended: "Recommended requirements for PS4",
          },
        },
      ],
    },
    {
      id: 2,
      slug: "grand-theft-auto-v",
      name: "Grand Theft Auto V",
      released: "2013-09-17",
      tba: false,
      background_image: "https://example.com/gtav.jpg",
      rating: 4.48,
      rating_top: 5,
      ratings: {}, // Mock data, refine if needed
      ratings_count: 6000,
      reviews_text_count: "1500",
      added: 20000,
      added_by_status: {}, // Mock data, refine if needed
      metacritic: 96,
      playtime: 80,
      suggestions_count: 300,
      updated: "2024-01-01T10:00:00Z",
      esrb_rating: {
        id: 4,
        slug: "mature",
        name: "Mature",
      },
      platforms: [
        {
          platform: {
            id: 4,
            slug: "pc",
            name: "PC",
          },
          released_at: "2015-04-14",
          requirements: {
            minimum: "Minimum requirements for PC",
            recommended: "Recommended requirements for PC",
          },
        },
        {
          platform: {
            id: 18,
            slug: "playstation4",
            name: "PlayStation 4",
          },
          released_at: "2014-11-18",
          requirements: {
            minimum: "Minimum requirements for PS4",
            recommended: "Recommended requirements for PS4",
          },
        },
        {
          platform: {
            id: 16,
            slug: "playstation3",
            name: "PlayStation 3",
          },
          released_at: "2013-09-17",
          requirements: {
            minimum: "Minimum requirements for PS3",
            recommended: "Recommended requirements for PS3",
          },
        },
      ],
    },
    {
      id: 3,
      slug: "red-dead-redemption-2",
      name: "Red Dead Redemption 2",
      released: "2018-10-26",
      tba: false,
      background_image: "https://example.com/rdr2.jpg",
      rating: 4.9,
      rating_top: 5,
      ratings: {}, // Mock data, refine if needed
      ratings_count: 7000,
      reviews_text_count: "1800",
      added: 25000,
      added_by_status: {}, // Mock data, refine if needed
      metacritic: 97,
      playtime: 120,
      suggestions_count: 400,
      updated: "2024-01-01T10:00:00Z",
      esrb_rating: {
        id: 4,
        slug: "mature",
        name: "Mature",
      },
      platforms: [
        {
          platform: {
            id: 4,
            slug: "pc",
            name: "PC",
          },
          released_at: "2019-12-05",
          requirements: {
            minimum: "Minimum requirements for PC",
            recommended: "Recommended requirements for PC",
          },
        },
        {
          platform: {
            id: 18,
            slug: "playstation4",
            name: "PlayStation 4",
          },
          released_at: "2018-10-26",
          requirements: {
            minimum: "Minimum requirements for PS4",
            recommended: "Recommended requirements for PS4",
          },
        },
        {
          platform: {
            id: 1,
            slug: "xbox-one",
            name: "Xbox One",
          },
          released_at: "2018-10-26",
          requirements: {
            minimum: "Minimum requirements for Xbox One",
            recommended: "Recommended requirements for Xbox One",
          },
        },
      ],
    },
  ];
  const [wishlist, dispatch] = useReducer(wishlistReducer, mockWishList);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
