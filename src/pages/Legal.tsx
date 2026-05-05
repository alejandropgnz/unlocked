import { Link } from "react-router-dom";

/**
 * Aviso Legal + Política de Privacidad combinados.
 *
 * Cumple lo mínimo exigido por GDPR (UE 2016/679) + LOPDGDD para una
 * captación de email pre-launch en España: identidad del responsable,
 * datos recogidos, base jurídica, finalidad, plazo, encargados de
 * tratamiento, derechos ARSULIPO, derecho a reclamar ante la AEPD.
 *
 * Sin DNI por preferencia personal del responsable; nombre + email de
 * contacto son suficientes para un proyecto sin actividad comercial.
 */

const RESPONSABLE = "Alejandro Pérez Hernández";
const CONTACTO = "perezhtz@gmail.com";
const ULTIMA_ACTUALIZACION = "2026-05-05";

export default function Legal() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <Link to="/" className="text-muted text-sm">← Volver</Link>
      <article className="mt-6 space-y-8 text-sm leading-relaxed">
        <header>
          <h1 className="text-3xl font-black tracking-tighter">
            Aviso legal y política de privacidad
          </h1>
          <p className="text-muted text-xs mt-2">
            Última actualización: {ULTIMA_ACTUALIZACION}
          </p>
        </header>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            1. Responsable del tratamiento
          </h2>
          <p>
            <strong>{RESPONSABLE}</strong>, persona física residente en
            España, opera el sitio web <em>Unlocked</em> como proyecto
            personal independiente.
          </p>
          <p className="mt-2">
            Contacto:{" "}
            <a href={`mailto:${CONTACTO}`} className="underline">
              {CONTACTO}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            2. Datos personales que recogemos
          </h2>
          <p>
            Antes del lanzamiento del producto, en la página de
            "Próximamente":
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Tu dirección de email</strong>, cuando te apuntas a la
              lista de aviso de lanzamiento.
            </li>
          </ul>
          <p className="mt-3">
            Una vez lanzado el producto, además recogeremos los datos
            necesarios para usarlo (nombre y foto vía Google OAuth, logros
            desbloqueados, historias publicadas, etc.). Esta política se
            actualizará cuando esa funcionalidad esté disponible.
          </p>
          <p className="mt-3">
            <strong>No recogemos</strong> datos sensibles (salud, ideología,
            origen, orientación, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            3. Finalidad y base jurídica
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Avisarte del lanzamiento del producto.</strong> Base:
              tu consentimiento explícito (artículo 6.1.a GDPR), prestado al
              marcar la casilla del formulario.
            </li>
            <li>
              <strong>Enviarte comunicaciones puntuales sobre Unlocked</strong>
              {" "}(novedades del producto, hitos relevantes). Base: el mismo
              consentimiento. Puedes retirarlo en cualquier momento (sección
              5).
            </li>
          </ul>
          <p className="mt-3">
            <strong>No usamos tus datos</strong> para perfilarte, vendértelos
            ni cederlos a terceros con fines comerciales.
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            4. Plazo de conservación
          </h2>
          <p>
            Conservaremos tu email mientras tengas suscripción activa. Si te
            das de baja, eliminamos el dato en un plazo máximo de 30 días.
            Si nunca te das de baja, podremos eliminar emails inactivos a
            los 24 meses sin actividad.
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            5. Tus derechos
          </h2>
          <p>
            Tienes los siguientes derechos sobre tus datos personales,
            ejercitables enviando un email a{" "}
            <a href={`mailto:${CONTACTO}`} className="underline">
              {CONTACTO}
            </a>
            :
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Acceso</strong> — saber qué datos tuyos tenemos.
            </li>
            <li>
              <strong>Rectificación</strong> — corregir datos inexactos.
            </li>
            <li>
              <strong>Supresión</strong> ("derecho al olvido") — borrar
              todos tus datos.
            </li>
            <li>
              <strong>Limitación</strong> — restringir el tratamiento.
            </li>
            <li>
              <strong>Portabilidad</strong> — recibir tus datos en formato
              estructurado.
            </li>
            <li>
              <strong>Oposición</strong> — oponerte al tratamiento.
            </li>
            <li>
              <strong>Retirar el consentimiento</strong> en cualquier momento
              (sin que afecte a la licitud del tratamiento previo).
            </li>
          </ul>
          <p className="mt-3">
            Si consideras que no hemos atendido correctamente tu derecho,
            puedes presentar una reclamación ante la{" "}
            <strong>Agencia Española de Protección de Datos (AEPD)</strong>:
            {" "}
            <a
              href="https://www.aepd.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              www.aepd.es
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            6. Encargados del tratamiento
          </h2>
          <p>
            Para prestar el servicio nos apoyamos en proveedores que tratan
            datos por cuenta nuestra:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Supabase Inc.</strong> — almacenamiento de la base de
              datos donde se guarda tu email. Datos alojados en
              infraestructura europea.{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Política
              </a>
              .
            </li>
            <li>
              <strong>Vercel Inc.</strong> — hosting del sitio web. Tráfico
              a través de su CDN puede generar logs técnicos temporales (IP,
              user-agent) por motivos de seguridad y rendimiento.{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Política
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            7. Cookies
          </h2>
          <p>
            La página "Próximamente" no usa cookies de seguimiento ni
            analytics. Solo se usa <code>sessionStorage</code> técnico para
            recordar el estado de "preview mode" durante la pestaña activa.
          </p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
            8. Términos de uso
          </h2>
          <p>
            Al apuntarte a la lista de espera aceptas estos términos.
            <em> Unlocked </em>se reserva el derecho a actualizar esta
            política cuando se lance el producto. Notificaremos cualquier
            cambio sustancial por email a los suscriptores.
          </p>
        </section>
      </article>
    </main>
  );
}
