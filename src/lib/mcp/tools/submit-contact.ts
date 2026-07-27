import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

export default defineTool({
  name: "submit_contact",
  title: "Submit a contact / strategy call request",
  description:
    "Send a new contact submission to AmigoXcel (same as the website contact form). Use this to book a strategy call or ask about services.",
  inputSchema: {
    name: z.string().trim().min(1).max(100).describe("Full name of the person reaching out."),
    email: z.string().trim().email().max(200).describe("Reply-to email address."),
    phone: z.string().trim().max(40).optional().describe("Optional phone number with country code."),
    service: z
      .string()
      .trim()
      .max(100)
      .optional()
      .describe("Which service they're interested in (Talent, Technology, Training, Media, or Other)."),
    message: z.string().trim().min(1).max(2000).describe("What they want to discuss."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  handler: async ({ name, email, phone, service, message }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
    if (!url || !anonKey) {
      return { content: [{ type: "text", text: "Backend is not configured." }], isError: true };
    }
    const supabase = createClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone: phone ?? "",
      service: service ?? "",
      message,
    });
    if (error) {
      return { content: [{ type: "text", text: `Could not submit: ${error.message}` }], isError: true };
    }
    return {
      content: [
        {
          type: "text",
          text: `Thanks ${name} — your message reached AmigoXcel. The team replies within 24 hours to ${email}.`,
        },
      ],
      structuredContent: { ok: true },
    };
  },
});
