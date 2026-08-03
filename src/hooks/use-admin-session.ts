import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { getSupabaseClient } from "@/lib/supabase";
import type { AdminProfile } from "@/types/admin";

type AdminSessionState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "unauthorized"; email: string }
  | { status: "authenticated"; profile: AdminProfile; email: string }
  | { status: "error"; message: string };

export function useAdminSession() {
  const [state, setState] = useState<AdminSessionState>({ status: "loading" });

  const resolveSession = useCallback(async (session: Session | null) => {
    if (!session) {
      setState({ status: "signed-out" });
      return;
    }

    const { data, error } = await getSupabaseClient()
      .from("admin_users")
      .select("user_id, display_name")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Não foi possível validar o acesso administrativo.", error);
      setState({
        status: "error",
        message: "Não foi possível validar seu acesso agora.",
      });
      return;
    }

    if (!data) {
      setState({
        status: "unauthorized",
        email: session.user.email ?? "conta sem e-mail",
      });
      return;
    }

    setState({
      status: "authenticated",
      profile: data as AdminProfile,
      email: session.user.email ?? "",
    });
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseClient();

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) void resolveSession(data.session);
      })
      .catch((error) => {
        console.error("Não foi possível recuperar a sessão administrativa.", error);
        if (active) {
          setState({ status: "error", message: "Não foi possível recuperar sua sessão." });
        }
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) void resolveSession(session);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [resolveSession]);

  return state;
}
