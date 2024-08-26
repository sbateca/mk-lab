import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {SampleTypeProvider} from "./SampleTypeContext";
import {useSampleType} from "../../utils/hooks";
import * as SampleTypeService from "../../services/sampleTypeService";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../services/sampleTypeService", () => ({
  getSampleTypesService: jest.fn().mockReturnValue([
    {
      id: "1",
      name: "SampleType1",
    },
    {
      id: "2",
      name: "SampleType2",
    },
  ]),
  getSampleTypeByIdService: jest.fn().mockReturnValue({
    id: "1",
    name: "SampleType1",
  }),
}));

const TestComponent = () => {
  const {
    sampleTypes,
    selectedSampleType,
    setSelectedSampleType,
    getSampleTypes,
    getSampleTypeById,
    isLoading,
    error,
  } = useSampleType();
  return (
    <div>
      <div data-testid="sampleTypeValue">{sampleTypes?.length}</div>
      <div data-testid="selectedSampleTypeValue">{selectedSampleType?.id}</div>
      <div data-testid="isLoadingValue">{isLoading.toString()}</div>
      <div data-testid="errorValue">{error}</div>
      <button
        data-testid="getSampleTypesButton"
        onClick={() => getSampleTypes()}
      >
        Get Sample Types
      </button>
      <button
        data-testid="getSampleTypeByIdButton"
        onClick={async () => {
          const sampleType = await getSampleTypeById("1");
          setSelectedSampleType(sampleType);
        }}
      >
        Get Sample Type By Id
      </button>
    </div>
  );
};

describe("SampleTypeContext", () => {
  it("should render the component successfully", async () => {
    render(
      <SampleTypeProvider>
        <TestComponent />
      </SampleTypeProvider>,
    );
    const sampleTypeValue = screen.getByTestId("sampleTypeValue");

    await waitFor(() => {
      expect(sampleTypeValue).toHaveTextContent("2");
    });
  });

  it("should fetch sample type by id and set it in the context", async () => {
    render(
      <SampleTypeProvider>
        <TestComponent />
      </SampleTypeProvider>,
    );
    const getSampleTypeByIdButton = screen.getByTestId(
      "getSampleTypeByIdButton",
    );

    fireEvent.click(getSampleTypeByIdButton);
    const selectedSampleTypeValue = screen.getByTestId(
      "selectedSampleTypeValue",
    );

    await waitFor(() => {
      expect(selectedSampleTypeValue).toHaveTextContent("1");
    });
  });

  it("should show loading state when fetching sample types", async () => {
    jest
      .spyOn(SampleTypeService, "getSampleTypesService")
      .mockImplementation(() => new Promise(() => {}));
    render(
      <SampleTypeProvider>
        <TestComponent />
      </SampleTypeProvider>,
    );
    const getSampleTypesButton = screen.getByTestId("getSampleTypesButton");

    fireEvent.click(getSampleTypesButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    await waitFor(() => {
      expect(isLoadingValue).toHaveTextContent("true");
    });
  });

  it("sould show loading state when fetching sample type by id", async () => {
    jest
      .spyOn(SampleTypeService, "getSampleTypeByIdService")
      .mockImplementation(() => new Promise(() => {}));
    render(
      <SampleTypeProvider>
        <TestComponent />
      </SampleTypeProvider>,
    );
    const getSampleTypeByIdButton = screen.getByTestId(
      "getSampleTypeByIdButton",
    );

    fireEvent.click(getSampleTypeByIdButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    await waitFor(() => {
      expect(isLoadingValue).toHaveTextContent("true");
    });
  });
});
