import axios from "axios";
import {
  getAnalysisMethodService,
  getAnalysisMethodByIdService,
} from "./analysisMethodService";

const mockAnalysisMethods = [
  {
    id: "1",
    name: "Analysis Method 1",
  },
  {
    id: "2",
    name: "Analysis Method 2",
  },
  {
    id: "3",
    name: "Analysis Method 3",
  },
];
jest.mock("../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("analysisMethodService", () => {
  it("should return a list of analysis methods", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockAnalysisMethods});
    const expectedURL = "http://mockurl.com/api/analysisMethods";

    const analysisMethods = await getAnalysisMethodService();

    expect(analysisMethods).toEqual(mockAnalysisMethods);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return an analysis method by id", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({data: mockAnalysisMethods[0]});
    const expectedURL = "http://mockurl.com/api/analysisMethods/1";

    const analysisMethod = await getAnalysisMethodByIdService("1");

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getAnalysisMethodService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving analysisMethod types: Mock error",
      );
    }
  });
});
