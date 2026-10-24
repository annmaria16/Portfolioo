(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const header = $('#header'), progress = $('#progress');
  const burger = $('#burger'), navLinks = $('#navLinks');

  // Header shadow + scroll progress bar
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = (isFinite(pct) ? pct : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Active link while scrolling (scroll-spy)
  const links = $$('.nav-links a[href^="#"]');
  const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // Reveal on scroll
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  // Count-up numbers
  const counters = $$('[data-count]');
  const co = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count;
      if (el.dataset.plain) { el.textContent = target; obs.unobserve(el); return; }
      let n = 0; const step = Math.max(1, Math.round(target / 20));
      const t = setInterval(() => { n = Math.min(target, n + step); el.textContent = n + '+'; if (n >= target) clearInterval(t); }, 60);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => co.observe(c));

  // Contact form -> opens the visitor's email app or Gmail web compose
  const form = $('#contactForm'), note = $('#formNote');
  const btnMailto = $('#btnMailto'), btnGmail = $('#btnGmail');
  const nameInput = $('#contactName'), msgInput = $('#contactMessage');

  function sendEmail(target) {
    const name = (nameInput ? nameInput.value : '').trim();
    const msg = (msgInput ? msgInput.value : '').trim();

    if (!name) {
      note.textContent = 'Please enter your name.';
      note.className = 'form-note err';
      if (nameInput) nameInput.focus();
      return;
    }
    if (!msg) {
      note.textContent = 'Please enter your message.';
      note.className = 'form-note err';
      if (msgInput) msgInput.focus();
      return;
    }

    const recipient = 'annmariasusankurian@gmail.com';
    const subject = 'Portfolio enquiry from ' + name;
    const body = msg + '\n\n— Sent by ' + name;
    const encSub = encodeURIComponent(subject);
    const encBody = encodeURIComponent(body);

    if (target === 'gmail') {
      const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + recipient + '&su=' + encSub + '&body=' + encBody;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      note.textContent = 'Opening Gmail in a new tab…';
      note.className = 'form-note success';
    } else {
      const mailtoUrl = 'mailto:' + recipient + '?subject=' + encSub + '&body=' + encBody;
      window.location.href = mailtoUrl;
      note.textContent = 'Opening your email app…';
      note.className = 'form-note success';
    }
  }

  if (btnMailto) btnMailto.addEventListener('click', () => sendEmail('mailto'));
  if (btnGmail) btnGmail.addEventListener('click', () => sendEmail('gmail'));
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      sendEmail('mailto');
    });
  }
  [nameInput, msgInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        if (note && note.classList.contains('err')) {
          note.textContent = '';
          note.className = 'form-note';
        }
      });
    }
  });

  $('#year').textContent = new Date().getFullYear();
})();
