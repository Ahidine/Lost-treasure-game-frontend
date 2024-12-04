import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./routes/AppRoutes", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-routes">Mock Routes</div>,
  };
});

describe("App Component", () => {
  it("renders the app with Redux Provider", () => {
    render(<App />);

    const mockRoutes = screen.getByTestId("mock-routes");
    expect(mockRoutes).toBeInTheDocument();
  });
});
