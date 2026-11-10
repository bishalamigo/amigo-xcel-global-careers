# Architecture

- Keep the active course catalogue and enquiry-selection validation in `src/lib/academy.ts` so cards and enquiries cannot drift apart.
- Course actions open the shared enquiry dialog through the `academy:course` event; preserve the selected course before displaying the form.
- Keep Resume Tailor isolated from academy presentation changes to preserve its existing workflow.