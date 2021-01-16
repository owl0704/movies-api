import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import PeoplesModel from '../api/Peoples/PeoplesModel';
import {Peoples} from './Peoples.js';
import upcomingModel from '../api/upcoming/upcomingModel';
import Now_playingModel from '../api/Now_playing/Now_playingModel';
import {getMovies,getUpcoming,getNow_playing } from '../api/tmdb-api';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
    console.log('load user Data');
      try {
        await userModel.deleteMany();
        await users.forEach(user => userModel.create(user));
        console.info(`${users.length} users were successfully stored.`);
      } catch (err) {
        console.error(`failed to Load user Data: ${err}`);
      }
    }
    export async function loadMovies() {
        console.log('load movies');
        try {
          getMovies().then(async mov =>{
          await movieModel.deleteMany();
          await movieModel.collection.insertMany(mov);
          console.info(`${mov.length} Movies were successfully stored.`);
        });
        } catch (err) {
          console.error(`failed to Load movie Data: ${err}`);
        }
      }
      export async function loadupcoming() {
        console.log('load upcoming');
        try {
          getUpcoming().then(async movies =>{
          await upcomingModel.deleteMany();
          await upcomingModel.collection.insertMany(movies);
          console.info(`${movies.length} Movies were successfully stored.`);
        });
        } catch (err) {
          console.error(`failed to Load movie Data: ${err}`);
        }
      }
      export async function loadNow_playing() {
        console.log('load now playing');
        try {
          getNow_playing().then(async movies =>{
          await Now_playingModel.deleteMany();
          await Now_playingModel.collection.insertMany(movies);
          console.info(`${movies.length} Movies were successfully stored.`);
        });
        } catch (err) {
          console.error(`failed to Load movie Data: ${err}`);
        }
      }
      export async function loadPeoples() {
        console.log('load seed Peoples data');
        console.log(Peoples.length);
        try {
          await PeoplesModel.deleteMany();
          await PeoplesModel.collection.insertMany(Peoples);
          console.info(`${Peoples.length} Peoples were successfully stored.`);
        } catch (err) {
          console.error(`failed to Load Peoples Data: ${err}`);
        }
      }
    
    