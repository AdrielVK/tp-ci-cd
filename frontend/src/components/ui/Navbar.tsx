import { Link } from "react-router-dom";

import { routes } from "@/router/routes";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link to={routes.home} className="text-lg font-semibold text-slate-950">
          TP CI CD Vallejos Adriel
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link className="transition hover:text-slate-950" to={routes.home}>
            Inicio
          </Link>
          <Link className="transition hover:text-slate-950" to={routes.login}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
