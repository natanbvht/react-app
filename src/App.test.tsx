import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Welcome to our community", () => {
	render(<App />);
	const linkElement = screen.getByText(/Welcome to our community/i);
	expect(linkElement).toBeInTheDocument();
});
