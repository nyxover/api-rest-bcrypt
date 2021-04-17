import asyncHandler from 'express-async-handler';
import Movie from '../models/MovieModel.js';

// Get all Movies
// route: Get /api/Movies
// access Public
const getMovies = asyncHandler(async (req, res) => {

    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    
    //How you get query from the url for Movie search
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            // i - means case insensitive
            $options: 'i'
        }
    } : {}

    const count = await Movie.countDocuments({...keyword});

    const Movies = await Movie.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));

    res.json({Movies, page, pages: Math.ceil(count / pageSize)});
})

// desc: Get single Movie
// route: Get /api/Movies/:id
// access Public
const getMovieById = asyncHandler(async (req, res) => {
    const Movie = await Movie.findById(req.params.id)

    if(Movie){
        res.json(Movie)
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
})

// desc: Delete a Movie
// route: DELETE /api/Movies/:id
// access: private/ admin
const deleteMovie = asyncHandler(async (req, res) => {

    const Movie = await Movie.findById(req.params.id);

    if(Movie){
        await Movie.remove();
        res.json({ message: 'Movie removed' })
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
})

// desc: Create a Movie
// route: POST /api/Movies
// access: private/ admin
const createMovie = asyncHandler(async (req, res) => {

    const Movie = new Movie({
        title: 'Sample Name',
        year: 0,
        actor: 'actorTest',
        category: 'Sample Category',
        description: 'Sample Description'
    })

    const createdMovie = await Movie.save();
    res.status(201).json(createdMovie);
})

// desc: Update a Movie
// route: PUT /api/Movies/:id
// access: private/ admin
const updateMovie = asyncHandler(async (req, res) => {
    const {
      title,
      year,
      actor,
      description,
      category,
    } = req.body
  
    const Movie = await Movie.findById(req.params.id)
  
    if (Movie) {
      Movie.title = title
      Movie.year = year
      Movie.actor = actor
      Movie.description = description
      Movie.category = category
  
      const updatedMovie = await Movie.save()
      res.json(updatedMovie)
    } else {
      res.status(404)
      throw new Error('Movie not found')
    }
  })



export { getMovieById, getMovies, deleteMovie, createMovie, updateMovie };