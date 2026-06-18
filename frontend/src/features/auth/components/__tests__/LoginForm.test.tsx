import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import LoginForm from "@/features/auth/components/LoginForm";

describe("LoginForm", () => {
  it("renderizar los campos de inicio de sesión y el botón de envío", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /regístrate aquí/i })).toBeInTheDocument();
  });

  it("muestra los errores de validación al enviar un formulario vacío", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText("El email es requerido")).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña debe tener al menos 6 caracteres"),
    ).toBeInTheDocument();
  });

  it("no muestra errores de validación al enviar datos válidos", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/correo electrónico/i), "test@example.com");
    await user.type(screen.getByLabelText(/contraseña/i), "secret123");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.queryByText("El email es requerido")).not.toBeInTheDocument();
    expect(
      screen.queryByText("La contraseña debe tener al menos 6 caracteres"),
    ).not.toBeInTheDocument();
  });
});
