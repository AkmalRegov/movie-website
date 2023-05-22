# Movie Website using TMDB API

## Introduction

A movie website that fetches trending movies, all available movies in TMDB and enables user who logs in to the website to manage their activities such as adding movie to their watchlist, add and delete ratings/reviews etc.

## Scope

1. Login

   - Using username and password (created in www.themoviedb.org)
     //This one, I did using the v4 API, directs user to tmdb website,
     // they need to login there and then authenticate their tokens.

2. Home
   - Listing of Trending Movies
   - Search mechanism for movies
3. Movie Details & Ratings Page
   - Show Movie Details
   - Show Movie Reviews
   - Show Rating
   - Post Rating
   - Delete Rating
   - Add to Watchlist
4. Watchlist
   - Listing of movies in your watchlist

## Other information

- Make sure to include the tmdb api url which should be in the format: https://api.themoviedb.org/3/, your v3 api key and v4 access token in src/.env.local

## Known Issues

- Sometimes after rating a movie, the star icon (code is in IconDiv) color's is not set to yellow or white according to the supposed refetched rating value of the user.
