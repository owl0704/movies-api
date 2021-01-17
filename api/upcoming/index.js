import express from 'express';
import {
   getMovie, getMovieReviews, 
} from '../tmdb-api'; // ca add 
import upcomingModel from './upcomingModel';

const router = express.Router();
 
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
    upcomingModel.find().then(upcomingMovies => res.status(200).send(upcomingMovies)).catch(next);
});

// eslint-disable-next-line no-unused-vars
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovie(id).then(upcomingMovie => res.status(200).send(upcomingMovie))
  .catch((error) => next(error));
    
});

// eslint-disable-next-line no-unused-vars
router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(upcomingMoviesreviews => res.status(200).send(upcomingMoviesreviews))
  .catch((error) => next(error));
});

export default router;
