import {mockData, renderSampleDetail} from "./SampleDetail.test.page";
import * as hooks from "../../../utils/hooks";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("SampleDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the sample detail successfully", async () => {
    const expectedData = {
      ...mockData.expectedData,
    };
    const {title, closeButton, screen} = await renderSampleDetail();

    const sampleCodeValue = screen.getByDisplayValue(
      expectedData.sampleCode,
    ) as HTMLInputElement;
    const sampleTypeValue = screen.getByDisplayValue(
      expectedData.sampleType,
    ) as HTMLInputElement;
    const clientValue = screen.getByDisplayValue(
      expectedData.client,
    ) as HTMLInputElement;
    const datePickers = screen.getAllByPlaceholderText("MM/DD/YYYY");
    const getSampleDateValue = datePickers[0] as HTMLInputElement;
    const receptionDateValue = datePickers[1] as HTMLInputElement;
    const analysisDateValue = datePickers[2] as HTMLInputElement;
    const sampleLocationValue = screen.getByDisplayValue(
      expectedData.sampleLocation,
    ) as HTMLInputElement;
    const responsableValue = screen.getByDisplayValue(
      expectedData.responsable,
    ) as HTMLInputElement;

    expect(title).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(sampleCodeValue.value).toBe(expectedData.sampleCode);
    expect(sampleTypeValue.value).toBe(expectedData.sampleType);
    expect(clientValue.value).toBe(expectedData.client);
    expect(getSampleDateValue.value).toBe(expectedData.getSampleDate);
    expect(receptionDateValue.value).toBe(expectedData.receptionDate);
    expect(analysisDateValue.value).toBe(expectedData.analysisDate);
    expect(sampleLocationValue.value).toBe(expectedData.sampleLocation);
    expect(responsableValue.value).toBe(expectedData.responsable);
  });

  it("should render the sample detail with default values when selectedSample is not provided", async () => {
    jest.spyOn(hooks, "useSample").mockReturnValue({
      isLoading: false,
      error: null,
      getSampleById: jest.fn().mockReturnValue(mockData.samples[0]),
      samples: mockData.samples,
      selectedSample: null,
      createSample: jest.fn().mockReturnValue(mockData.samples[1]),
      editSample: jest.fn().mockReturnValue(mockData.samples[1]),
      setSelectedSample: jest.fn().mockReturnValue(mockData.samples[0]),
      getSamples: jest.fn().mockReturnValue(mockData.samples),
      deleteSample: jest.fn().mockReturnValue(mockData.samples[1]),
    });
    jest.spyOn(hooks, "useForm").mockReturnValue({
      form: mockData.defaulForm,
      setForm: jest.fn().mockReturnValue(mockData.defaulForm),
      handleChange: jest.fn(),
      handleDateChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      handleSelectChange: jest.fn(),
      handleAutoCompleteChange: jest.fn(),
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      setDefaultFormFieldsValues: jest.fn(),
      isNotValidForm: true,
    });
    const expectedData = {
      ...mockData.expectedData,
    };
    const {title, closeButton, screen} = await renderSampleDetail();

    const sampleCodeValue = screen.getByDisplayValue(
      expectedData.sampleCode,
    ) as HTMLInputElement;
    const sampleTypeValue = screen.getByDisplayValue(
      expectedData.sampleType,
    ) as HTMLInputElement;
    const clientValue = screen.getByDisplayValue(
      expectedData.client,
    ) as HTMLInputElement;
    const datePickers = screen.getAllByPlaceholderText("MM/DD/YYYY");
    const getSampleDateValue = datePickers[0] as HTMLInputElement;
    const receptionDateValue = datePickers[1] as HTMLInputElement;
    const analysisDateValue = datePickers[2] as HTMLInputElement;
    const sampleLocationValue = screen.getByDisplayValue(
      expectedData.sampleLocation,
    ) as HTMLInputElement;
    const responsableValue = screen.getByDisplayValue(
      expectedData.responsable,
    ) as HTMLInputElement;

    expect(title).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(sampleCodeValue.value).toBe(expectedData.sampleCode);
    expect(sampleTypeValue.value).toBe(expectedData.sampleType);
    expect(clientValue.value).toBe(expectedData.client);
    expect(getSampleDateValue.value).toBe(expectedData.getSampleDate);
    expect(receptionDateValue.value).toBe(expectedData.receptionDate);
    expect(analysisDateValue.value).toBe(expectedData.analysisDate);
    expect(sampleLocationValue.value).toBe(expectedData.sampleLocation);
    expect(responsableValue.value).toBe(expectedData.responsable);
  });
});
