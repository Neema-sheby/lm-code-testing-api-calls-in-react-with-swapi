import { render, screen } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";

it("renders the heading", () => {
  render(<App />);
  const title = screen.getByText(/Star Wars/i);
  expect(title).toBeInTheDocument();
});

const handlers = [
  rest.get("https://swapi.py4e.com/api/people", (req, res, ctx) => {
    return res(
      ctx.json({ results: [{ name: "star wars 1" }, { name: "star wars 2" }] })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
