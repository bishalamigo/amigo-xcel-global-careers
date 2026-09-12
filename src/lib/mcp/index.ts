import { defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import getCourseDetailsTool from "./tools/get-course-details";
import getContactInfoTool from "./tools/get-contact-info";
import submitEnquiryTool from "./tools/submit-enquiry";

export default defineMcp({
  name: "www-amigoxcel-com",
  title: "www-amigoxcel-com",
  version: "0.1.0",
  instructions:
    "Tools for AmigoXcel, a growth partner offering talent, technology, training and creative media. Use `list_services` for the service pillars, `get_course_details` for the 'Become Job Ready in 30 Days' program, `get_contact_info` for contact links, and `submit_enquiry` to send a strategy-call enquiry using details the person actually provided.",
  tools: [listServicesTool, getCourseDetailsTool, getContactInfoTool, submitEnquiryTool],
});
