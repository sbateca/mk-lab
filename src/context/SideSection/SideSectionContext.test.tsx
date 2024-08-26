import {fireEvent, render, screen} from "@testing-library/react";
import {useSideSection} from "../../utils/hooks";
import {SideSectionProvider} from "./SideSectionContext";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

const TesComponent = () => {
  const {
    isSideSectionOpen,
    setIsSideSectionOpen,
    setSideSectionTitle,
    sideSectionTitle,
  } = useSideSection();
  return (
    <div>
      <span data-testid="isSideSectionOpenValue">
        {isSideSectionOpen.toString()}
      </span>
      <span data-testid="sideSectionTitleValue">{sideSectionTitle}</span>
      <button onClick={() => setIsSideSectionOpen(!isSideSectionOpen)}>
        Toggle Side Section
      </button>
      <button onClick={() => setSideSectionTitle("Sample Title")}>
        Set Side Section Title
      </button>
    </div>
  );
};

describe("SideSectionProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children", async () => {
    render(
      <SideSectionProvider>
        <TesComponent />
      </SideSectionProvider>,
    );

    const childComponent = screen.getByText("Toggle Side Section");
    expect(childComponent).toBeInTheDocument();
  });

  it("should toggle isSideSectionOpen state when setIsSideSectionOpen is called", async () => {
    render(
      <SideSectionProvider>
        <TesComponent />
      </SideSectionProvider>,
    );

    const toggleButton = screen.getByText("Toggle Side Section");
    const isSideSectionOpenValue = screen.getByTestId("isSideSectionOpenValue");

    expect(isSideSectionOpenValue).toHaveTextContent("false");
    fireEvent.click(toggleButton);
    expect(isSideSectionOpenValue).toHaveTextContent("true");
    fireEvent.click(toggleButton);
    expect(isSideSectionOpenValue).toHaveTextContent("false");
  });

  it("should update sideSectionTitle state when setSideSectionTitle is called", async () => {
    render(
      <SideSectionProvider>
        <TesComponent />
      </SideSectionProvider>,
    );

    const setSideSectionTitleButton = screen.getByText(
      "Set Side Section Title",
    );
    const sideSectionTitleValue = screen.getByTestId("sideSectionTitleValue");

    expect(sideSectionTitleValue).toHaveTextContent("");
    fireEvent.click(setSideSectionTitleButton);
    expect(sideSectionTitleValue).toHaveTextContent("Sample Title");
  });
});
