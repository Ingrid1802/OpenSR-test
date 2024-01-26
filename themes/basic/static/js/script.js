document.addEventListener('DOMContentLoaded', (event) => {
  // Al cargar la página, verifica si el modo oscuro está activado en el almacenamiento local
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    document.querySelector('.fa-moon').classList.add('fa-sun');
    document.querySelector('.fa-moon').classList.remove('fa-moon');
  }
});

document.querySelector('.fa-moon, .fa-sun').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  this.classList.toggle('fa-moon');
  this.classList.toggle('fa-sun');

  // Guarda el estado del modo oscuro en el almacenamiento local
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});

document.addEventListener('DOMContentLoaded', function () {
  // Selecciona todos los enlaces de la tabla de contenidos
  const tocLinks = document.querySelectorAll('.aside2 #TableOfContents a');

  tocLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Previene el comportamiento predeterminado de saltar directamente al enlace

      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        // Calcula la posición deseada para el desplazamiento
        const top = target.getBoundingClientRect().top + window.pageYOffset - 70; // -30 para ajustar el offset deseado

        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});

//right_nav
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM completamente cargado");

  // Cambia el color al hacer clic
  const tocLinks = document.querySelectorAll('.aside2 #TableOfContents a');
  console.log("Enlaces encontrados:", tocLinks);

  tocLinks.forEach(link => {
    link.addEventListener('click', function () {
      tocLinks.forEach(navLink => navLink.classList.remove('current-right-link'));
      this.classList.add('current-right-link');
      console.log("Enlace clickeado:", this);
    });
  });

  // Cambia el color según la posición del scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    console.log("Secciones encontradas:", sections);

    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 10) {
        currentSectionId = section.getAttribute('id');
        console.log("Sección actual:", currentSectionId);
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('current-right-link');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('current-right-link');
        console.log("Enlace activo actualizado:", link);
      }
    });
  });
});




//left_nav
document.addEventListener('DOMContentLoaded', () => {
  // Resalta el enlace actual basado en el almacenamiento local
  const currentLink = localStorage.getItem('currentLink');
  if (currentLink) {
    const activeLink = document.querySelector(`.nav-link[href="${currentLink}"]`);
    if (activeLink) {
      activeLink.classList.add('current-link');
    }
  } else {
    // Resalta el enlace basado en la ruta actual si no hay nada en el almacenamiento local
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === path) {
        link.classList.add('current-link');
      }
    });
  }

  // Añade un listener a todos los enlaces
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      // Elimina la clase 'current-link' de todos los enlaces
      document.querySelectorAll('.nav-link').forEach(navLink => navLink.classList.remove('current-link'));

      // Añade la clase 'current-link' al enlace clickeado y guárdalo en el almacenamiento local
      this.classList.add('current-link');
      localStorage.setItem('currentLink', this.getAttribute('href'));
    });
  });
});

