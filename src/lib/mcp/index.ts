import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import getCompanyInfo from "./tools/get-company-info";
import submitContact from "./tools/submit-contact";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "amigoxcel-mcp",
  title: "AmigoXcel",
  version: "0.1.0",
  instructions:
    "Tools for AmigoXcel, a growth partner across talent, technology, training, and media. Sign in to use list_services and get_company_info to describe what AmigoXcel does, and submit_contact to book a strategy call or send an enquiry.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServices, getCompanyInfo, submitContact],
});
