import database from "../utils/DI";
import runServer from "../utils/server";
import request from "supertest";

const app = runServer(database);

describe("POST /auth/login", () => {
  describe("Given: valid username and password", () => {
    test("respond = 200 status code, contain _id, content-type: json", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "jest@gmail.com",
        password: "Jest1234!",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBeDefined();
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("Given: wrong password", () => {
    test("respond = 200 status code, contain _id, content-type: json", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "jest@gmail.com",
        password: "Xest1234!",
      });
      expect(response.statusCode).toBe(403);
      expect(response.body._id).toBe(undefined);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("Given: wrong email", () => {
    test("respond = 200 status code, contain _id, content-type: json", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "Xest@gmail.com",
        password: "Xest1234!",
      });
      expect(response.statusCode).toBe(403);
      expect(response.body._id).toBe(undefined);
    });
  });
  describe("Given:wrong password", () => {
    test("respond = 200 status code, contain _id, content-type: json", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "jest@gmail.com",
        password: "",
      });
      expect(response.statusCode).toBe(403);
      expect(response.body._id).toBe(undefined);
    });
  });
});

describe("POST /auth/signup", () => {
  describe("Given: valid input", () => {
    test.skip("respond = 200 status code, return 10000 gems, 0 cash, _id, username, email, content-type: json", async () => {
      const response = await request(app).post("/auth/signup").send({
        username: "testUser2",
        email: "changeHere@gmail.com", // change before running the test
        password: "Jest1234!",
        confirmPassword: "Jest1234!",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.cash).toBe(0);
      expect(response.body.gem).toBe(10000);
      expect(response.body._id).toBeDefined();
      expect(response.body.username).toBeDefined();
      expect(response.body.email).toBeDefined();
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("Given: email already exist ", () => {
    test("respond = 400 content-type: json", async () => {
      const response = await request(app).post("/auth/signup").send({
        username: "testUser2",
        email: "exist@gmail.com", // already exist
        password: "Jest1234!",
        confirmPassword: "Jest1234!",
      });
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("Given: password !== confirmPassword ", () => {
    test("respond = 401, content-type: text/html; charset=utf-8", async () => {
      const response = await request(app).post("/auth/signup").send({
        username: "testUser2",
        email: "exist@gmail.com", // already exist
        password: "Jest1234!",
        confirmPassword: "asfasdfasA2!",
      });
      expect(response.statusCode).toBe(401);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text/html; charset=utf-8")
      );
    });
  });
});

describe("GET /auth", () => {
  describe("Given: cookie", () => {
    test("respond = 200 status code, contain _id, content-type: json", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "jest@gmail.com",
        password: "Jest1234!",
      });
      const response2 = await request(app).get("/auth");
      expect(response2.statusCode).toBe(200);
      expect(response2.body._id).toBeDefined();
      expect(response2.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});

describe("GET /auth/logout", () => {
  describe("Given: logout", () => {
    test("respond = 200", async () => {
      const response = await request(app).get("/auth/logout");
      expect(response.statusCode).toBe(200);
    });
  });
});
