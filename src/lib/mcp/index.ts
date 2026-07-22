import { defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import getCompanyInfo from "./tools/get-company-info";
import submitContact from "./tools/submit-contact";

export default defineMcp({
  name: "amigoxcel-mcp",
  title: "AmigoXcel",
  version: "0.1.0",
  instructions:
    "Public tools for AmigoXcel, a growth partner across talent, technology, training, and media. Use list_services and get_company_info to describe what AmigoXcel does, and submit_contact to book a strategy call or send an enquiry.",
  tools: [listServices, getCompanyInfo, submitContact],
});
