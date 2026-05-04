import { Link } from "react-router-dom";

export default function Legal() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <Link to="/" className="text-muted text-sm">← Volver</Link>
      <article className="mt-6 space-y-6 text-sm leading-relaxed">
        <header>
          <h1 className="text-3xl font-black tracking-tighter">Aviso legal y privacidad</h1>
          <p className="text-muted text-xs mt-2">Actualizado: 2026-05-04</p>
        </header>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Quiénes somos</h2>
          <p>
            Unlocked es un proyecto independiente operado por su autor desde España.
            Para contactar: <a href="mailto:hola@unlocked.app" className="underline">hola@unlocked.app</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Datos que recogemos</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Datos de tu cuenta de Google (nombre, email, foto) para crear tu perfil.</li>
            <li>Logros que desbloqueas, historias que publicas y respuestas en foros.</li>
            <li>Estadísticas anónimas de uso vía Plausible Analytics (sin cookies).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Tus derechos</h2>
          <p>
            Puedes borrar tu cuenta en cualquier momento desde tu perfil. Eso elimina todos
            tus datos personales (perfil, logros, historias, respuestas, votos).
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Cookies</h2>
          <p>
            Solo usamos cookies estrictamente necesarias para mantener tu sesión iniciada.
            No usamos cookies de marketing ni de terceros.
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Términos de uso</h2>
          <p>
            Al desbloquear logros y publicar contenido, te comprometes a no incluir datos
            personales ajenos, contenido ofensivo, ilegal o de odio. Nos reservamos el
            derecho a moderar y eliminar contenido sin previo aviso.
          </p>
        </section>
      </article>
    </main>
  );
}
