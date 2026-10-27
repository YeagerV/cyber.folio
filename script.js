// Sayt matnlari va bo'limlarini shu portfolio obyektidan tahrir qiling.
const portfolio = {
  // Shaxsiy ma'lumotlar: ismingiz, kasbingiz va qisqa tanishtiruvingiz.
  name: "Ismingiz",
  role: "Cybersecurity mutaxassisi",
  intro:
    "Raqamli tizimlarni himoya qilish, xavflarni aniqlash va xavfsizlikni yaxshilash ustida ishlayman.",
  about:
    "Men xavfsizlikni faqat zaiflik qidirish emas, balki insonlar va tizimlarni yaxshiroq himoya qilish deb bilaman. Tadqiqotlarimni hujjatlashtiraman va topilmalarni mas'uliyat bilan oshkor qilaman.",
  availability: "Yangi hamkorlik takliflarini ko'rib chiqaman",
  status: "Ishlar oldindan kelishilgan doirada bajariladi",
  location: "Toshkent, O'zbekiston",
  focus: "Ilova xavfsizligi · Pentest · Tadqiqot",
  languages: "O'zbekcha · English",
  interests: "Tahdidlarni o'rganish · CTF · Linux",
  // Profil sahifasidagi qiziqish teglarini o'zingizga moslab tahrir qiling.
  interestTags: ["Ilova xavfsizligi", "Tahdidlarni o'rganish", "CTF", "Linux", "Raqamli kriminalistika", "Xavfsiz dasturlash"],
  // Faqat ommaga ko'rsatishga ruxsat berilgan loyihalarni kiriting.
  works: [],
  // Faqat muallifligi tasdiqlangan va e'lon qilishga ruxsat berilgan CVE'larni kiriting.
  findings: [],
  // Sertifikat nomi, bergan tashkilot, yil va tasdiqlash havolasini yozing.
  certifications: [],
  // Ish tajribasi va ta'lim ma'lumotlarini o'zingizga moslab tahrir qiling.
  experience: [],
  // Aloqa usullarini o'zingizning haqiqiy ma'lumot va havolalaringiz bilan almashtiring.
  contacts: [],
};

function setProfile(field) {
  document.querySelectorAll(`[data-profile="${field}"]`).forEach((element) => {
    element.textContent = portfolio[field];
  });
}

["name", "role", "intro", "about", "availability", "status", "location", "focus", "languages", "interests"].forEach(setProfile);
document.title = `${document.title.split(" — ")[0]} — ${portfolio.name}`;
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

function createLink(url, label, className) {
  if (!/^(https?:\/\/|mailto:|tel:)/i.test(url)) return null;
  const link = document.createElement("a");
  link.href = url;
  link.className = className;
  link.textContent = label;
  if (/^https?:\/\//i.test(url)) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  return link;
}

const interestList = document.querySelector("#interests-list");
if (interestList) {
  portfolio.interestTags.forEach((interest) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = interest;
    interestList.append(chip);
  });
}

const workGrid = document.querySelector("#work-grid");
const workFilters = document.querySelector("#work-filters");
const workEmpty = document.querySelector("#work-empty");
if (workGrid) {
  portfolio.works.forEach((work, index) => {
    const card = document.createElement("article");
    card.className = "work-card reveal";
    card.dataset.category = work.category;
    const top = document.createElement("div");
    top.className = "work-card-top";
    const number = document.createElement("span");
    number.textContent = `PROJECT_${String(index + 1).padStart(2, "0")}`;
    const icon = document.createElement("span");
    icon.className = "work-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = work.icon;
    top.append(number, icon);

    const type = document.createElement("p");
    type.className = "work-type";
    type.textContent = work.type;
    const title = document.createElement("h3");
    title.className = "work-title";
    title.textContent = work.title;
    const description = document.createElement("p");
    description.className = "work-description";
    description.textContent = work.description;

    const bottom = document.createElement("div");
    bottom.className = "work-bottom";
    const tags = document.createElement("div");
    tags.className = "work-tags";
    work.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "work-tag";
      tagElement.textContent = tag;
      tags.append(tagElement);
    });
    const link = createLink(work.url, "↗", "work-link");
    if (link) {
      link.setAttribute("aria-label", `${work.title} loyihasi`);
      bottom.append(tags, link);
    } else {
      bottom.append(tags);
    }
    card.append(top, type, title, description, bottom);
    workGrid.append(card);
  });

  if (workFilters) {
    let activeWorkFilter = "Barchasi";
    const applyWorkFilter = () => {
      let visible = 0;
      workGrid.querySelectorAll(".work-card").forEach((card) => {
        const matches = activeWorkFilter === "Barchasi" || card.dataset.category === activeWorkFilter;
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      if (workEmpty) workEmpty.hidden = visible > 0;
    };
    ["Barchasi", ...new Set(portfolio.works.map(({ category }) => category))].forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.textContent = category;
      button.setAttribute("aria-pressed", String(category === activeWorkFilter));
      button.addEventListener("click", () => {
        activeWorkFilter = category;
        workFilters.querySelectorAll("button").forEach((filter) => {
          filter.setAttribute("aria-pressed", String(filter === button));
        });
        applyWorkFilter();
      });
      workFilters.append(button);
    });
    if (portfolio.works.length === 0) {
      workEmpty.hidden = false;
      workEmpty.textContent = "Hozircha ommaga taqdim etiladigan loyihalar yo'q.";
      workFilters.hidden = true;
    }
  }
}

