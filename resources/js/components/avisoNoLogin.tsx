import { Link } from "@inertiajs/react";

export default function AvisoNoLogin() {
  return (
    <div className="max-w-md mx-auto rounded-lg text-center py-2 md:py-0  px-4 md:px-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Inicia sesión para disfrutar más
      </h2>

      <p className="text-gray-600 mb-4">
        Guarda tus piñatas favoritas iniciando sesión o creando una cuenta.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/login"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Iniciar sesión en tu cuenta"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Crear una nueva cuenta"
        >
          Registrarse
        </Link>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        ¿Necesitas ayuda?{' '}
        <Link
          href="/contacto"
          className="text-blue-600 hover:underline"
        >
          Contáctanos
        </Link>
      </p>
    </div>
  );
}
