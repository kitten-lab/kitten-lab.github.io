const gallery = document.querySelector('.cabinet-grid, .room-gallery');
const viewer = document.querySelector('#cabinet-viewer');

if (gallery && viewer) {
  const image = viewer.querySelector('img');
  const title = viewer.querySelector('h2');
  const close = viewer.querySelector('button');
  let trigger;

  gallery.addEventListener('click', (event) => {
    const link = event.target.closest('.cabinet-shot > a, .room-example > a');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger = link;
    const thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail.alt;
    title.textContent = link.dataset.roomTitle || link.closest('.cabinet').querySelector('.cabinet-label span').textContent;
    viewer.showModal();
    document.documentElement.classList.add('cabinet-viewer-open');
    close.focus();
  });

  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) {
      const bounds = viewer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
    }
  });
  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('cabinet-viewer-open');
    trigger?.focus({ preventScroll: true });
  });
}
