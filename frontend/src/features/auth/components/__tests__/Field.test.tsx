import { render, screen } from "@testing-library/react";

import Field from "@/features/auth/components/Field";

describe("Field", () => {
  it("renders a label and input with the provided attributes", () => {
    render(<Field label="Correo electrónico" name="email" type="email" />);

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "email");
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("displays the error message and accessibility attributes when error is present", () => {
    render(
      <Field label="Correo electrónico" name="email" type="email" error="El email es requerido" />,
    );

    const input = screen.getByLabelText(/correo electrónico/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
    expect(screen.getByText("El email es requerido")).toBeInTheDocument();
  });
});
