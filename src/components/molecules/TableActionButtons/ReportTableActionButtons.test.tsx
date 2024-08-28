import {render, screen} from "@testing-library/react";
import {ReportTableActionButtons} from "./ReportTableActionButtons";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../utils/hooks", () => ({
  useReports: () => ({
    isLoading: false,
    error: null,
    deleteReport: jest.fn(),
    getReportById: jest.fn(),
    getReports: jest.fn(),
    setSelectedReport: jest.fn(),
  }),
  useSnackBar: () => ({
    showSnackBarMessage: jest.fn(),
  }),
  useSideSection: () => ({
    setIsSideSectionOpen: jest.fn(),
    setSideSectionTitle: jest.fn(),
  }),
}));

describe("ReportTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the actions buttons successfully", () => {
    render(<ReportTableActionButtons reportId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
