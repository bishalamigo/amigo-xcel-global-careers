// Helpers that turn a tailored-resume JSON object into downloadable files.

const line = (v) => String(v || "").trim();

export function toPlainText(r) {
  if (!r) return "";
  const out = [];
  if (r.name) out.push(r.name.toUpperCase());
  if (r.headline) out.push(r.headline);
  const contact = [r.contact?.email, r.contact?.phone, r.contact?.location, ...(r.contact?.links || [])]
    .map(line).filter(Boolean).join(" | ");
  if (contact) out.push(contact);
  out.push("");

  if (r.summary) { out.push("PROFESSIONAL SUMMARY", "-".repeat(60), r.summary, ""); }

  if (r.coreSkills?.length) { out.push("CORE SKILLS", "-".repeat(60), r.coreSkills.join(" · "), ""); }

  if (r.experience?.length) {
    out.push("PROFESSIONAL EXPERIENCE", "-".repeat(60));
    r.experience.forEach((e) => {
      out.push([e.title, e.company].filter(Boolean).join(" — "));
      const meta = [e.location, e.dates].filter(Boolean).join(" | ");
      if (meta) out.push(meta);
      (e.bullets || []).forEach((b) => out.push(`• ${b}`));
      out.push("");
    });
  }

  if (r.projects?.length) {
    out.push("PROJECTS", "-".repeat(60));
    r.projects.forEach((p) => {
      out.push(p.name);
      if (p.description) out.push(p.description);
      (p.bullets || []).forEach((b) => out.push(`• ${b}`));
      out.push("");
    });
  }

  if (r.education?.length) {
    out.push("EDUCATION", "-".repeat(60));
    r.education.forEach((e) => {
      out.push([e.degree, e.institution].filter(Boolean).join(" — "));
      const meta = [e.dates, e.details].filter(Boolean).join(" | ");
      if (meta) out.push(meta);
      out.push("");
    });
  }

  if (r.certifications?.length) { out.push("CERTIFICATIONS", "-".repeat(60), ...r.certifications.map((c) => `• ${c}`), ""); }
  if (r.additional?.length) { out.push("ADDITIONAL", "-".repeat(60), ...r.additional.map((c) => `• ${c}`), ""); }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

const esc = (s) => String(s || "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function toHtml(r) {
  if (!r) return "";
  const contact = [r.contact?.email, r.contact?.phone, r.contact?.location, ...(r.contact?.links || [])]
    .map(line).filter(Boolean).map(esc).join(" &nbsp;|&nbsp; ");

  const section = (title, inner) => inner ? `<h2>${esc(title)}</h2>${inner}` : "";
  const bullets = (items) => items?.length
    ? `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";

  const experience = (r.experience || []).map((e) => `
    <div class="item">
      <p class="role"><strong>${esc(e.title)}</strong>${e.company ? ` — ${esc(e.company)}` : ""}</p>
      <p class="meta">${[e.location, e.dates].filter(Boolean).map(esc).join(" | ")}</p>
      ${bullets(e.bullets)}
    </div>`).join("");

  const projects = (r.projects || []).map((p) => `
    <div class="item">
      <p class="role"><strong>${esc(p.name)}</strong></p>
      ${p.description ? `<p>${esc(p.description)}</p>` : ""}
      ${bullets(p.bullets)}
    </div>`).join("");

  const education = (r.education || []).map((e) => `
    <div class="item">
      <p class="role"><strong>${esc(e.degree)}</strong>${e.institution ? ` — ${esc(e.institution)}` : ""}</p>
      <p class="meta">${[e.dates, e.details].filter(Boolean).map(esc).join(" | ")}</p>
    </div>`).join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${esc(r.name || "Tailored Resume")}</title>
<style>
  body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#111;line-height:1.45;margin:32px;}
  h1{font-size:20pt;margin:0 0 2px;letter-spacing:.5px;}
  .headline{font-size:11.5pt;color:#333;margin:0 0 4px;}
  .contact{font-size:10pt;color:#444;margin:0 0 14px;}
  h2{font-size:11pt;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #999;
     padding-bottom:3px;margin:16px 0 8px;}
  .item{margin-bottom:10px;} .role{margin:0;} .meta{margin:0 0 4px;font-size:10pt;color:#555;}
  ul{margin:4px 0 0 18px;padding:0;} li{margin-bottom:3px;}
  p{margin:0 0 6px;}
  @page{margin:1.6cm;}
</style></head>
<body>
  <h1>${esc(r.name || "")}</h1>
  ${r.headline ? `<p class="headline">${esc(r.headline)}</p>` : ""}
  ${contact ? `<p class="contact">${contact}</p>` : ""}
  ${section("Professional Summary", r.summary ? `<p>${esc(r.summary)}</p>` : "")}
  ${section("Core Skills", r.coreSkills?.length ? `<p>${r.coreSkills.map(esc).join(" &nbsp;·&nbsp; ")}</p>` : "")}
  ${section("Professional Experience", experience)}
  ${section("Projects", projects)}
  ${section("Education", education)}
  ${section("Certifications", bullets(r.certifications))}
  ${section("Additional", bullets(r.additional))}
</body></html>`;
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function fileBase(r) {
  const name = line(r?.name) || "Tailored";
  return `${name.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_")}_Resume`;
}

export function downloadTxt(r) {
  saveBlob(new Blob([toPlainText(r)], { type: "text/plain;charset=utf-8" }), `${fileBase(r)}.txt`);
}

export function downloadDoc(r) {
  saveBlob(new Blob(["\ufeff", toHtml(r)], { type: "application/msword" }), `${fileBase(r)}.doc`);
}

export function downloadPdf(r) {
  const frame = document.createElement("iframe");
  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  doc.open();
  doc.write(toHtml(r));
  doc.close();
  frame.onload = () => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
    setTimeout(() => frame.remove(), 60000);
  };
}
