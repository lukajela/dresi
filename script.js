const searchInput = document.getElementById('search');
const clubFilter = document.getElementById('filter-club');
const firmaFilter = document.getElementById('filter-firma');
const ligaFilter = document.getElementById('filter-liga');
const dresi = document.querySelectorAll('.dres');
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

// Filteriranje dresov
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

// Povezava filtrov
searchInput.addEventListener('input', filterDresi);
clubFilter.addEventListener('change', filterDresi);
firmaFilter.addEventListener('change', filterDresi);
ligaFilter.addEventListener('change', filterDresi);

// Slider za vsako karto
document.querySelectorAll('.dres').forEach(dres => {
  const imgs = dres.querySelectorAll('.dres-slider img');
  const prevBtn = dres.querySelector('.dres-slider .prev');
  const nextBtn = dres.querySelector('.dres-slider .next');
  let current = 0;

  function updateSlider() {
    imgs.forEach((img, idx) => {
      img.classList.toggle('active', idx === current);
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Da ne odpre lightboxa
      current = (current - 1 + imgs.length) % imgs.length;
      updateSlider();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      current = (current + 1) % imgs.length;
      updateSlider();
    });
  }
});

// Lightbox logika
let currentImages = [];
let currentIndex = 0;

document.querySelectorAll(".dres-slider img").forEach(img => {
  img.addEventListener("click", (e) => {
    const dresDiv = e.target.closest(".dres");
    const images = Array.from(dresDiv.querySelectorAll('.dres-slider img')).map(i => i.src);
    currentImages = images;
    currentIndex = images.indexOf(e.target.src);
    lightboxImg.src = currentImages[currentIndex];
    lightbox.classList.remove("hidden");
  });
});

document.querySelector(".lightbox-prev").addEventListener("click", () => {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
});

document.querySelector(".lightbox-next").addEventListener("click", () => {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
});

// Zapiranje lightboxa
closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
  }
});
