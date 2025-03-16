class MovieDTO {
  constructor(data) {
    this._id = data._id || null;
    this.id = data.id;
    this.title = data.title;
    this.director = data.director;
    this.year = data.year;
    this.adult = data.adult || false;
    this.backdrop_path = data.backdrop_path || null;
    this.belongs_to_collection = data.belongs_to_collection
      ? {
          id: data.belongs_to_collection.id,
          name: data.belongs_to_collection.name,
          poster_path: data.belongs_to_collection.poster_path,
          backdrop_path: data.belongs_to_collection.backdrop_path,
        }
      : null;
    this.budget = data.budget || 0;
    this.genres = data.genres?.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })) || [];
    this.homepage = data.homepage || null;
    this.imdb_id = data.imdb_id || null;
    this.origin_country = data.origin_country || [];
    this.original_language = data.original_language || null;
    this.original_title = data.original_title || null;
    this.overview = data.overview || null;
    this.popularity = data.popularity || 0;
    this.poster_path = data.poster_path || null;
    this.production_companies = data.production_companies?.map((company) => ({
      id: company.id,
      logo_path: company.logo_path,
      name: company.name,
      origin_country: company.origin_country,
    })) || [];
    this.production_countries = data.production_countries?.map((country) => ({
      iso_3166_1: country.iso_3166_1,
      name: country.name,
    })) || [];
    this.release_date = data.release_date || null;
    this.revenue = data.revenue || 0;
    this.runtime = data.runtime || 0;
    this.spoken_languages = data.spoken_languages?.map((language) => ({
      english_name: language.english_name,
      iso_639_1: language.iso_639_1,
      name: language.name,
    })) || [];
    this.status = data.status || null;
    this.tagline = data.tagline || null;
    this.video = data.video || false;
    this.vote_average = data.vote_average || 0;
    this.vote_count = data.vote_count || 0;
  }
}

export default MovieDTO;