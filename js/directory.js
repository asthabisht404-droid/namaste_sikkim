// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const dataPath = 'data/monasteries.json';
  const containerId = 'monasteryCards';
  let monasteryCache = null;

  function getLang() {
    if (window.i18n && typeof window.i18n.language === 'function') return window.i18n.language();
    if (window.i18next && window.i18next.language) return window.i18next.language;
    return 'en';
  }

  function pickLocalizedField(item, baseField) {
    const lang = getLang() || 'en';
    const shortLang = lang.split('-')[0];
    const candidates = [
      baseField + '_' + lang,
      baseField + '_' + shortLang,
      baseField,
      baseField + '_en'
    ];
    if (baseField === 'description') {
      candidates.push('info_' + lang, 'info_' + shortLang, 'info');
    }
    for (const k of candidates) {
      if (k && Object.prototype.hasOwnProperty.call(item, k) && item[k]) return item[k];
    }
    // fallback: first string property
    for (const k in item) {
      if (typeof item[k] === 'string' && item[k].trim()) return item[k];
    }
    return '';
  }

  function escapeHtml(s) {
    if (!s && s !== 0) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function loadMonasteries() {
    if (monasteryCache) return monasteryCache;
    try {
      const res = await fetch(dataPath, { cache: 'no-store' });
      monasteryCache = await res.json();
      return monasteryCache;
    } catch (err) {
      console.error('Failed to load monasteries:', err);
      monasteryCache = [];
      return monasteryCache;
    }
  }

  function getFilters() {
    const regionFilter = document.getElementById('regionFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const region = regionFilter ? regionFilter.value : '';
    const rating = ratingFilter ? parseInt(ratingFilter.value || '', 10) : 0;
    return { region, rating: isNaN(rating) ? 0 : rating };
  }

  function applyFilterToList(list) {
    const { region, rating } = getFilters();
    return list.filter(m => {
      const matchesRegion = !region || (m.region === region);
      const matchesRating = !rating || (m.rating === rating);
      return matchesRegion && matchesRating;
    });
  }

  async function renderCards(list) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const i18n = window.i18n && typeof window.i18n.t === 'function' ? window.i18n : null;
    const ratingLabel = i18n ? i18n.t('monastery.rating') : 'Rating:';
    const view360Label = i18n ? i18n.t('monastery.view360') || i18n.t('monastery.viewDetails') : 'View 360°';
    const detailsLabel = i18n ? i18n.t('monastery.viewDetails') : 'View Details';

    if (!Array.isArray(list) || list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'no-results';
      empty.innerText = i18n ? (i18n.t('map.noMonasteries') || 'No monasteries found.') : 'No monasteries found.';
      container.appendChild(empty);
      return;
    }

    list.forEach(m => {
      const title = pickLocalizedField(m, 'name') || 'Monastery';
      const regionText = m.region || '';
      const stars = Number.isFinite(m.rating) ? '★'.repeat(Math.max(0, Math.min(5, m.rating))) + '☆'.repeat(Math.max(0, 5 - m.rating)) : '';
      const imgSrc = m.image || m.photo || 'assets/default-monastery.jpg';
      const streetViewUrl = m.streetViewUrl || m.url || '#';

      const card = document.createElement('div');
      card.className = 'monastery-card';

      card.innerHTML = `
        <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(title)}" />
        <h3>${escapeHtml(title)}</h3>
        <p class="monastery-region">${escapeHtml(regionText)}</p>
        <p class="monastery-rating">${escapeHtml(ratingLabel)} ${escapeHtml(stars)}</p>
        <div class="monastery-links">
          <a class="monastery-360" href="${escapeHtml(streetViewUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(view360Label)}</a>
          <a class="monastery-details" href="${escapeHtml(m.detailUrl || m.url || '#')}" target="_blank" rel="noopener noreferrer">${escapeHtml(detailsLabel)}</a>
        </div>
      `;
      container.appendChild(card);
    });
  }

  async function refreshRender() {
    const all = await loadMonasteries();
    const filtered = applyFilterToList(all);
    await renderCards(filtered);
  }

  // hookup filters if present
  function hookupFilters() {
    const regionFilter = document.getElementById('regionFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    if (regionFilter) regionFilter.addEventListener('change', refreshRender);
    if (ratingFilter) ratingFilter.addEventListener('change', refreshRender);
  }

  // react to language changes
  function onLanguageChanged() {
    // re-render using cached data and current filters
    refreshRender();
  }

  // initial setup
  hookupFilters();
  refreshRender();

  // listen for custom event from i18n module
  window.addEventListener('languageChanged', onLanguageChanged);
  // also listen to i18next if available
  if (window.i18next && typeof window.i18next.on === 'function') {
    window.i18next.on('languageChanged', onLanguageChanged);
  }

  // expose manual refresh/clear methods
  window.directory = window.directory || {};
  window.directory.refresh = refreshRender;
  window.directory.clearCache = () => { monasteryCache = null; };
});
