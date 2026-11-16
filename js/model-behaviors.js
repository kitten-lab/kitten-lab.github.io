const evidenceViewer = document.querySelector('.evidence-viewer');
if (evidenceViewer) {
  const image = evidenceViewer.querySelector('img');
  const close = evidenceViewer.querySelector('button');
  let opener;
  document.querySelectorAll('[data-evidence-title]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      evidenceViewer.querySelector('h2').textContent = link.dataset.evidenceTitle;
      evidenceViewer.showModal();
      document.documentElement.classList.add('evidence-open');
      close.focus();
    });
  });
  close.addEventListener('click', () => evidenceViewer.close());
  evidenceViewer.addEventListener('click', event => {
    if (event.target !== evidenceViewer) return;
    const box = evidenceViewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) evidenceViewer.close();
  });
  evidenceViewer.addEventListener('close', () => {
    document.documentElement.classList.remove('evidence-open');
    opener?.focus({preventScroll:true});
  });
}