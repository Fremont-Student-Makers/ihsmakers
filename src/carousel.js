document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('img'));
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    let index = 0;

    function show(i) {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    }

    next && next.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      show(index);
    });
    prev && prev.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      show(index);
    });

    if (slides.length) show(0);
  });
});
