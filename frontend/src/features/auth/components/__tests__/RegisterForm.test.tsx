import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import RegisterForm from "@/features/auth/components/RegisterForm";

describe("RegisterForm", () => {
  it("renders the register fields and submit button", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /inicia sesión aquí/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText("El nombre es requerido")).toBeInTheDocument();
    expect(await screen.findByText("El email es requerido")).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña debe tener al menos 6 caracteres"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La confirmación de la contraseña es requerida"),
    ).toBeInTheDocument();
  });

  it("shows password mismatch error when passwords do not match", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/nombre/i), "Test User");
    await user.type(screen.getByLabelText(/correo electrónico/i), "test@example.com");
    await user.type(screen.getByLabelText(/^contraseña$/i), "secret123");
    await user.type(screen.getByLabelText(/confirmar contraseña/i), "different123");
    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText("Las contraseñas no coinciden")).toBeInTheDocument();
  });

  it("submits successfully with valid data and does not display validation errors", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/nombre/i), "Test User");
    await user.type(screen.getByLabelText(/correo electrónico/i), "test@example.com");
    await user.type(screen.getByLabelText(/^contraseña$/i), "secret123");
    await user.type(screen.getByLabelText(/confirmar contraseña/i), "secret123");
    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(screen.queryByText("El nombre es requerido")).not.toBeInTheDocument();
    expect(screen.queryByText("El email es requerido")).not.toBeInTheDocument();
    expect(
      screen.queryByText("La contraseña debe tener al menos 6 caracteres"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Las contraseñas no coinciden")).not.toBeInTheDocument();
  });
});
