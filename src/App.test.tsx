import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the heading", () => {
  render(<App />);
  const title = screen.getByText(/Star Wars/i);
  expect(title).toBeInTheDocument();
});
