import React from "react";
import 
{render , screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Hero from "../src/components/Hero";
describe("Hero component", () => {
  test("renders the hero component with correct content", () => {
    render(<Hero />);
    const heroImage = screen.getByAltText("Hero Image");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "https://source.unsplash.com/1600x900/?stock,market");
    const heroTitle = screen.getByText("Welcome to Stock Trading Dashboard");
    expect(heroTitle).toBeInTheDocument();
    const heroSubtitle = screen.getByText("Your one-stop solution for stock trading");
    expect(heroSubtitle).toBeInTheDocument();
  });
});

