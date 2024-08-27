import {useReports} from "../../utils/hooks";
import * as ReportsService from "../../services/reportsService";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ReportsProvider} from "./ReportsContext";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../services/reportsService", () => ({
  getReportsService: jest.fn().mockResolvedValue([
    {
      id: "1",
      reportDate: "2021-09-01",
      sampleId: "1",
      analyte: "1",
      analysisMethod: "1",
      criteria: "mock criteria",
      result: "mock result",
    },
    {
      id: "2",
      reportDate: "2021-09-02",
      sampleId: "2",
      analyte: "2",
      analysisMethod: "2",
      criteria: "mock criteria",
      result: "mock result",
    },
    {
      id: "3",
      reportDate: "2021-09-03",
      sampleId: "3",
      analyte: "3",
      analysisMethod: "3",
      criteria: "mock criteria",
      result: "mock result",
    },
  ]),
  getReportByIdService: jest.fn().mockResolvedValue({
    id: "2",
    reportDate: "2021-09-02",
    sampleId: "2",
    analyte: "2",
    analysisMethod: "2",
    criteria: "mock criteria",
    result: "mock result",
  }),
  createReportService: jest.fn().mockResolvedValue({
    id: "3",
    reportDate: "2021-09-03",
    sampleId: "3",
    analyte: "3",
    analysisMethod: "3",
    criteria: "mock criteria",
    result: "mock result",
  }),
  editReportService: jest.fn().mockResolvedValue({
    id: "1",
    reportDate: "2021-09-01",
    sampleId: "1",
    analyte: "1",
    analysisMethod: "1",
    criteria: "mock criteria",
    result: "mock result",
  }),
  deleteReportService: jest.fn().mockResolvedValue({
    id: "3",
    reportDate: "2021-09-03",
    sampleId: "3",
    analyte: "3",
    analysisMethod: "3",
    criteria: "mock criteria",
    result: "mock result",
  }),
}));

const TestComponent = () => {
  const {
    reports,
    selectedReport,
    setSelectedReport,
    getReports,
    getReportById,
    createReport,
    editReport,
    deleteReport,
    isLoading,
    error,
  } = useReports();
  return (
    <div>
      <span data-testid="reportsValue">{reports?.length}</span>
      <span data-testid="selectedReportValue">{selectedReport?.id}</span>
      <span data-testid="isLoadingValue">{isLoading.toString()}</span>
      <span data-testid="errorValue">{error}</span>
      <button onClick={getReports}>Get Reports</button>
      <button
        onClick={async () => {
          const report = await getReportById("2");
          setSelectedReport(report);
        }}
      >
        Get Report By Id
      </button>
      <button
        onClick={async () => {
          const report = await createReport({
            id: "3",
            reportDate: "2021-09-03",
            sampleId: "3",
            analyte: "3",
            analysisMethod: "3",
            criteria: "mock criteria",
            result: "mock result",
          });
          setSelectedReport(report);
        }}
      >
        Create Report
      </button>
      <button
        onClick={async () => {
          const report = await editReport("1", {
            id: "1",
            reportDate: "2021-09-01",
            sampleId: "1",
            analyte: "1",
            analysisMethod: "1",
            criteria: "mock criteria",
            result: "mock result modified",
          });
          setSelectedReport(report);
        }}
      >
        Edit Report
      </button>
      <button
        onClick={async () => {
          const report = await deleteReport("3");
          setSelectedReport(report);
        }}
      >
        Delete Report
      </button>
    </div>
  );
};

describe("ReportsProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const getReportsButton = screen.getByText("Get Reports");

    expect(getReportsButton).toBeInTheDocument();
  });

  it("should get all reports successfully", async () => {
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const getReportsButton = screen.getByText("Get Reports");

    fireEvent.click(getReportsButton);

    const reportsValue = screen.getByTestId("reportsValue");
    expect(ReportsService.getReportsService).toHaveBeenCalled();
    await waitFor(() => expect(reportsValue).toHaveTextContent("3"));
  });

  it("should get a report by id successfully", async () => {
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const getReportByIdButton = screen.getByText("Get Report By Id");

    fireEvent.click(getReportByIdButton);
    const selectedReportValue = screen.getByTestId("selectedReportValue");

    expect(ReportsService.getReportByIdService).toHaveBeenCalledWith("2");
    await waitFor(() => expect(selectedReportValue).toHaveTextContent("2"));
  });

  it("should create a report successfully", async () => {
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const createReportButton = screen.getByText("Create Report");

    fireEvent.click(createReportButton);
    const selectedReportValue = screen.getByTestId("selectedReportValue");

    expect(ReportsService.createReportService).toHaveBeenCalledWith({
      id: "3",
      reportDate: "2021-09-03",
      sampleId: "3",
      analyte: "3",
      analysisMethod: "3",
      criteria: "mock criteria",
      result: "mock result",
    });
    await waitFor(() => expect(selectedReportValue).toHaveTextContent("3"));
  });

  it("should edit a report successfully", async () => {
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const editReportButton = screen.getByText("Edit Report");

    fireEvent.click(editReportButton);
    const selectedReportValue = screen.getByTestId("selectedReportValue");

    expect(ReportsService.editReportService).toHaveBeenCalledWith("1", {
      id: "1",
      reportDate: "2021-09-01",
      sampleId: "1",
      analyte: "1",
      analysisMethod: "1",
      criteria: "mock criteria",
      result: "mock result modified",
    });
    await waitFor(() => expect(selectedReportValue).toHaveTextContent("1"));
  });

  it("should delete a report by id successfully", async () => {
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const deleteReportButton = screen.getByText("Delete Report");

    fireEvent.click(deleteReportButton);
    const selectedReportValue = screen.getByTestId("selectedReportValue");

    expect(ReportsService.deleteReportService).toHaveBeenCalledWith("3");
    await waitFor(() => expect(selectedReportValue).toHaveTextContent("3"));
  });

  it("should show loading state when getReportsService is calling and has not finished", async () => {
    jest.spyOn(ReportsService, "getReportsService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const getReportsButton = screen.getByText("Get Reports");

    fireEvent.click(getReportsButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    await waitFor(() => expect(isLoadingValue).toHaveTextContent("true"));
  });

  it("should show loading state when getReportByIdService is calling and has not finished", async () => {
    jest
      .spyOn(ReportsService, "getReportByIdService")
      .mockImplementation(() => {
        return new Promise(() => {});
      });
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const getReportByIdButton = screen.getByText("Get Report By Id");

    fireEvent.click(getReportByIdButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    await waitFor(() => expect(isLoadingValue).toHaveTextContent("true"));
  });

  it("should show loading state when createReportService is calling and has not finished", async () => {
    jest.spyOn(ReportsService, "createReportService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const createReportButton = screen.getByText("Create Report");

    fireEvent.click(createReportButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    await waitFor(() => expect(isLoadingValue).toHaveTextContent("true"));
  });

  it("should show loading state when editReportService is calling and has not finished", async () => {
    jest.spyOn(ReportsService, "editReportService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const editReportButton = screen.getByText("Edit Report");

    fireEvent.click(editReportButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    await waitFor(() => expect(isLoadingValue).toHaveTextContent("true"));
  });

  it("should show loading state when deleteReportService is calling and has not finished", async () => {
    jest.spyOn(ReportsService, "deleteReportService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <ReportsProvider>
        <TestComponent />
      </ReportsProvider>,
    );
    const deleteReportButton = screen.getByText("Delete Report");

    fireEvent.click(deleteReportButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    await waitFor(() => expect(isLoadingValue).toHaveTextContent("true"));
  });
});
