import {fireEvent, render, waitFor, screen} from "@testing-library/react";

import {useCriteria} from "../../utils/hooks";
import {CriteriaProvider} from "./CriteriaContext";
import * as CriteriaService from "../../services/criteriaService";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../services/criteriaService", () => ({
  getCriteriasService: jest.fn().mockResolvedValue([
    {id: "1", name: "Criteria 1"},
    {id: "2", name: "Criteria 2"},
    {id: "3", name: "Criteria 3"},
  ]),
  getCriteriaByIdService: jest.fn().mockResolvedValue({
    id: "1",
    name: "Criteria 1",
  }),
}));

const TestComponent = () => {
  const {
    criterias,
    selectedCriteria,
    setSelectedCriteria,
    getCriterias,
    getCriteriaById,
    isLoading,
    error,
  } = useCriteria();
  return (
    <div>
      <span data-testid="criteriasValue">{criterias?.length}</span>
      <span data-testid="selectedCriteriaValue">{selectedCriteria?.id}</span>
      <span data-testid="isLoadingValue">{isLoading.toString()}</span>
      <span data-testid="errorValue">{error}</span>
      <button onClick={getCriterias}>Get Criterias</button>
      <button
        onClick={async () => {
          const criteria = await getCriteriaById("1");
          setSelectedCriteria(criteria);
        }}
      >
        Get Criteria By Id
      </button>
      <button onClick={() => setSelectedCriteria(criterias?.[0] || null)}>
        Set Selected Criteria
      </button>
    </div>
  );
};

describe("CriteriaProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    render(
      <CriteriaProvider>
        <TestComponent />
      </CriteriaProvider>,
    );

    expect(screen.getByText("Get Criterias")).toBeInTheDocument();
  });

  it("should get all criterias successfully", async () => {
    const {getByTestId} = render(
      <CriteriaProvider>
        <TestComponent />
      </CriteriaProvider>,
    );
    const getCriteriasButton = screen.getByText("Get Criterias");

    fireEvent.click(getCriteriasButton);

    await waitFor(() => {
      const criteriasValue = getByTestId("criteriasValue");
      expect(criteriasValue).toHaveTextContent("3");
    });
  });

  it("should get criteria by id successfully", async () => {
    render(
      <CriteriaProvider>
        <TestComponent />
      </CriteriaProvider>,
    );
    const getCriteriaByIdButton = screen.getByText("Get Criteria By Id");

    fireEvent.click(getCriteriaByIdButton);
    await waitFor(() => {
      const selectedCriteriaValue = screen.getByTestId("selectedCriteriaValue");
      expect(selectedCriteriaValue).toHaveTextContent("1");
    });
  });

  it("should show loading state", async () => {
    jest
      .spyOn(CriteriaService, "getCriteriasService")
      .mockImplementation(() => {
        return new Promise(() => {});
      });
    render(
      <CriteriaProvider>
        <TestComponent />
      </CriteriaProvider>,
    );

    const getCriteriasButton = screen.getByText("Get Criterias");
    fireEvent.click(getCriteriasButton);

    await waitFor(() => {
      const isLoadingValue = screen.getByTestId("isLoadingValue");
      expect(isLoadingValue).toHaveTextContent("true");
    });
  });
});
