const searchInput = document.getElementById('search');
const clubFilter = document.getElementById('filter-club');
const firmaFilter = document.getElementById('filter-firma');
const ligaFilter = document.getElementById('filter-liga');
const dresi = document.querySelectorAll('.dres');

dresi.forEach(dres => {
  const imgs = dres.querySelectorAll('.dres-slider img');
  const prevBtn = dres.querySelector('.prev');
  const nextBtn = dres.querySelector('.next');
  let current = 0;

  function updateImages() {
    imgs.forEach((img, idx) => {
      img.classList.toggle('active', idx === current);
    });
  }

  if (prevBtn && nextBtn && imgs.length > 0) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + imgs.length) % imgs.length;
      updateImages();
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % imgs.length;
      updateImages();
    });
  }
});

function filterDresi() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedClub = clubFilter.value.toLowerCase();
  const selectedFirma = firmaFilter.value.toLowerCase();
  const selectedLiga = ligaFilter.value.toLowerCase();

  dresi.forEach(dres => {
    const klub = dres.getAttribute('data-klub').toLowerCase();
    const firma = dres.getAttribute('data-firma').toLowerCase();
    const liga = dres.getAttribute('data-liga').toLowerCase();

    const matchesSearch = klub.includes(searchValue) || dres.textContent.toLowerCase().includes(searchValue);
    const matchesClub = !selectedClub || klub === selectedClub;
    const matchesFirma = !selectedFirma || firma === selectedFirma;
    const matchesLiga = !selectedLiga || liga === selectedLiga;

    if (matchesSearch && matchesClub && matchesFirma && matchesLiga) {
      dres.style.display = 'block';
    } else {
      dres.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterDresi);
clubFilter.addEventListener('change', filterDresi);
firmaFilter.addEventListener('change', filterDresi);
ligaFilter.addEventListener('change', filterDresi);
