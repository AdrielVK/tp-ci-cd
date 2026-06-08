import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "@/features/auth/components/LoginForm";

describe("LoginForm", () => {
  it("renders the login fields and submit button", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText("El email es requerido")).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña debe tener al menos 6 caracteres"),
    ).toBeInTheDocument();
  });

  it("submits successfully with valid data and does not display validation errors", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/correo electrónico/i), "test@example.com");
    await user.type(screen.getByLabelText(/contraseña/i), "secret123");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.queryByText("El email es requerido")).not.toBeInTheDocument();
    expect(
      screen.queryByText("La contraseña debe tener al menos 6 caracteres"),
    ).not.toBeInTheDocument();
  });
});
