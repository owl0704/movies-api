import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import upcomingRouter from './api/upcoming';
import Now_playingRouter from './api/Now_playing';
import bodyParser from 'body-parser';
import './db';
import {loadUsers, loadMovies,loadupcoming,loadNow_playing,loadPeoples} from './seedData';
import usersRouter from './api/users';
import genresRouter from './api/genres';
import session from 'express-session';
import passport from './authenticate';
import PeoplesRouter from './api/Peoples';

dotenv.config();
if (process.env.SEED_DB) {
    loadUsers();
    loadMovies();
    loadupcoming();
    loadNow_playing();
    loadPeoples();
  }

const errHandler = (err, req, res,) => {
    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if(process.env.NODE_ENV === 'production') {
      return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
  };
const app = express();

const port = process.env.PORT;
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'ilikecake',
    resave: true,
    saveUninitialized: true
  }));

app.use(express.static('public'));

app.use(passport.initialize());

app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/upcoming', upcomingRouter);
app.use('/api/Now_playing', Now_playingRouter);
app.use('/api/Peoples', PeoplesRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});