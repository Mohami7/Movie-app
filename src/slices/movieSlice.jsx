// src/slices/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'fef55a6754f2f6d00a0038388915039c';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ search, page, category }) => {
    const genreQuery = category && category !== 'All' ? `&with_genres=${category}` : '';
    const searchQuery = search ? `&query=${search}` : '';
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}${searchQuery}${genreQuery}`
    );
    const data = await response.json();
    console.log(`Fetched data:`, data); // Debugging log
    return data;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    search: '',
    movies: [],
    page: 1,
    totalPages: 0,
    status: 'idle',
    error: null,
    category: 'All',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearch, setPage, setCategory } = movieSlice.actions;

export default movieSlice.reducer;
