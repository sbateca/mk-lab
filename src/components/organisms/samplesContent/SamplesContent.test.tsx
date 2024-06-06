import {render, screen, waitFor} from "@testing-library/react";

import SamplesContent from "./SamplesContent";
import {ISample} from "../../../Model/Sample";
import * as useSampleModule from "../../../Utils/Hooks/useSample";

const mockSamples: ISample[] = [
  {
    id: "1",
    sampleCode: "1234",
    client: "client",
    getSampleDate: "12/12/2021",
    receptionDate: "12/12/2021",
    analysisDate: "12/12/2021",
    sampleLocation: "location",
    responsable: "responsable",
  },
];

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("SamplesContent test", () => {
  it("should render samples data successfully", async () => {
    const getSamplesMock = jest.fn().mockReturnValue({
      samples: mockSamples,
      loading: false,
      error: false,
    });
    jest.spyOn(useSampleModule, "useSample").mockReturnValue({
      ...getSamplesMock(),
      getSamples: getSamplesMock,
    });

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByText("Samples")).toBeInTheDocument();
      expect(screen.getByText("1234")).toBeInTheDocument();
      expect(screen.getByText("client")).toBeInTheDocument();
    });
  });

  it("should render no data text when does not retrieve samples", async () => {
    const getSamplesMock = jest.fn().mockReturnValue({
      samples: [],
      loading: false,
      error: false,
    });
    jest.spyOn(useSampleModule, "useSample").mockReturnValue({
      ...getSamplesMock(),
      getSamples: getSamplesMock,
    });

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });
});
