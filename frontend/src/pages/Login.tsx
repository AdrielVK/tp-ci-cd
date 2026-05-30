import LoginForm from '@/features/auth/components/LoginForm'

export default function Login() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">Login</h2>
          <p className="mt-2 text-slate-600">Ingresa a tu cuenta para continuar.</p>
        </div>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