const cveList = document.querySelector("#cve-list");
if (cveList) {
  portfolio.findings.forEach((finding) => {
    const card = document.createElement("article");
    card.className = "cve-card";
    const id = createLink(finding.url, finding.id, "cve-id");
    const idElement = id || document.createElement("span");
    idElement.textContent = finding.id;
    const main = document.createElement("div");
    main.className = "cve-card-main";
    const title = document.createElement("h3");
    title.className = "cve-title";
    title.textContent = finding.title;
    const meta = document.createElement("p");
    meta.className = "cve-meta";
    meta.textContent = [finding.product, finding.year, finding.status || "Tasdiqlangan"].filter(Boolean).join(" · ");
    main.append(title, meta);
    const severity = document.createElement("span");
    severity.className = `severity severity--${String(finding.severity).toLowerCase()}`;
    severity.textContent = finding.severity;
    card.append(idElement, main, severity);
    cveList.append(card);
  });
  if (portfolio.findings.length > 0) document.querySelector("#empty-cves").hidden = true;
}

const credentialGrid = document.querySelector("#credential-grid");
if (credentialGrid) {
  portfolio.certifications.forEach((certification) => {
    const card = document.createElement("article");
    card.className = "credential-card reveal";
    const top = document.createElement("div");
    top.className = "credential-top";
    const seal = document.createElement("span");
    seal.className = "credential-seal";
    seal.setAttribute("aria-hidden", "true");
    seal.textContent = certification.short || "✓";
    const year = document.createElement("span");
    year.className = "credential-year";
    year.textContent = certification.year || "";
    top.append(seal, year);
    const name = document.createElement("h3");
    name.className = "credential-name";
    name.textContent = certification.name;
    const issuer = document.createElement("p");
    issuer.className = "credential-issuer";
    issuer.textContent = certification.issuer;
    card.append(top, name, issuer);
    const link = createLink(certification.url, "VERIFY CREDENTIAL ↗", "credential-link");
    if (link) card.append(link);
    credentialGrid.append(card);
  });
  if (portfolio.certifications.length > 0) document.querySelector("#empty-credentials").hidden = true;
}

const experienceList = document.querySelector("#experience-list");
if (experienceList) {
  portfolio.experience.forEach((experience) => {
    const row = document.createElement("article");
    row.className = "experience-item reveal";
    const date = document.createElement("span");
    date.className = "experience-date";
    date.textContent = experience.date;
    const main = document.createElement("div");
    main.className = "experience-main";
    const title = document.createElement("h3");
    title.className = "experience-title";
    title.textContent = experience.title;
    const organization = document.createElement("p");
    organization.className = "experience-org";
    organization.textContent = experience.organization;
    const description = document.createElement("p");
    description.className = "experience-description";
    description.textContent = experience.description;
    main.append(title, organization, description);
    const kind = document.createElement("span");
    kind.className = "experience-kind";
    kind.textContent = experience.kind;
    row.append(date, main, kind);
    experienceList.append(row);
  });
  if (portfolio.experience.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Ish tajribasi va ta'lim ma'lumotlari hozircha kiritilmagan.";
    experienceList.append(empty);
  }
}

const contactOptions = document.querySelector("#contact-options");
if (contactOptions) {
  portfolio.contacts.forEach((contact) => {
    const link = createLink(contact.url, "", "contact-link");
    if (!link) return;
    const label = document.createElement("span");
    label.textContent = contact.label;
    const value = document.createElement("span");
    value.className = "contact-kind";
    value.textContent = contact.value || contact.kind;
    link.append(label, value);
    contactOptions.append(link);
  });
  if (portfolio.contacts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Aloqa ma'lumotlari hozircha kiritilmagan.";
    contactOptions.append(empty);
  }
}

const themeToggle = document.querySelector(".theme-toggle");
try {
  if (localStorage.getItem("cyberfolio-theme") === "light") {
    document.documentElement.dataset.theme = "light";
  }
} catch (error) {
  console.warn("Mavzu sozlamasini o'qib bo'lmadi.", error);
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const lightMode = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = lightMode ? "light" : "dark";
    try {
      localStorage.setItem("cyberfolio-theme", lightMode ? "light" : "dark");
    } catch (error) {
      console.warn("Mavzu sozlamasini saqlab bo'lmadi.", error);
    }
  });
}

const currentPage = document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) link.setAttribute("aria-current", "page");
});
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menyuni yopish" : "Menyuni ochish");
    mainNav.classList.toggle("is-open", isOpen);
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menyuni ochish");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
