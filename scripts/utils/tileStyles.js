function initializeTileStyles() {
  const style = document.createElement("style");
  document.head.appendChild(style);

  try {
    if (window.innerWidth > 600){
      document.querySelectorAll("#projects-section .content-tile").forEach(tile => {
        const name = tile.getAttribute("aria-label");
        if (!name) return;
        style.sheet.insertRule(`
          .content-tile-thumb.${name} {
            position: relative;
            overflow: hidden;
          }
        `);

        style.sheet.insertRule(`
          .content-tile-thumb.${name}::before,
          .content-tile-thumb.${name}::after {
            content: "";
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            transition: opacity 350ms ease;
            pointer-events: none;     /* so the pseudo elements don't block pointer events */
            will-change: opacity;     /* hint for smoother animation */
            transform: translateZ(0);
          }
        `);

        style.sheet.insertRule(`
          .content-tile-thumb.${name}::before {
            background-image: url(assets/img/${name}/thumb.webp);
            opacity: 1;
            z-index: 0;
          }
        `);

        style.sheet.insertRule(`
          .content-tile-thumb.${name}::after {
            background-image: url(assets/img/${name}/thumb-hover.webp);
            opacity: 0;
            z-index: 1;
          }
        `);

        style.sheet.insertRule(`
          .content-tile-thumb.${name}:hover::after {
            opacity: 1;
          }
        `);
        style.sheet.insertRule(`
          .content-tile-thumb.${name}:hover::before {
            opacity: 0;
          }
        `);
      });
    }
    else if (window.innerWidth <= 600){
      document.querySelectorAll("#projects-section .content-tile").forEach(tile => {
        const name = tile.getAttribute("aria-label");
        if (!name) return;
        style.sheet.insertRule(`
          .content-tile-thumb.${name} {
            position: relative;
            overflow: hidden;
          }
        `);

        style.sheet.insertRule(`
          .content-tile-thumb.${name}{
            background-size: cover;
            background-position: 50% 50%;
            background-repeat: no-repeat;
          }
        `);

        style.sheet.insertRule(`
          .content-tile-thumb.${name} {
            background-image: url(assets/img/${name}/thumb.webp);
            z-index: 0;
          }
        `);
      });
    }

  } catch (error) {
    console.error("Error styling projects data:", error);
  }

  const projectsSection = document.querySelector('#projects-section');
  const projects = projectsSection.querySelectorAll('.content-tile');
  const remainder = projects.length % 3;

  if (remainder !== 0 && window.innerWidth>600){
    try {
      const filler = document.createElement('div');
      filler.className = 'content-tile-spacer';
      const fillerText = document.createElement('h1');
      fillerText.innerHTML = 'Coming Soon<br>→'
      filler.appendChild(fillerText);
      projectsSection.appendChild(filler);
    } catch (error){
      console.error(error)
    };
  }
}