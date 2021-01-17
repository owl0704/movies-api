# Assignment 2 - Web API.

Name: zhixiang li

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - more than 3 new API endpoint.
 + Feature 2 - Error handling.
 + Feature 3 - Link some of my API endponit in this assignment with assignment1-MoviesApp.
 + Feature 4 - Mongo integration
 + Feature 5 - Minimal React integration(GET and POST data to API)
 + Feature 6 - Basic Authentication
 + Feature 7 - Error handling
 + Feature 8 - object referencing in Mongo/Mongoose.
 + Feature 9 -  API Documentations with Swagger
 

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/owl0704/movies-api
```

followed by installatio

```bat
npm i
npm start -- start for the app with port 8080
npm run start:swagger -- start for the app with port 8080 with swagger(/api-docs)

```

## API Configuration


```bat
NODE_ENV=development
PORT=8080
HOST=
mongoDB=CLOUDMongoURL
seedDb=true
secret=JWT TOKEN SALT
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |N/A
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies/upcoming/:page | Get upcoming movies by page |  N/A |  N/A  | N/A 
| /api/movies/movies/:page | Get movies by page |  N/A |  N/A  | N/A 
| /api/movies/now playing/:page | Get now playing movies by page |  N/A |  N/A  | N/A 
| /api/movies/peoples/:page | Get peoples by page |  N/A |  N/A  | N/A 
| /api/movies/id/reviews | Get the reviews of special movie |  N/A |  N/A  | N/A 
| /api/users| Get all users |  login |  N/A  | N/A 
| /api/users/username | N/A |  N/A |  N/A  | delete user
| /api/users/username | N/A |  N/A |  change user ursername  | N/A
| /api/users/username/favourite | get the favourite movies | add favourite movies |  N/A  | N/A

![][swagger1]
![][swagger2]
If you have your API design on an online platform or graphic, please link to it ( [Swaggerhub](http://localhost:18512/-1608269672#/)(swagger ui page).


## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.
```bat
protect routes:
+/api/users/:username/favourites POST
+/api/users/:username/favourites GET
```

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 
```bat
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
    
```

 

## Independent learning.
+swagger ui page
build the swagger documentation in the heroku. It includes the authorization so every route can be visited. and implement the swagger with swagger.json.

# Assignment 2 - Agile Software Practice.

Name: zhixiang li

## Target Web API.

+ Feature 1 - Get/api/movies - returns  movie page and 20 movies.
 + Feature 2 - Get /api/movies/{movieid} - returns the movie id on a specific movie.
 + Feature 3 - Get/api/movies/{movieid}/reviews  - Get reviews from movie
 + Feature 4 - Get/api/peoples - returns an array of popular peoples objects.
 + Feature 5 - Get/api/peoples/id - returns detailed information on a specific people.
 + Feature 6 - Get/api/upcomingMovies - returns upcoming movie page.
 + Feature 7 - Get/api/users - returns an array of user objects.
 + Feature 8 - Get/api/users/{userName}/favourites - return user favpurites movies.
 + Feature 9 - Post/api/users/{userName}/favourites- post a movie to favourite list
 + Feature 10 - Post/api/users/{userName}/watchlist- post a movie to watchlist list
 + Feature 11 - Post /api/users - Register or authenticate a user into database
 + Feature 12 - Get/api/now paying Movies - returns now playing movie page.

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movies - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 
+ Get /api/movies - test  movies list when the token is valid and invalid
+ Get /api/movies/:id - test a specific movie when the id is valid and invalid.
+ Get /api/users - test users list
+ Delete /api/movies/:id - test delete movies when the id is valid.
+ get  /api/peoples - test get popular persons when user was not authorized.
+ Get  /api/upcoming - test get upcoming movies when the user was authorized.
+ Post  /api/users/{userName}/watchlist- test post a movie to wathclist with vaild movie id
+ Get  /api/users/{userName}/favourites - test get users favourites list with vaild username
+ Post /api/users - test create a user with a invaild password, test create user with a right username but a wrong password.
+ Get  /api/users - test get users list
## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://movies-api-trial-staging.herokuapp.com/ - Staging deployment
+ https://movies-api-production.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][production]
[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./img/stagingapp.PNG
[production]:./img/production.PNG
[swagger1]:./img/swagger1.PNG
[swagger2]:./img/swagger2.PNG