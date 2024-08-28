import {render, screen} from "@testing-library/react";
import {SampleTableActionButtons} from "./SampleTableActionButtons";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../utils/hooks", () => ({
  useSample: () => ({
    isLoading: false,
    error: null,
    deleteSample: jest.fn(),
    getSampleById: jest.fn(),
    getSamples: jest.fn(),
    setSelectedSample: jest.fn(),
  }),
  useSnackBar: () => ({
    showSnackBarMessage: jest.fn(),
  }),
  useSideSection: () => ({
    setIsSideSectionOpen: jest.fn(),
    setSideSectionTitle: jest.fn(),
  }),
}));

describe("SampleTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the actions buttons successfully", () => {
    render(<SampleTableActionButtons sampleId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
