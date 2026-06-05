document.querySelectorAll('#year').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll('#date').forEach((element) => {
  element.textContent = new Date().toLocaleDateString('es-ES');
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
  const isHidden = mobileMenu?.classList.toggle('hidden') ?? true;
  menuBtn.setAttribute('aria-expanded', String(!isHidden));
});

mobileMenu?.querySelectorAll('a')?.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

const signupForm = document.querySelector('form[data-api-submit="signup"]');

function getFormValue(formData, name) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function buildSignupPayload(formData) {
  return {
    name: getFormValue(formData, 'nombre'),
    email: getFormValue(formData, 'email'),
    phone: getFormValue(formData, 'telefono'),
    company: getFormValue(formData, 'empresa'),
    sector: getFormValue(formData, 'sector') || null,
    users: 1,
    preferred_subdomain: null,
    comments: getFormValue(formData, 'comentarios') || null,
  };
}

signupForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const endpoint = form.dataset.apiEndpoint;
  const formData = new FormData(form);
  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('button[type="submit"]');
  const defaultLabel = submitButton?.dataset.submitLabel ?? submitButton?.textContent ?? 'Enviar';

  if (!endpoint || getFormValue(formData, 'bot-field')) {
    return;
  }

  if (status) {
    status.textContent = 'Enviando solicitud...';
  }
  submitButton?.setAttribute('disabled', 'true');
  if (submitButton) {
    submitButton.textContent = 'Enviando...';
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildSignupPayload(formData)),
    });

    if (!response.ok) {
      throw new Error(`Signup request failed with status ${response.status}`);
    }

    window.location.href = form.getAttribute('action') || '/gracias.html';
  } catch {
    if (status) {
      status.textContent = 'No hemos podido enviar la solicitud. Escríbenos a barnacloudbcn@gmail.com o inténtalo de nuevo.';
    }
    submitButton?.removeAttribute('disabled');
    if (submitButton) {
      submitButton.textContent = defaultLabel;
    }
  }
});

const btnPool1 = document.getElementById('btnPool1');
const btnPool2 = document.getElementById('btnPool2');
const pricingPool1 = document.getElementById('pricingPool1');
const pricingPool2 = document.getElementById('pricingPool2');

function showPool(pool) {
  const isP1 = pool === 1;
  const pool2IsDisabled = btnPool2?.hasAttribute('aria-disabled');

  pricingPool1?.classList.toggle('hidden', !isP1);
  pricingPool2?.classList.toggle('hidden', isP1);

  btnPool1?.classList.toggle('bg-indigo-600', isP1);
  btnPool1?.classList.toggle('text-white', isP1);
  btnPool1?.classList.toggle('bg-white', !isP1);
  btnPool1?.classList.toggle('text-slate-700', !isP1);

  btnPool2?.classList.toggle('bg-indigo-600', !isP1 && !pool2IsDisabled);
  btnPool2?.classList.toggle('text-white', !isP1 && !pool2IsDisabled);
  btnPool2?.classList.toggle('bg-white', isP1 || pool2IsDisabled);
  btnPool2?.classList.toggle('text-slate-700', isP1 || pool2IsDisabled);
}

btnPool1?.addEventListener('click', () => showPool(1));
btnPool2?.addEventListener('click', (event) => {
  if (btnPool2.hasAttribute('aria-disabled')) {
    event.preventDefault();
    btnPool2.setAttribute('aria-label', 'Bloqueado en MVP');
    btnPool2.classList.add('animate-pulse');
    setTimeout(() => btnPool2.classList.remove('animate-pulse'), 600);
    return;
  }

  showPool(2);
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('header nav a[href^="#"]');
const linkById = new Map(
  [...navLinks].map((link) => [link.getAttribute('href').slice(1), link]),
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((link) => link.classList.remove('text-indigo-600', 'font-semibold'));
      linkById.get(id)?.classList.add('text-indigo-600', 'font-semibold');
    }
  });
}, { rootMargin: '0px 0px -60% 0px', threshold: 0.2 });

