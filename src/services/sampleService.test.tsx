import axios from "axios";
import {
  createSampleService,
  deleteSampleService,
  editSampleService,
  getSampleByIdService,
  getSamplesService,
} from "./sampleService";

const mockSamples = [
  {
    id: "1",
    sampleCode: "S01",
    sampleTypeId: "1",
    clientId: "1",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "Mock Location",
    responsable: "Mock Responsable",
  },
  {
    id: "2",
    sampleCode: "S02",
    sampleTypeId: "2",
    clientId: "2",
    getSampleDate: "2021-01-02",
    receptionDate: "2021-01-02",
    analysisDate: "2021-01-02",
    sampleLocation: "Mock Location",
    responsable: "Mock Responsable",
  },
];
jest.mock("../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("sampleService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of samples", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockSamples});
    const expectedURL = "http://mockurl.com/api/samples";

    const samples = await getSamplesService();

    expect(samples).toEqual(mockSamples);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a sample by id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockSamples[0]});
    const expectedURL = "http://mockurl.com/api/samples/1";

    const sample = await getSampleByIdService("1");

    expect(sample).toEqual(mockSamples[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should create a sample", async () => {
    jest.spyOn(axios, "post").mockResolvedValueOnce({data: mockSamples[0]});
    const expectedURL = "http://mockurl.com/api/samples";

    const sample = await createSampleService(mockSamples[0]);

    expect(sample).toEqual(mockSamples[0]);
    expect(axios.post).toHaveBeenCalledWith(expectedURL, mockSamples[0]);
  });

  it("should edit a sample", async () => {
    jest.spyOn(axios, "put").mockResolvedValueOnce({data: mockSamples[0]});
    const expectedURL = "http://mockurl.com/api/samples/1";

    const sample = await editSampleService("1", mockSamples[0]);

    expect(sample).toEqual(mockSamples[0]);
    expect(axios.put).toHaveBeenCalledWith(expectedURL, mockSamples[0]);
  });

  it("should throw an error when an error occurs in get method", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getSamplesService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving samples: Mock error",
      );
    }
  });

  it("should throw an error when an error occurs in create", async () => {
    jest.spyOn(axios, "post").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await createSampleService(mockSamples[0]);
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error creating sample: Mock error",
      );
    }
  });

  it("should throw an error when an error occurs in edit", async () => {
    jest.spyOn(axios, "put").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await editSampleService("1", mockSamples[0]);
    } catch (error) {
      expect((error as Error).message).toBe("Error editing sample: Mock error");
    }
  });

  it("should throw an error when an unknown error occurs in delete", async () => {
    jest.spyOn(axios, "delete").mockRejectedValueOnce("Mock error");

    try {
      await deleteSampleService("1");
    } catch (error) {
      expect((error as Error).message).toBe(
        "An unknown error occurred deleting sample.",
      );
    }
  });
});
