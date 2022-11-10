import {createSlice} from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        toggleFavorite: (favorites, action) => {
            if (favorites.includes(action.payload)) {
                // If the campsite is already a favorite, remove it
                return favorites.filter((favorite => favorite !== action.payload));
            } else {
                // Add campsite to list of favorites
                favorites.push(action.payload);
            }
        }
    }
});

export const {toggleFavorite} = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;