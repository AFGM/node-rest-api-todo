const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("../server.js");
const { User } = require("../models/user");
const { users, populateUsers } = require("./seed/seed");

beforeEach(populateUsers);

describe("GET /users/me", () => {
  it("should return user if authenticated", done => {
    request(app)
      .get("/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it("should return a 401 if not authenticated", done => {
    request(app)
      .get("/users/me")
      .set("x-auth", "12345")
      .expect(401)
      .end(done);
  });
});

describe("POST /users", () => {
  it("should create user", done => {
    var mockUser = {
      email: "granja@gmail.com",
      password: "password"
    };
    request(app)
      .post("/users")
      .send(mockUser)
      .expect(200)
      .expect(res => {
        expect(res.body.email).toBe(mockUser.email);
        expect(res.body._id).toExist();
        expect(res.headers["x-auth"]).toExist();
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({ email: mockUser.email }).then(user => {
          expect(user).toExist();
          expect(user.password).toNotBe(mockUser.password);
          done();
        });
      });
  });

  it("should return validation error if request is invalid", done => {
    var mockUser = {
      email: "granja@gmail.com",
      password: "123"
    };
    request(app)
      .post("/users")
      .send(mockUser)
      .expect(404)
      .end(done);
  });

  it("should not create user if email is in use", done => {
    var mockUser = {
      email: "andre@gmail.com",
      password: "password123"
    };
    request(app)
      .post("/users")
      .send(mockUser)
      .expect(404)
      .end(done);
  });
});
