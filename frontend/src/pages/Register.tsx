import RegisterForm from "@/features/auth/components/RegisterForm";

export default function Register() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">Register</h2>
          <p className="mt-2 text-slate-600">Crea tu cuenta para comenzar.</p>
        </div>

        <div className="mt-6">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
