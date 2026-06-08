import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "@/components/ui/Navbar";

describe("Navbar", () => {
  it("renders navigation links with the correct routes", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const inicioLink = screen.getByRole("link", { name: /inicio/i });
    const loginLink = screen.getByRole("link", { name: /login/i });

    expect(inicioLink.getAttribute("href")).toBe("/");
    expect(loginLink.getAttribute("href")).toBe("/login");
  });
});
