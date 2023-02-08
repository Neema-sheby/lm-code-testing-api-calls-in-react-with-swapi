/////////////////////////////////////////////////////////////////////////////////////

import { render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ErrorMessages } from "./Error/ErrorMessages";
const { error500, error418 } = ErrorMessages;

/////////////////////////////////////////////////////////////////////////////////////

// Test 1 ///////////////////////////////////////////////////////////

it("renders the heading", () => {
  render(<App />);
  const title = screen.getByText(/Star Wars/i);
  expect(title).toBeInTheDocument();
});

// server setup using msw

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

// Test 2 ///////////////////////////////////////////////////////////

it("renders the first name in the listadd", async () => {
  render(<App />);

  const cardList = screen.getByRole("list");

  await waitFor(() => screen.findAllByRole("listitem"));

  const headings = within(cardList).getAllByRole("heading");

  expect(headings[0]).toHaveTextContent("star wars 1");
});

// Test 3 ///////////////////////////////////////////////////////////

it("renders error message when error status 500", async () => {
  server.use(
    rest.get("https://swapi.py4e.com/api/people", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<App />);

  await waitFor(() => screen.findByRole("alert"));
  const alert = screen.getByRole("alert");

  expect(alert).toHaveTextContent(error500);
});

// Test 4 ///////////////////////////////////////////////////////////

it("renders error message when error status 418", async () => {
  server.use(
    rest.get("https://swapi.py4e.com/api/people", (req, res, ctx) => {
      return res(ctx.status(418));
    })
  );

  render(<App />);

  await waitFor(() => screen.findByRole("alert"));
  const alert = screen.getByRole("alert");

  expect(alert).toHaveTextContent(error418);
});
