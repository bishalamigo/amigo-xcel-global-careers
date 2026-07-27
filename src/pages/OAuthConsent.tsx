import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
};

function oauthNs(): OAuthNs {
  return (supabase.auth as unknown as { oauth: OAuthNs }).oauth;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauthNs().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauthNs().approveAuthorization(authorizationId)
      : await oauthNs().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  }

  if (error)
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-background text-foreground">
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold mb-2">Authorization error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </main>
    );
  if (!details)
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-background text-foreground">
        <p>Loading…</p>
      </main>
    );

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-background text-foreground">
      <div className="max-w-md w-full border border-border rounded-2xl p-8 bg-card">
        <h1 className="text-2xl font-semibold mb-2">
          Connect {details.client?.name ?? "an app"} to AmigoXcel
        </h1>
        <p className="text-muted-foreground mb-6">
          This lets {details.client?.name ?? "the client"} use AmigoXcel's MCP tools as you.
        </p>
        <div className="flex gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-lg bg-primary text-primary-foreground py-2 font-medium disabled:opacity-50"
          >
            Approve
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-lg border border-border py-2 font-medium disabled:opacity-50"
          >
            Deny
          </button>
        </div>
      </div>
    </main>
  );
}
