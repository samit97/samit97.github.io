// Minimal shared script for multi-page version.
// - Sets active nav link
// - Loads publications.json on publications page
// - Theme toggle
// - Animates skill bars on cv.html
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Highlight active nav link based on pathname
  const path = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    const file = href.split('/').pop();
    if ((file === '' && path === 'index.html') || file === path) {
      a.classList.add('active');
    }
  });

  // Load publications only on publications.html
  if (path === 'publications.html' || document.title.toLowerCase().includes('publications')) {
    fetch('data/publications.json')
      .then(r => r.json())
      .then(list => {
        const ul = document.getElementById('publications-list');
        if (!ul) return;
        ul.innerHTML = '';
        list.slice(0, 50).forEach(pub => {
          const li = document.createElement('li');
          li.innerHTML = `<div class="pub-title"><strong>${escapeHtml(pub.title)}</strong></div>
                          <div class="pub-meta muted">${escapeHtml(pub.authors)} — ${escapeHtml(pub.venue)} (${escapeHtml(pub.year)})</div>
                          ${pub.url ? `<div class="pub-links"><a href="${pub.url}" target="_blank">View</a></div>` : ''}`;
          ul.appendChild(li);
        });
      })
      .catch(err => console.warn('publications.json not loaded', err));
  }

  // theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  let dark = true;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      dark = !dark;
      if (!dark) {
        document.documentElement.style.setProperty('--bg','#ffffff');
        document.documentElement.style.setProperty('--text','#012');
        document.documentElement.style.setProperty('--muted','#41525b');
        themeToggle.textContent = '🌞';
      } else {
        document.documentElement.style.removeProperty('--bg');
        document.documentElement.style.removeProperty('--text');
        document.documentElement.style.removeProperty('--muted');
        themeToggle.textContent = '🌙';
      }
    });
  }

  // Animate skill bars if on CV page
  if (path === 'cv.html' || document.title.toLowerCase().includes('cv')) {
    // small delay for nicer effect
    setTimeout(() => {
      const bars = document.querySelectorAll('.skill-bar');
      bars.forEach(bar => {
        const pct = Number(bar.dataset.percent || bar.getAttribute('aria-valuenow') || 0);
        const fill = bar.querySelector('.skill-fill');
        if (fill) {
          // animate to percent
          fill.style.width = pct + '%';
        }
      });
    }, 200);
  }

  function escapeHtml(s){
    if(!s) return '';
    return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Find the two elements that should form the second row
  var teaching = document.querySelector('.cv-left.teaching-assist');
  var participation = document.querySelector('.cv-right.participation');

  if (teaching && participation) {
    // Create a wrapper and give it the same grid class pattern
    var wrapper = document.createElement('section');
    wrapper.className = 'cv-grid cv-grid-two';

    // Insert wrapper into DOM at the place of 'teaching' element
    teaching.parentNode.insertBefore(wrapper, teaching);

    // Move the two nodes into the wrapper
    wrapper.appendChild(teaching);
    wrapper.appendChild(participation);
  }

  // Optional: animate skill bars if you have that behavior in script.js
  // keep any existing script.js behavior intact
});
