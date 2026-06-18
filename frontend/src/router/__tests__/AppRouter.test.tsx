import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppRouter from "@/router/AppRouter";

describe("AppRouter", () => {
  it("renders the home page by default and navigates to login", async () => {
    const user = userEvent.setup();
    render(<AppRouter />);

    expect(screen.getByRole("heading", { name: /hola mundo/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /login/i }));
    expect(await screen.findByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /inicio/i }));
    expect(await screen.findByRole("heading", { name: /hola mundo/i })).toBeInTheDocument();
  });

  it("navigates from login to register", async () => {
    const user = userEvent.setup();
    render(<AppRouter />);

    await user.click(screen.getByRole("link", { name: /login/i }));
    expect(await screen.findByRole("heading", { name: /login/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /regístrate aquí/i }));
    expect(await screen.findByRole("heading", { name: /register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
  });
});
