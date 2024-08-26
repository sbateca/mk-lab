import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {SampleProvider} from "./SampleContext";
import {useSample} from "../../utils/hooks";
import * as SampleService from "../../services/sampleService";

export const mockSamples = [
  {
    id: "1",
    sampleCode: "1",
    sampleTypeId: "1",
    clientId: "1",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "mock sample location",
    responsable: "mock responsable",
  },
  {
    id: "2",
    sampleCode: "2",
    sampleTypeId: "2",
    clientId: "2",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "mock sample location",
    responsable: "mock responsable",
  },
  {
    id: "3",
    sampleCode: "3",
    sampleTypeId: "3",
    clientId: "3",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "mock sample location",
    responsable: "mock responsable",
  },
];

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../services/SampleService", () => ({
  getSamplesService: jest.fn().mockReturnValue([
    {
      id: "1",
      sampleCode: "1",
      sampleTypeId: "1",
      clientId: "1",
      getSampleDate: "2021-01-01",
      receptionDate: "2021-01-01",
      analysisDate: "2021-01-01",
      sampleLocation: "mock sample location",
      responsable: "mock responsable",
    },
    {
      id: "2",
      sampleCode: "2",
      sampleTypeId: "2",
      clientId: "2",
      getSampleDate: "2021-01-01",
      receptionDate: "2021-01-01",
      analysisDate: "2021-01-01",
      sampleLocation: "mock sample location",
      responsable: "mock responsable",
    },
    {
      id: "3",
      sampleCode: "3",
      sampleTypeId: "3",
      clientId: "3",
      getSampleDate: "2021-01-01",
      receptionDate: "2021-01-01",
      analysisDate: "2021-01-01",
      sampleLocation: "mock sample location",
      responsable: "mock responsable",
    },
  ]),
  getSampleByIdService: jest.fn().mockReturnValue({
    id: "1",
    sampleCode: "1",
    sampleTypeId: "1",
    clientId: "1",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "mock sample location",
    responsable: "mock responsable",
  }),
  createSampleService: jest.fn().mockReturnValue({
    id: "2",
    sampleCode: "2",
    sampleTypeId: "2",
    clientId: "2",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "mock sample location",
    responsable: "mock responsable",
  }),
  editSampleService: jest.fn().mockReturnValue({
    id: "3",
    sampleCode: "3",
    sampleTypeId: "3",
    clientId: "3",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "mock sample location",
    responsable: "mock responsable",
  }),
  deleteSampleService: jest.fn().mockReturnValue({
    id: "1",
    sampleCode: "1",
    sampleTypeId: "1",
    clientId: "1",
    getSampleDate: "2021-01-01",
    receptionDate: "2021-01-01",
    analysisDate: "2021-01-01",
    sampleLocation: "mock sample location",
    responsable: "mock responsable",
  }),
}));

const TestComponent = () => {
  const {
    samples,
    selectedSample,
    setSelectedSample,
    getSamples,
    getSampleById,
    createSample,
    editSample,
    deleteSample,
    isLoading,
    error,
  } = useSample();
  return (
    <div>
      <div data-testid="sampleValue">{samples?.length}</div>
      <div data-testid="selectedSampleValue">{selectedSample?.id}</div>
      <div data-testid="isLoadingValue">{isLoading.toString()}</div>
      <div data-testid="errorValue">{error}</div>
      <button onClick={async () => await getSamples()}>Get Samples</button>
      <button
        onClick={async () => {
          const sample = await getSampleById(mockSamples[0].id);
          setSelectedSample(sample);
        }}
      >
        Get Sample By Id
      </button>
      <button
        onClick={async () => {
          const createdSample = await createSample(mockSamples[1]);
          setSelectedSample(createdSample);
        }}
      >
        Create Sample
      </button>
      <button
        onClick={async () => {
          const editedSample = await editSample(
            mockSamples[2].id,
            mockSamples[2],
          );
          setSelectedSample(editedSample);
        }}
      >
        Edit Sample
      </button>
      <button
        onClick={async () => {
          const deletedSample = await deleteSample(mockSamples[0].id);
          setSelectedSample(deletedSample);
        }}
      >
        Delete Sample
      </button>
    </div>
  );
};

