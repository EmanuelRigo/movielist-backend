class UserMoviesDTO {
  constructor(data) {
    this.user_id = data.user_id;
    this.movies = data.movies.map((movie) => ({
      _id: movie._id,
      checked:  false,
      formats: {
        vhs: movie.formats?.vhs || false,
        dvd: movie.formats?.dvd || false,
        bluray: movie.formats?.bluray || false,
      },
    }));
  }
}

export default UserMoviesDTO;