import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;
const currentMovieId = 590706 ;
const currentMovieTitle = "Jiu Jitsu";
let token;



const sampleMovie = {
  id: 590706,
  title: "Jiu Jitsu",
};

describe("Movies endpoint", function (){
  this.timeout(6400);
  before((done) => {
    setTimeout(() => {
      done();
    },5000);
  });
  before((done) => {
    request(api)
      .post("/api/users")
      .send({
        "username": "user1",
        "password": "test1"
      })
      .end((err, res) => {
        token = res.body.token;
        console.log(token)
        done();
      });
  });

  afterEach(() => {
    api.close(); 
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /movies ", () => {
    it("should return  a status ", (done) => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return empty ", () => {
        return request(api)
          .get(`/api/movies/9999`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({});
      });
    });
  });
  describe("Delete /movies/:id",()=>{
    describe("when the movie exists",()=>{
      it("should  delete successfully",()=>{
          return request(api)
            .delete(`/api/movies/${currentMovieId}`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            
      });
    });
  }); 
  describe("GET /movies/:id/reviews", () => {
    describe("when the id is valid", () => {
      it("should return  movie reviews", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}/reviews`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(0);
            // expect(res.body).to.have.property("author");

          });
      });
    });
  });

});
