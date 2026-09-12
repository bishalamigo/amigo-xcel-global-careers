import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "submit_enquiry",
  title: "Send an enquiry to AmigoXcel",
  description:
    "Send a strategy-call enquiry to AmigoXcel. Requires the sender's name, email, phone and which service they need. Only submit with details the person actually provided.",
  inputSchema: {
    name: z.string().trim().describe("Full name of the person enquiring."),
    email: z.string().trim().describe("Email address to reply to."),
    phone: z.string().trim().describe("Phone number, including country code."),
    service: z
      .string()
      .trim()
      .describe("Service needed, e.g. Talent, Technology, Training or Media."),
    message: z.string().trim().optional().describe("Optional details about the request."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ name, email, phone, service, message }) => {
    const missing = [
      !name && "name",
      !email && "email",
      !phone && "phone",
      !service && "service",
    ].filter(Boolean);
    if (missing.length) {
      return {
        content: [{ type: "text", text: `Missing required details: ${missing.join(", ")}.` }],
        isError: true,
      };
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return {
        content: [{ type: "text", text: "The email address is not valid." }],
        isError: true,
      };
    }

    const supabase = supabaseAnon();
    const { error } = await supabase.from("contact_submissions").insert({
      name: name.slice(0, 200),
      email: email.slice(0, 320),
      phone: phone.slice(0, 50),
      service: service.slice(0, 200),
      message: message ? message.slice(0, 5000) : null,
    });

    if (error) {
      return {
        content: [
          { type: "text", text: `Could not send the enquiry: ${error.message}` },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: "Enquiry sent. AmigoXcel replies within 24 hours from careers@amigoxcel.com.",
        },
      ],
      structuredContent: { submitted: true, replyFrom: "careers@amigoxcel.com" },
    };
  },
});
