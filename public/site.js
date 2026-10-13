const filters = document.querySelector('[data-filters]');
const shelves = [...document.querySelectorAll('[data-shelf]')];
const editions = [...document.querySelectorAll('[data-project]')];
const status = document.querySelector('#filter-status');

// HTML keeps the complete collection and native disclosures available without JS.
filters.hidden = false;
document.querySelector('.fallback-nav').hidden = true;
document.querySelector('.motion-control').hidden = false;

filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;

  const selected = button.dataset.filter;
  for (const control of filters.querySelectorAll('button')) {
    control.setAttribute('aria-pressed', String(control === button));
  }
  for (const project of editions) {
    project.hidden = selected !== 'all' && project.dataset.group !== selected;
    if (project.hidden) project.querySelector('details')?.removeAttribute('open');
  }
  for (const shelf of shelves) {
    shelf.hidden = ![...shelf.querySelectorAll('[data-project]')].some(project => !project.hidden);
  }
  const count = editions.filter(project => !project.hidden).length;
  status.textContent = `${count} projects shown. ${button.textContent.trim()}.`;
});

document.querySelector('#less-motion').addEventListener('change', event => {
  document.body.classList.toggle('less-motion', event.target.checked);
});

// Give long catalogues useful deep links; all content remains native HTML.
const showLinkedProject = () => {
  const id = location.hash.slice(1);
  const project = editions.find(item => item.id === id);
  if (!project) return;
  filters.querySelector('[data-filter="all"]').click();
  const details = project.querySelector('details');
  if (details) details.open = true;
  project.scrollIntoView({ block: 'start' });
};
window.addEventListener('hashchange', showLinkedProject);
showLinkedProject();
