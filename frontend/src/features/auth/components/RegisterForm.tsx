import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";
import { registerSchema, type RegisterFormValues } from "@/features/auth/schemas/RegisterSchema";
import { routes } from "@/router/routes";

import Field from "./Field";

const registerResolver: Resolver<RegisterFormValues> = (values) => {
  const result = registerSchema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  const errors = Object.entries(result.error.formErrors.fieldErrors).reduce<
    FieldErrors<RegisterFormValues>
  >((acc, [field, messages]: [string, string[] | undefined]) => {
    if (messages === undefined || messages.length === 0) {
      return acc;
    }

    acc[field as keyof RegisterFormValues] = {
      type: "value",
      message: messages[0],
    };

    return acc;
  }, {});

  return {
    values: {},
    errors,
  };
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: registerResolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    await Promise.resolve(values);
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Nombre" {...register("name")} error={errors.name} />

      <Field label="Correo electrónico" type="email" {...register("email")} error={errors.email} />

      <Field label="Contraseña" type="password" {...register("password")} error={errors.password} />

      <Field
        label="Confirmar contraseña"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </Button>
      <div className="mt-4 text-sm text-slate-600">
        ¿Ya tienes una cuenta?{" "}
        <Link to={routes.login} className="text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
        .
      </div>
    </form>
  );
}
