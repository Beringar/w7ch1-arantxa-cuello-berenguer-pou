require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../db/models/User");
const encryptPassword = require("../utils/encryptPassword");
const { userLogin, userRegister } = require("./usersControllers");

describe("Given a userLogin controller", () => {
  describe("When it receives a response with invalid username Paquito", () => {
    test("Then it should call next with error 'User Paquito not found!'", async () => {
      const req = {
        body: {
          username: "Paquito",
          password: "1234",
        },
      };
      const next = jest.fn();
      const error = new Error(`User ${req.body.username} not found!`);

      User.findOne = jest.fn().mockResolvedValue(null);

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a response with invalid password", () => {
    test("Then it should call next with error 'Invalid password'", async () => {
      const req = {
        body: {
          username: "Simón",
          password: "12345",
        },
      };
      const next = jest.fn();
      const error = new Error("Invalid credentials!");
      const user = {
        username: "Simón",
        password:
          "$2b$10$7uqVZ5a5QmeinnPp098Us.09BLm2xUGbB7fC4P8I4lq7n5KWadpRO",
      };

      User.findOne = jest.fn().mockResolvedValue(user);

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives request with valid username and password", () => {
    test("Then it should return a valid token", async () => {
      const req = {
        body: { username: "Pedrín", password: "asasas", name: "Pedro Pérez" },
      };
      const user = {
        name: "Pedro Pérez",
        username: "Pedrín",
        password:
          "$2b$10$vXpv46E7TEgM5sn/gPIb9uU0ITpMYwS07YJO1RZr8J1InWuDnfz0i",
        isAdmin: false,
        series: [],
        id: "6217c5e7450ed2448657abf8",
      };

      User.findOne = jest.fn().mockResolvedValue(user);

      const token = jwt.sign(user, process.env.JWT_SECRET);
      const res = {
        json: jest.fn().mockResolvedValue(token),
      };

      await userLogin(req, res, () => null);

      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe("Given a registerUSer controller", () => {
  describe("When it receives a request with an existing username 'Pepe8", () => {
    test("Then it should call next with error 'Username Pepe8 already exists!'", async () => {
      const req = {
        body: { username: "Pepe8", password: "999", name: "José Pérez" },
      };
      const next = jest.fn();
      // User.findOne = jest.fn().mockResolvedValue(true);

      const error = new Error(`Username ${req.body.username} already exists!`);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it recieves a request with an non existent username", () => {
    test("Then it should call the json method of the response with the created user", async () => {
      const req = {
        body: { username: "Maria3", password: "222", name: "María Lunarillos" },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const encryptedPassword = await encryptPassword(req.body.password);
      const createdUser = {
        username: req.body.username,
        password: encryptedPassword,
        name: req.body.name,
        isAdmin: false,
      };
      User.findOne = jest.fn().mockResolvedValue(false);

      User.create = jest.fn().mockResolvedValue(createdUser);

      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdUser);
    });
  });
});
