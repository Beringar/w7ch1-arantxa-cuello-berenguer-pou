const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("..");
const connectToMongoDb = require("../../db/index");
const Platform = require("../../db/models/Platform");

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToMongoDb(connectionString);
});

beforeEach(async () => {
  await Platform.create({
    name: "ejemplo",
    serie: "serieEjemplo",
  });
  await Platform.create({
    name: "ejemplo2",
    serie: "serieEjemplo2",
  });
});

afterEach(async () => {
  await Platform.deleteMany({});
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("Given a /platforms endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should response with a 200 status code", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1aXM4IiwibmFtZSI6Ikx1aXMgUCIsImlkIjoiNjIxNmE1ZmQ4MzYyMDM1YTBhMzhlMTE0IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NzIyOTAzfQ.YuxggXPlm0H60vHXduQVPVnmauSbGevZNYUtqgIiauA";
      await request(app)
        .get("/platforms/")
        .set("Authorization", `${"Bearer"} ${token}`);
      expect(200);
    });
  });
  describe("When it receives a GET request with an invalid token", () => {
    test("Then it should response with a 401 status code", async () => {
      const token =
        "laJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1aXM4IiwibmFtZSI6Ikx1aXMgUCIsImlkIjoiNjIxNmE1ZmQ4MzYyMDM1YTBhMzhlMTE0IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NzIyOTAzfQ.YuxggXPlm0H60vHXduQVPVnmauSbGevZNYUtqgIiauA";
      await request(app)
        .get("/platforms/")
        .set("Authorization", `${"Bearer"} ${token}`);
      expect(401);
    });
  });
  describe("When it receives a POST request", () => {
    test("Then it should response with a 200 status code", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1aXM4IiwibmFtZSI6Ikx1aXMgUCIsImlkIjoiNjIxNmE1ZmQ4MzYyMDM1YTBhMzhlMTE0IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NzIyOTAzfQ.YuxggXPlm0H60vHXduQVPVnmauSbGevZNYUtqgIiauA";
      await request(app)
        .post("/platforms/")
        .set("Authorization", `${"Bearer"} ${token}`);
      expect(200);
    });
  });
  describe("When it receives a POST request with an invalid token", () => {
    test("Then it should response with a 401 status code", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInV5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1aXM4IiwibmFtZSI6Ikx1aXMgUCIsImlkIjoiNjIxNmE1ZmQ4MzYyMDM1YTBhMzhlMTE0IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NzIyOTAzfQ.YuxggXPlm0H60vHXduQVPVnmauSbGevZNYUtqgIiauA";

      await request(app)
        .post("/platforms/")
        .set("Authorization", `${"Bearer"} ${token}`);
      expect(401);
    });
  });
});

describe("Given a platforms/:idPlatform endpoint", () => {
  describe("When it receives a PUT request with a valid token", () => {
    test("Then it should response with a code 200", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1aXM4IiwibmFtZSI6Ikx1aXMgUCIsImlkIjoiNjIxNmE1ZmQ4MzYyMDM1YTBhMzhlMTE0IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NzIyOTAzfQ.YuxggXPlm0H60vHXduQVPVnmauSbGevZNYUtqgIiauA";
      await request(app)
        .put("/platforms/:idPlatform")
        .set("Authorization", `${"Bearer"} ${token}`);
      expect(200);
    });
  });
});