describe("SampleContext", () => {
  it("should get samples", async () => {
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );

    const samples = screen.getByTestId("sampleValue");

    await waitFor(() => {
      expect(samples).toHaveTextContent("3");
    });
  });

  it("should get sample by id", async () => {
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const getSampleByIdButton = screen.getByText("Get Sample By Id");

    fireEvent.click(getSampleByIdButton);
    const sample = screen.getByTestId("selectedSampleValue");

    await waitFor(() => {
      expect(sample).toHaveTextContent(mockSamples[0].id);
    });
  });

  it("should create sample", async () => {
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const createSampleButton = screen.getByText("Create Sample");

    fireEvent.click(createSampleButton);
    const sample = screen.getByTestId("selectedSampleValue");

    await waitFor(() => {
      expect(sample).toHaveTextContent(mockSamples[1].id);
      expect(SampleService.createSampleService).toHaveBeenCalledWith(
        mockSamples[1],
      );
    });
  });

  it("should edit sample", async () => {
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const editSampleButton = screen.getByText("Edit Sample");

    fireEvent.click(editSampleButton);
    const sample = screen.getByTestId("selectedSampleValue");

    await waitFor(() => {
      expect(sample).toHaveTextContent(mockSamples[2].id);
      expect(SampleService.editSampleService).toHaveBeenCalledWith(
        mockSamples[2].id,
        mockSamples[2],
      );
    });
  });

  it("should delete sample", async () => {
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const deleteSampleButton = screen.getByText("Delete Sample");

    fireEvent.click(deleteSampleButton);
    const sample = screen.getByTestId("selectedSampleValue");

    await waitFor(() => {
      expect(sample).toHaveTextContent(mockSamples[0].id);
      expect(SampleService.deleteSampleService).toHaveBeenCalledWith(
        mockSamples[0].id,
      );
    });
  });

  it("should show isLoading state when createSampleService is in progress", async () => {
    jest.spyOn(SampleService, "createSampleService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const createSampleButton = screen.getByText("Create Sample");

    fireEvent.click(createSampleButton);
    const isLoading = screen.getByTestId("isLoadingValue");

    await waitFor(() => {
      expect(isLoading).toHaveTextContent("true");
    });
  });

  it("should show isLoading state when editSampleService is in progress", async () => {
    jest.spyOn(SampleService, "editSampleService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const editSampleButton = screen.getByText("Edit Sample");

    fireEvent.click(editSampleButton);
    const isLoading = screen.getByTestId("isLoadingValue");

    await waitFor(() => {
      expect(isLoading).toHaveTextContent("true");
    });
  });

  it("should show isLoading state when deleteSampleService is in progress", async () => {
    jest.spyOn(SampleService, "deleteSampleService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const deleteSampleButton = screen.getByText("Delete Sample");

    fireEvent.click(deleteSampleButton);
    const isLoading = screen.getByTestId("isLoadingValue");

    await waitFor(() => {
      expect(isLoading).toHaveTextContent("true");
    });
  });

  it("should show isLoading state when getSamplesService is in progress", async () => {
    jest.spyOn(SampleService, "getSamplesService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const getSamplesButton = screen.getByText("Get Samples");

    fireEvent.click(getSamplesButton);
    const isLoading = screen.getByTestId("isLoadingValue");

    await waitFor(() => {
      expect(isLoading).toHaveTextContent("true");
    });
  });

  it("should show isLoading state when getSampleByIdService is in progress", async () => {
    jest.spyOn(SampleService, "getSampleByIdService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <SampleProvider>
        <TestComponent />
      </SampleProvider>,
    );
    const getSampleByIdButton = screen.getByText("Get Sample By Id");

    fireEvent.click(getSampleByIdButton);
    const isLoading = screen.getByTestId("isLoadingValue");

    await waitFor(() => {
      expect(isLoading).toHaveTextContent("true");
    });
  });
});