sections.forEach((section) => observer.observe(section));

const cookieConsentKey = 'barnacloudCookieConsent';

function readCookieConsent() {
  try {
    return window.localStorage.getItem(cookieConsentKey);
  } catch {
    return null;
  }
}

function writeCookieConsent(value) {
  try {
    window.localStorage.setItem(cookieConsentKey, value);
  } catch {
    // If storage is unavailable, hide the banner for this page view only.
  }
}

function closeCookieBanner(value) {
  writeCookieConsent(value);
  document.getElementById('cookieBanner')?.remove();
}

function createCookieBanner() {
  if (readCookieConsent()) {
    return;
  }

  const isLegalPage = window.location.pathname.includes('/legal/');
  const cookiesHref = isLegalPage ? 'cookies.html' : 'legal/cookies.html';
  const privacyHref = isLegalPage ? 'privacidad.html' : 'legal/privacidad.html';

  const banner = document.createElement('section');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML = `
    <button class="cookie-banner__close" type="button" aria-label="Cerrar aviso de cookies" data-cookie-action="close">&times;</button>
    <div class="cookie-banner__text">
      <p>Utilizamos cookies y tecnologías similares estrictamente necesarias para que la web funcione y para proteger los formularios frente a spam. También podemos usar cookies analíticas opcionales para entender el uso de la web y mejorar el servicio. Puedes aceptar, denegar o revisar tus preferencias.</p>
      <div class="cookie-banner__links">
        <a href="${cookiesHref}">Política de cookies</a>
        <a href="${privacyHref}">Política de privacidad</a>
      </div>
    </div>
    <div class="cookie-banner__actions">
      <button class="cookie-banner__button" type="button" data-cookie-action="accept">Aceptar cookies</button>
      <button class="cookie-banner__button" type="button" data-cookie-action="deny">Denegar</button>
      <button class="cookie-banner__button" type="button" aria-expanded="false" aria-controls="cookiePreferences" data-cookie-action="preferences">Ver preferencias</button>
    </div>
    <div id="cookiePreferences" class="cookie-banner__preferences" hidden>
      <label class="cookie-banner__option">
        <input type="checkbox" checked disabled />
        <span><strong>Cookies necesarias</strong>Imprescindibles para navegar, enviar formularios y mantener la seguridad básica.</span>
      </label>
      <label class="cookie-banner__option">
        <input type="checkbox" id="cookieAnalytics" />
        <span><strong>Cookies analíticas</strong>Nos ayudarían a medir visitas y mejorar contenidos. Actualmente no cargamos analítica hasta que exista consentimiento.</span>
      </label>
      <button class="cookie-banner__link" type="button" data-cookie-action="save-preferences">Guardar preferencias</button>
    </div>
  `;

  banner.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest('[data-cookie-action]');
    if (!button) {
      return;
    }

    const action = button.dataset.cookieAction;
    if (action === 'accept') {
      closeCookieBanner('accepted');
    }

    if (action === 'deny' || action === 'close') {
      closeCookieBanner('denied');
    }

    if (action === 'preferences') {
      const preferences = document.getElementById('cookiePreferences');
      const isHidden = preferences?.toggleAttribute('hidden') ?? true;
      button.setAttribute('aria-expanded', String(!isHidden));
    }

    if (action === 'save-preferences') {
      const analyticsAccepted = document.getElementById('cookieAnalytics')?.checked;
      closeCookieBanner(analyticsAccepted ? 'custom:analytics' : 'custom:necessary');
    }
  });

  document.body.appendChild(banner);
}

createCookieBanner();

const aboutSlideshow = document.querySelector('[data-about-slideshow]');
const aboutSection = document.getElementById('about');

if (aboutSlideshow && aboutSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const restartAboutSlideshow = () => {
    aboutSlideshow.classList.remove('is-playing');
    void aboutSlideshow.offsetWidth;
    aboutSlideshow.classList.add('is-playing');
  };

  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        restartAboutSlideshow();
      }
    });
  }, { threshold: 0.45 });

  aboutObserver.observe(aboutSection);
}
