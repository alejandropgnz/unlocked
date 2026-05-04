import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { ProposeForm } from "./propose-form";

export default async function CrearPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/crear");

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="px-4 md:px-8 max-w-xl mx-auto py-8">
        <h1 className="text-3xl font-black tracking-tighter">Proponer un logro</h1>
        <p className="text-muted mt-2 text-sm">
          Si lo aprobamos, todo el mundo podrá adjudicárselo. Tú lo recibirás automáticamente.
        </p>
        <ProposeForm />
      </section>
    </main>
  );
}
