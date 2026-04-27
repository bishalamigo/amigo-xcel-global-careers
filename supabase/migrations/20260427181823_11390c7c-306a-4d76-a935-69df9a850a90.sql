ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_length CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT contact_email_length CHECK (char_length(email) BETWEEN 3 AND 320),
  ADD CONSTRAINT contact_phone_length CHECK (char_length(phone) BETWEEN 1 AND 50),
  ADD CONSTRAINT contact_service_length CHECK (char_length(service) BETWEEN 1 AND 200),
  ADD CONSTRAINT contact_message_length CHECK (message IS NULL OR char_length(message) <= 5000);

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);