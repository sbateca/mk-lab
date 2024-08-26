import {render, screen} from "@testing-library/react";
import {Admin} from "./Admin";
import {MainTemplateProps} from "../../templates/Main/Type";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("../../../utils/hooks/useSideSection", () => ({
  useSideSection: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useSnackBar", () => ({
  useSnackBar: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useClient", () => ({
  useClient: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useSampleType", () => ({
  useSampleType: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useSample", () => ({
  useSample: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useReports", () => ({
  useReports: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useAnalyte", () => ({
  useAnalyte: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useCriteria", () => ({
  useCriteria: () => jest.fn(),
}));
jest.mock("../../../utils/hooks/useAnalysisMethod", () => ({
  useAnalysisMethod: () => jest.fn(),
}));
jest.mock("../../templates/Main/Main", () => ({
  MainTemplate: ({header, menu, mainContent}: MainTemplateProps) => (
    <div>
      <div data-testid="headerComponent">{header}</div>
      <div data-testid="menuComponent">{menu}</div>
      <div data-testid="mainContentComponent">{mainContent}</div>
    </div>
  ),
}));

describe("Admin component", () => {
  it("renders without crashing", async () => {
    render(<Admin />);

    expect(screen.getByTestId("headerComponent")).toBeInTheDocument();
    expect(screen.getByTestId("menuComponent")).toBeInTheDocument();
    expect(screen.getByTestId("mainContentComponent")).toBeInTheDocument();
  });
});
