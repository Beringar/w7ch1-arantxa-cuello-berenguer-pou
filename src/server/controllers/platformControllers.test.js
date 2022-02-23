const Platform = require("../../db/models/Platform");

const { getAllPlatforms } = require("./platformControllers");

jest.mock("../../db/models/Platform");

describe("Given an getAllPlatforms controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with a list of platforms of the received response", async () => {
      const res = {
        json: jest.fn(),
      };

      const platforms = [
        {
          name: "movies",
        },
      ];
      Platform.find = jest.fn().mockResolvedValue(platforms);
      await getAllPlatforms(null, res);

      expect(res.json).toHaveBeenCalledWith({ platforms });
    });
  });
});

/* describe("Given a createPlaform controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should call the method json with the platform created", async () => {
      const createdPlatform = {
        name: "lalala",
      };

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      Platform.create = jest.fn().mockResolvedValue(createdPlatform);
      await createNewPlatform(createdPlatform, res);
      expect(res.json).toHaveBeenCalledWith(createdPlatform);
    });
  });
}); */
