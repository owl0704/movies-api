import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";

const expect = chai.expect;

let db;
let token;



const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

describe("Users endpoint", () => {
  before((done) => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    request(api)
      .post("/api/users")
      .send({
        "username": "user1",
        "password": "test1"
      })
      .end((err, res) => {
        token = res.body.token;
        console.log(token);
        done();
      });
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return  a status ", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });
  describe("POST / ", () => {
    it("should return confirmation message", () => {
      return request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Successful created new user.' });
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(3);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2", "user3"]);
        });
    });
  });
  describe("POST /users /username /favourites ", () => {
    it("should return  a invaild movie id", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "602211",
        });
        request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "602211",
        })
        .expect(401);
    });
    it("should return  a vaild movie id", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "729648",
        })
        .expect(201);
        });
    });
    
    describe("GET /users/ username/favourites ", () => {
      it("should return the users favourites movies", () => {
        request(api)
          .get(`/api/users/user1/favourites`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(0); 
          });
      });
    });
    describe("POST /users /username /watchlist ", () => {
      it("should return a invaild movie id", () => {
        request(api)
          .post(`/api/users/user2/watchlist?action=register`)
          .send({
            id: "729648",
          });
          request(api)
          .post(`/api/users/user2/watchlist?action=register`)
          .send({
            id: "729648",
          })
          .expect(401);
          });
    
      it("should return  watchlist ", () => {
        request(api)
          .post(`/api/users/user2/watchlist?action=register`)
          .send({
            id: "602211",
          })
          .expect(201);
          });
      });
    });
