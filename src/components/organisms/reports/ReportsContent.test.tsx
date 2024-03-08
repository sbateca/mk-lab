import { render, screen, waitFor } from "@testing-library/react"

import { IReport } from "../../../model/report"
import * as useReportsModule from "../../../utils/hooks/useReports"
import Reports from "./reports"

const mockReports: IReport[] = [
    {
        id: "1234",
        reportDate: "2021-10-10",
        sample: {
            id: "1",
            sampleCode: "sam1001",
            client: "client name",
            getSampleDate: "12/12/2021",
            receptionDate: "12/12/2021",
            analysisDate: "12/12/2021",
            sampleLocation: "location",
            responsable: "responsable name"
        },
        analyte: "Total coliforms",
        analysisMethod: "NTC 4772:2008",
        criteria: "Law 00/2007",
        result: "0 UFC/100 ml",
    }
];

jest.mock("../../../config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("ReportsContent test", () => {
    it("should render reports data successfully", async () => {
        const getReportsMock = jest.fn().mockReturnValue({
            reports: mockReports,
            loading: false,
            error: false
        });
        jest.spyOn(useReportsModule, "useReports").mockReturnValue({
            ...getReportsMock(),
            getReports: getReportsMock
        });

        render(<Reports />);

        await waitFor(() => {
            expect(screen.getByText("sam1001 - client name")).toBeInTheDocument();
            expect(screen.getByText("Total coliforms")).toBeInTheDocument();
            expect(screen.getByText("Law 00/2007")).toBeInTheDocument();
        });
    });

    it("should render no data text when does not retrieve reports", async () => {
        const getReportsMock = jest.fn().mockReturnValue({
            reports: [],
            loading: false,
            error: false
        });
        jest.spyOn(useReportsModule, "useReports").mockReturnValue({
            ...getReportsMock(),
            getReports: getReportsMock
        });

        render(<Reports />);

        await waitFor(() => {
            expect(screen.getByText("No records to display")).toBeInTheDocument();
        });
    });
});
