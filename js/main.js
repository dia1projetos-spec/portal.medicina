/* =============================================
   MEDICINAARG v2.0.0 — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR (desktop only) ──────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a,button,[data-modal]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  /* ─── LOADER ─────────────────────────────── */
  const loader = document.getElementById('loader');
  const pct    = document.getElementById('loaderPct');

  let count = 0;
  const pctInterval = setInterval(() => {
    count = Math.min(count + Math.floor(Math.random() * 4) + 1, 100);
    if (pct) pct.textContent = count + '%';
    if (count >= 100) clearInterval(pctInterval);
  }, 28);

  const particlesContainer = document.querySelector('.loader-particles');
  if (particlesContainer) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'lp';
      p.style.cssText = `
        left:${Math.random() * 100}%;
        --dur:${4 + Math.random() * 6}s;
        --delay:${Math.random() * 4}s;
        --tx:${(Math.random() - 0.5) * 200}px;
        width:${1 + Math.random() * 3}px;
        height:${1 + Math.random() * 3}px;
      `;
      particlesContainer.appendChild(p);
    }
  }

  const hideLoader = () => {
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = '';
      }, 800);
    }
  };

  document.body.style.overflow = 'hidden';
  setTimeout(hideLoader, 3000);
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 600);
  });

  /* ─── NAVIGATION ─────────────────────────── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .nav-mobile a[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) cur = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${cur}`);
    });
  }, { passive: true });

  /* ─── HAMBURGER MENU ─────────────────────── */
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── SCROLL REVEAL ─────────────────────── */
  const revEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revEls.forEach(el => revObs.observe(el));

  /* ─── MODAL ─────────────────────────────── */
  const modalOverlay = document.getElementById('loginModal');
  const openBtns     = document.querySelectorAll('[data-modal="login"]');
  const closeBtns    = document.querySelectorAll('.modal-close');

  const openModal  = () => {
    modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(b => b.addEventListener('click', openModal));
  closeBtns.forEach(b => b.addEventListener('click', closeModal));
  modalOverlay?.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Modal tabs
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ─── TESTIMONIALS SLIDER ────────────────── */
  const track  = document.querySelector('.test-track');
  const cards  = document.querySelectorAll('.test-card');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  let curSlide = 0;

  const slideTo = idx => {
    curSlide = ((idx % cards.length) + cards.length) % cards.length;
    track.style.transform = `translateX(-${curSlide * 100}%)`;
    document.querySelectorAll('.test-btn').forEach((b, i) =>
      b.classList.toggle('active', i === curSlide));
  };

  prevBtn?.addEventListener('click', () => slideTo(curSlide - 1));
  nextBtn?.addEventListener('click', () => slideTo(curSlide + 1));

  let auto = setInterval(() => slideTo(curSlide + 1), 5500);
  track?.addEventListener('mouseenter', () => clearInterval(auto));
  track?.addEventListener('mouseleave', () => {
    auto = setInterval(() => slideTo(curSlide + 1), 5500);
  });

  // Touch/swipe for testimonials
  if (track) {
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? slideTo(curSlide + 1) : slideTo(curSlide - 1);
      }
    }, { passive: true });
  }

  /* ─── COUNTER ANIMATION ─────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const end  = parseFloat(el.dataset.count);
      const suf  = el.dataset.suffix || '';
      const dur  = 2000;
      const t0   = performance.now();
      const update = now => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = (Number.isInteger(end)
          ? Math.round(end * ease)
          : (end * ease).toFixed(1)) + suf;
        if (p < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cntObs.observe(c));

  /* ─── MARQUEE DUPLICATE ─────────────────── */
  const mq = document.querySelector('.marquee-track');
  if (mq) mq.innerHTML += mq.innerHTML;

  /* ─── NEWSLETTER ─────────────────────────── */
  document.querySelectorAll('.newsletter-input-wrap').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inp = form.querySelector('input');
      const btn = form.querySelector('button');
      if (inp?.value) {
        btn.textContent = '✓';
        btn.style.background = '#27ae60';
        setTimeout(() => {
          btn.textContent = '→';
          btn.style.background = '';
          inp.value = '';
        }, 3000);
      }
    });
  });

  /* ─── FORMS DEMO ─────────────────────────── */
  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.textContent = 'Entrando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Sucesso!';
      btn.style.background = 'linear-gradient(135deg,#27ae60,#1e8449)';
    }, 1400);
  });

  document.getElementById('registerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    const nome     = document.getElementById('reg-nome')?.value?.trim();
    const email    = document.getElementById('reg-email')?.value?.trim();
    const whatsapp = document.getElementById('reg-whatsapp')?.value?.trim();

    if (!nome || !email || !whatsapp) {
      btn.textContent = '⚠ Preencha todos os campos';
      btn.style.background = 'linear-gradient(135deg,#c0392b,#922b21)';
      setTimeout(() => {
        btn.textContent = 'Solicitar acesso';
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
      return;
    }

    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Send to admin via WhatsApp
    const msg = encodeURIComponent(
      `🎓 *NOVO CADASTRO — MedicinaARG*\n\n` +
      `👤 *Nome:* ${nome}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n\n` +
      `_Solicitação recebida pelo site_`
    );
    const waUrl = `https://wa.me/5513981763452?text=${msg}`;

    setTimeout(() => {
      btn.textContent = '✓ Solicitação enviada!';
      btn.style.background = 'linear-gradient(135deg,#27ae60,#1e8449)';
      window.open(waUrl, '_blank');
    }, 1000);
  });

  /* ─── SMOOTH SCROLL ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
