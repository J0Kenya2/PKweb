(() => {
  const cfg = window.POKERKING_CONFIG || {};
  const yearNode = document.querySelector("[data-year]");
  const subnav = document.querySelector("[data-subnav]");

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const pageKey = document.body.dataset.page;
  if (subnav && pageKey) {
    subnav.querySelectorAll("a").forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === pageKey);
    });
  }

  const fillContact = () => {
    document.querySelectorAll("[data-contact-address]").forEach((el) => {
      el.textContent = cfg.address || "";
    });
    document.querySelectorAll("[data-contact-phone]").forEach((el) => {
      const phone = cfg.phone || "";
      if (el.tagName === "A") {
        el.href = `tel:${(cfg.phoneTel || phone).replace(/\s/g, "")}`;
        el.textContent = phone;
      } else {
        el.textContent = phone;
      }
    });
    document.querySelectorAll("[data-contact-email]").forEach((el) => {
      const email = cfg.email || "";
      if (el.tagName === "A") {
        el.href = `mailto:${email}`;
        el.textContent = email;
      } else {
        el.textContent = email;
      }
    });
    document.querySelectorAll("[data-contact-hours]").forEach((el) => {
      el.textContent = cfg.hours || "";
    });
    document.querySelectorAll("[data-whatsapp]").forEach((el) => {
      if (cfg.whatsapp) el.href = cfg.whatsapp;
    });
    document.querySelectorAll("[data-instagram]").forEach((el) => {
      if (cfg.instagram) el.href = cfg.instagram;
    });
    document.querySelectorAll("[data-tiktok]").forEach((el) => {
      if (cfg.tiktok) el.href = cfg.tiktok;
    });
    document.querySelectorAll("[data-x]").forEach((el) => {
      if (cfg.x) el.href = cfg.x;
    });
  };

  fillContact();

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const eventLabel = (t) =>
    t.date ? `${t.title} — ${t.date}${t.time ? ` ${t.time}` : ""}` : t.title;

  const tournamentSummary = (t) => {
    const parts = [t.format, t.buyIn ? `Buy-in ${t.buyIn}` : ""].filter(Boolean);
    return parts.join(" · ");
  };

  const renderTournamentDetails = (t) => {
    const facts = [
      ["Format", t.format],
      ["Buy-in", t.buyIn],
      ["Guarantee", t.guarantee],
      ["Starting Stack", t.startingStack],
    ].filter(([, value]) => value);

    const factsHtml = facts.length
      ? `<dl class="tournament-detail-facts">${facts
          .map(
            ([label, value]) =>
              `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`
          )
          .join("")}</dl>`
      : "";

    const features = Array.isArray(t.features) ? t.features : [];
    const featuresHtml = features.length
      ? `<h3 class="tournament-detail-heading">Tournament Features</h3><ul class="tournament-detail-features">${features
          .map((line) => `<li>${escapeHtml(line)}</li>`)
          .join("")}</ul>`
      : "";

    return `${factsHtml}${featuresHtml}`;
  };

  const modal = document.querySelector("[data-register-modal]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalDetails = document.querySelector("[data-modal-details]");
  const tournamentInput = document.querySelector("[data-tournament-input]");

  const openRegisterModal = (event) => {
    if (!modal || !event || event.registrationOpen === false) return;
    if (tournamentInput) tournamentInput.value = eventLabel(event);
    if (modalTitle) modalTitle.textContent = event.title || "Register";
    if (modalDetails) modalDetails.innerHTML = renderTournamentDetails(event);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const nameInput = modal.querySelector('input[name="name"]');
    if (nameInput) nameInput.focus();
  };

  const closeRegisterModal = () => {
    if (!modal) return;
    modal.hidden = true;
    const rulesModalEl = document.querySelector("[data-house-rules-modal]");
    if (!rulesModalEl || rulesModalEl.hidden) document.body.style.overflow = "";
  };

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeRegisterModal);
    });
  }

  const rulesModal = document.querySelector("[data-house-rules-modal]");
  const rulesOpenBtn = document.querySelector("[data-house-rules-open]");

  const openRulesModal = () => {
    if (!rulesModal) return;
    rulesModal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeRulesModal = () => {
    if (!rulesModal) return;
    rulesModal.hidden = true;
    if (!modal || modal.hidden) document.body.style.overflow = "";
  };

  if (rulesOpenBtn) {
    rulesOpenBtn.addEventListener("click", openRulesModal);
  }

  if (rulesModal) {
    rulesModal.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeRulesModal);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (rulesModal && !rulesModal.hidden) closeRulesModal();
    else if (modal && !modal.hidden) closeRegisterModal();
  });

  const loadTournaments = async () => {
    const listRoot = document.querySelector("[data-tournament-list]");
    const posterWrap = document.querySelector("[data-series-poster]");
    const posterImg = document.querySelector("[data-series-poster-img]");
    const posterCaption = document.querySelector("[data-series-poster-caption]");
    try {
      const res = await fetch("data/tournaments.json");
      if (!res.ok) throw new Error("Failed to load tournaments");
      const data = await res.json();
      const events = data.events || data.featured || [];

      if (posterWrap && posterImg && data.seriesPoster) {
        posterImg.src = data.seriesPoster;
        posterImg.alt = data.seriesTitle
          ? `${data.seriesTitle} poster`
          : "PokerKing tournament poster — tap to register";
        if (posterCaption) {
          const caption = data.seriesTitle || "";
          posterCaption.textContent = caption;
          posterCaption.hidden = !caption;
        }
        posterWrap.hidden = false;
      } else if (posterWrap && posterImg && events[0]?.poster) {
        posterImg.src = events[0].poster;
        posterImg.alt = `${events[0].title} poster`;
        if (posterCaption) {
          posterCaption.textContent = events[0].title;
          posterCaption.hidden = false;
        }
        posterWrap.hidden = false;
      }

      const posterRegisterBtn = document.querySelector("[data-series-poster-register]");
      if (posterRegisterBtn && !posterRegisterBtn.dataset.bound) {
        posterRegisterBtn.dataset.bound = "1";
        posterRegisterBtn.addEventListener("click", () => {
          const id = data.seriesRegisterEventId;
          const event =
            (id && events.find((e) => e.id === id)) ||
            events.find((e) => e.registrationOpen !== false);
          openRegisterModal(event);
        });
      }

      if (!listRoot) return;

      const listEvents = events.filter((t) => t.showInList !== false);

      listRoot.innerHTML = listEvents
        .map((t) => {
          const open = t.registrationOpen !== false;
          const label = escapeHtml(eventLabel(t));
          const highlight = t.guarantee
            ? `<p class="tournament-highlight">${escapeHtml(t.guarantee)}</p>`
            : "";
          return `
        <button
          type="button"
          class="tournament-row${open ? "" : " is-closed"}"
          data-tournament-id="${escapeHtml(t.id)}"
          ${open ? "" : "disabled"}
          aria-label="Register for ${label}"
        >
          <div class="tournament-info">
            <h3>${escapeHtml(t.title)}</h3>
            <p>${escapeHtml(tournamentSummary(t))}</p>
            ${highlight}
          </div>
          <span class="tournament-cta">${open ? "Register →" : "Closed"}</span>
        </button>`;
        })
        .join("");

      listRoot.querySelectorAll(".tournament-row:not(.is-closed)").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-tournament-id");
          const event = listEvents.find((e) => e.id === id);
          openRegisterModal(event);
        });
      });
    } catch {
      listRoot.innerHTML =
        '<p class="note">Schedule is temporarily unavailable. Please contact the desk.</p>';
    }
  };

  loadTournaments();

  const form = document.querySelector("[data-registration-form]");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const endpoint = cfg.registrationEndpoint || form.getAttribute("action");

      if (!endpoint || endpoint.includes("YOUR_FORM")) {
        if (status) {
          status.className = "form-status error";
          status.textContent =
            "Registration endpoint not configured. Please set registrationEndpoint in js/site-config.js.";
        }
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      if (status) {
        status.className = "form-status";
        status.textContent = "Sending…";
      }

      try {
        const body = new FormData(form);
        const res = await fetch(endpoint, {
          method: "POST",
          body,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Submit failed");
        form.reset();
        if (tournamentInput) tournamentInput.value = "";
        if (status) {
          status.className = "form-status success";
          status.textContent = "Registration received. Our team will contact you shortly.";
        }
        setTimeout(closeRegisterModal, 1400);
      } catch {
        if (status) {
          status.className = "form-status error";
          status.textContent = "Could not send registration. Please WhatsApp the floor desk.";
        }
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }
})();
