import axios from "axios";
import {
  createReportService,
  editReportService,
  getReportByIdService,
  getReportsService,
} from "./reportsService";

const mockReports = [
  {
    id: "1",
    reportDate: "2021-01-01",
    sampleId: "1",
    analyte: "1",
    analysisMethod: "1",
    criteria: "1",
    result: "mock result",
  },
  {
    id: "2",
    reportDate: "2021-01-02",
    sampleId: "2",
    analyte: "2",
    analysisMethod: "2",
    criteria: "2",
    result: "mock result",
  },
];
jest.mock("../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("reportsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of reports", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockReports});
    const expectedURL = "http://mockurl.com/api/reports";

    const reports = await getReportsService();

    expect(reports).toEqual(mockReports);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a report by id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports/1";

    const report = await getReportByIdService("1");

    expect(report).toEqual(mockReports[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should create a report", async () => {
    jest.spyOn(axios, "post").mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports";

    const report = await createReportService(mockReports[0]);

    expect(report).toEqual(mockReports[0]);
    expect(axios.post).toHaveBeenCalledWith(expectedURL, mockReports[0]);
  });

  it("should edit a report", async () => {
    jest.spyOn(axios, "put").mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports/1";

    const report = await editReportService("1", mockReports[0]);

    expect(report).toEqual(mockReports[0]);
    expect(axios.put).toHaveBeenCalledWith(expectedURL, mockReports[0]);
  });

  it("should throw an error when an error occurs in get method", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getReportsService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving reports: Mock error",
      );
    }
  });

  it("should throw an error when an error occurs in create method", async () => {
    jest.spyOn(axios, "post").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await createReportService(mockReports[0]);
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error creating report: Mock error",
      );
    }
  });

  it("should throw an error when an error occurs in edit method", async () => {
    jest.spyOn(axios, "put").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await editReportService("1", mockReports[0]);
    } catch (error) {
      expect((error as Error).message).toBe("Error editing report: Mock error");
    }
  });
});
