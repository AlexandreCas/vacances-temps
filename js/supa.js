// Connexió a Supabase (API REST). La clau és publishable (segura per al navegador).
const URL = "https://rmyiuktopcsgjnuenmfp.supabase.co/rest/v1";
const KEY = "sb_publishable_n0gf-7NuQLY91fWBM15OJw_8ByEvdXd";
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

export async function supaFetchAll() {
  const r = await fetch(`${URL}/despeses?select=*&order=created_at.asc`, { headers: H });
  if (!r.ok) throw new Error("fetch");
  return r.json();
}

export async function supaInsert(exp) {
  const { id, date, amount, cur, cat, who } = exp;
  const r = await fetch(`${URL}/despeses`, {
    method: "POST",
    headers: { ...H, Prefer: "return=minimal" },
    body: JSON.stringify([{ id, date, amount, cur, cat, who }]),
  });
  if (!r.ok) throw new Error("insert");
}

export async function supaDelete(id) {
  const r = await fetch(`${URL}/despeses?id=eq.${id}`, { method: "DELETE", headers: H });
  if (!r.ok) throw new Error("delete");
}
