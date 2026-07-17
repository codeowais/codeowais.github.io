document.addEventListener('DOMContentLoaded', () => {
  initializeLoadProjects();

  if (window.innerWidth > 600){
    navSpans = document.querySelectorAll('.nav span')
    navSpans.forEach((span) => {
      span.addEventListener("click", function () {
        const targetId = span.getAttribute("data-section");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
  else {
    navSpans = document.querySelectorAll('.nav-mobile span')
    navSpans.forEach((span) => {
      span.addEventListener("click", function () {
        const targetId = span.getAttribute("data-section");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          document.getElementById('mobile-nav-column').classList.toggle('active');
          document.getElementById('icon-wrapper').classList.toggle('active');
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
  const wrapper = document.getElementById('icon-wrapper');
  wrapper.addEventListener('click', () => {
    wrapper.classList.toggle('active');
    document.querySelector('.nav-mobile').style.display = 'flex';
    document.getElementById('mobile-nav-column').classList.toggle('active');
  });
});