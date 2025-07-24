// Scroll suave para seções
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const headerHeight = document.getElementById('header').offsetHeight;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// Scroll para o topo
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Botão WhatsApp
function openWhatsApp() {
  const phone = "5514998170907";
  const msg = "Olá! Gostaria de saber mais sobre a banda NSC!";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Lista de músicas
const songs = [
  {
    title: "Do seu lado",
    album: "Jota Quest",
    image: "./Assets/logo-nsc.png",
    src: "https://www.youtube.com/embed/9eyV_W-grok?si=QEMwGJku-s_hvx0x",
    type: "youtube",
    duration: "4:23"
  },
  // {
  //   title: "Noite Sem Fim",
  //   album: "Primeiros Passos EP",
  //   image: "./Assets/logo-nsc.png",
  //   src: "./Assets/gravando.m4a",
  //   type: "audio",
  //   duration: "3:45"
  // },
  // {
  //   title: "Carla",
  //   album: "Ls Jack",
  //   image: "./Assets/logo-nsc.png",
  //   src: "https://www.youtube.com/watch?v=aNtGfPYanJw",
  //   type: "youtube",
  //   duration: "4:06"
  // },
  {
    title: "Bete Balanço / Mania de Você",
    album: "Frejat",
    image: "./Assets/logo-nsc.png",
    src: "https://www.youtube.com/embed/9fbvrq6-4II?si=UAg3aGT1nycqZiwW",
    type: "youtube",
    duration: "5:12"
  }
];
const shows = [
  {
    date: { day: '20', month: 'JUL', year: '2025' },
    city: 'BARRA BONITA, SP',
    venue: 'Encontro Carros Antigos',
    note: 'NSC / Aueba Trio',
    link: '#',
    hasTickets: false,
    hasVip: false,
    details: 'A banda NSC se apresenta junto com o Aueba Trio no palco principal da Praça do Museu, com início às 10h. Evento gratuito e ao ar livre.'
  },
  {
    date: { day: '16', month: 'AGO', year: '2025' },
    city: 'BARRA BONITA, SP',
    venue: 'Baile de Máscaras - AABB',
    note: 'NSC / BANDA DELPHOS',
    link: '#',
    hasTickets: true,
    hasVip: true,
    vipLink: '#',
    details: 'A banda NSC se apresenta junto com a banda Delphos.'
  },
  {
    date: { day: '13', month: 'SET', year: '2025' },
    city: 'BARRA BONITA, SP',
    venue: 'Festa Privada',
    note: 'Show Completo',
    link: '#',
    hasTickets: false,
    hasVip: false
  },
  {
    date: { day: '02', month: 'NOV', year: '2025' },
    city: 'BARRA BONITA, SP',
    venue: 'Breja Top',
    note: 'Show Completo',
    link: '#',
    hasTickets: false,
    hasVip: false,
    vipLink: '#'
  },
  {
    date: { day: '22', month: 'NOV', year: '2025' },
    city: 'BARRA BONITA, SP',
    venue: 'Festa Privada',
    note: 'Show Completo',
    link: '#',
    hasTickets: false,
    hasVip: false
  }
];


document.addEventListener('DOMContentLoaded', function () {
  renderShows();
  setupMusicPlayer();
  setupMobileMenu();
  setupScrollNavigation();
  setupForms();
});

function renderShows() {
  const showsList = document.getElementById('shows-list');
  if (!showsList) return;

  showsList.innerHTML = '';

  shows.forEach(show => {
    const showCard = document.createElement('article');
    showCard.className = 'show-card';

    const showDate = document.createElement('div');
    showDate.className = 'show-date';
    showDate.innerHTML = `
      <span class="day">${show.date.day}</span>
      <span class="month">${show.date.month}</span>
      <span class="year">${show.date.year}</span>
    `;

    const showInfo = document.createElement('div');
    showInfo.className = 'show-info';

    const city = document.createElement('h3');
    city.textContent = show.city;

    const venue = document.createElement('p');
    venue.textContent = show.venue;

    const note = document.createElement('small');
    note.textContent = show.note;

    showInfo.appendChild(city);
    showInfo.appendChild(venue);
    showInfo.appendChild(note);

    showCard.appendChild(showDate);
    showCard.appendChild(showInfo);

    // Botões
    const btnContainer = document.createElement('div');
    btnContainer.className = 'show-buttons';

    if (show.hasVip && show.vipLink) {
      const vipBtn = document.createElement('a');
      vipBtn.href = show.vipLink;
      vipBtn.className = 'btn-primary btn-sm btn-vip';
      vipBtn.textContent = 'VIP';
      vipBtn.setAttribute('target', '_blank');
      vipBtn.setAttribute('rel', 'noopener noreferrer');
      btnContainer.appendChild(vipBtn);
    }

    if (show.hasTickets && show.link) {
      const ticketBtn = document.createElement('a');
      ticketBtn.href = show.link;
      ticketBtn.className = 'btn-primary btn-sm';
      ticketBtn.textContent = 'Ingressos';
      ticketBtn.setAttribute('target', '_blank');
      ticketBtn.setAttribute('rel', 'noopener noreferrer');
      btnContainer.appendChild(ticketBtn);
    }

    if (show.details) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'btn-more';
      toggleBtn.textContent = 'Ver mais';
      toggleBtn.setAttribute('aria-expanded', 'false');

      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'show-details';
      detailsDiv.textContent = show.details;
      detailsDiv.style.display = 'none';

      toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !expanded);
        toggleBtn.textContent = expanded ? 'Ver mais' : 'Ver menos';
        detailsDiv.style.display = expanded ? 'none' : 'block';
      });

      showCard.appendChild(toggleBtn);
      showCard.appendChild(detailsDiv);
    }

    showCard.appendChild(btnContainer);
    showsList.appendChild(showCard);
  });
}



function setupMusicPlayer() {
  // Elementos
  const audioPlayer = new Audio();
  let currentSong = null;
  let isPlaying = false;
  const songCardButtons = [];
  const songListEl = document.querySelector('.song-list');
  const mediaContainer = document.getElementById('media-container');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const volumeSlider = document.getElementById('volume-slider');
  const currentSongTitle = document.getElementById('current-song-title');
  const currentSongAlbum = document.getElementById('current-song-album');
  const currentSongImage = document.getElementById('current-song-image');
  let youtubeIframe = null;

  // Formatador de tempo
  const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

  // Atualiza progresso
  const updateProgress = () => {
    const { currentTime, duration } = audioPlayer;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    currentTimeEl.textContent = formatTime(currentTime);
  };

  // Define progresso manualmente
  const setProgress = e => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
  };

  // Atualiza botões
  const updatePlayButtons = (playing) => {
    songCardButtons.forEach((btn, idx) => {
      btn.innerHTML = (idx === currentSong && playing) ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });
    playBtn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  };

  // Carrega música
  const loadSong = index => {
    const song = songs[index];
    currentSong = index;
    updatePlayButtons(false);

    if (youtubeIframe) youtubeIframe.remove();
    mediaContainer.innerHTML = '';

    const player = document.querySelector('.music-player');

    if (song.type === 'youtube') {
      player.classList.add('hide-controls');
      audioPlayer.pause();
      youtubeIframe = document.createElement('iframe');
      youtubeIframe.src = `${song.src}&autoplay=0`;
      youtubeIframe.width = '100%';
      youtubeIframe.height = '250';
      youtubeIframe.allow = 'autoplay; encrypted-media';
      youtubeIframe.frameBorder = '0';
      youtubeIframe.allowFullscreen = true;
      mediaContainer.appendChild(youtubeIframe);
      isPlaying = false;
    } else {
      player.classList.remove('hide-controls');
      audioPlayer.src = song.src;
      mediaContainer.appendChild(audioPlayer);
      if (isPlaying) audioPlayer.play();
    }

    currentSongTitle.textContent = song.title;
    currentSongAlbum.textContent = song.album;
    currentSongImage.src = song.image;

    audioPlayer.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audioPlayer.duration);
    });
  };

  // Controles principais
  const playSong = () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      isPlaying = true;
    } else {
      audioPlayer.pause();
      isPlaying = false;
    }
    updatePlayButtons(isPlaying);
  };

  const prevSong = () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    if (songs[currentSong].type === 'audio') {
      audioPlayer.play();
      isPlaying = true;
    }
    updatePlayButtons(isPlaying);
  };

  const nextSong = () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    if (songs[currentSong].type === 'audio') {
      audioPlayer.play();
      isPlaying = true;
    }
    updatePlayButtons(isPlaying);
  };

  // Criação dos cards
  songs.forEach((song, index) => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <div class="song-info">
        <button class="play-song-btn"><i class="fas fa-play"></i></button>
        <div>
          <h4>${song.title}</h4>
          <small>${song.album}</small>
        </div>
      </div>
      <div class="song-meta"><span>${song.duration}</span></div>
    `;
    const playBtnInner = card.querySelector('.play-song-btn');
    songCardButtons[index] = playBtnInner;

    playBtnInner.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentSong === index && isPlaying) {
        audioPlayer.pause();
        updatePlayButtons(false);
      } else {
        loadSong(index);
        if (song.type === 'audio') {
          audioPlayer.play();
          isPlaying = true;
          updatePlayButtons(true);
        }
      }
    });

    card.addEventListener('click', () => {
      loadSong(index);
      if (song.type === 'audio') {
        audioPlayer.play();
        isPlaying = true;
        updatePlayButtons(true);
      }
    });

    songListEl.appendChild(card);
  });

  // Eventos
  playBtn.addEventListener('click', playSong);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  audioPlayer.addEventListener('timeupdate', updateProgress);
  audioPlayer.addEventListener('ended', nextSong);
  progressBar.parentElement.addEventListener('click', setProgress);
  volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
  });

  if (songs.length > 0) loadSong(0);
}


function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

function setupScrollNavigation() {
  const sections = ['home', 'about', 'members', 'music', 'gallery', 'shows', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;
        if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      }
    });

    backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}



//Galery Items
document.addEventListener('DOMContentLoaded', function () {
  // Dados da galeria
  const galleryData = {
    "carioca-club": {
      title: "Shows",
      date: "15 de Novembro, 2024",
      images: [
        { src: "./Assets/NSC no palco/1.jpg", alt: "Show completo da banda no Carioca Club" },
        { src: "./Assets/NSC no palco/2.jpg", alt: "Vocalista da banda no palco" },
        { src: "./Assets/NSC no palco/3.jpg", alt: "Guitarrista solo" },
        { src: "./Assets/NSC no palco/4.jpg", alt: "Público cantando junto" },
        { src: "./Assets/NSC no palco/5.jpg", alt: "Público cantando junto" },
        { src: "./Assets/NSC no palco/6.jpg", alt: "Público cantando junto" },
        { src: "./Assets/NSC no palco/7.jpg", alt: "Público cantando junto" },
        { src: "./Assets/NSC no palco/8.jpg", alt: "Público cantando junto" },
        { src: "./Assets/NSC no palco/9.jpg", alt: "Público cantando junto" },
        { src: "./Assets/NSC no palco/10.jpg", alt: "Público cantando junto" }
      ]
    },
    "ensaio-estudio": {
      title: "Ensaio no Estúdio",
      date: "10 de Fevereiro, 2025",
      images: [
        { src: "./Assets/Ensaio NSC/1.jpg", alt: "Show completo da banda no Carioca Club" },
        { src: "./Assets/Ensaio NSC/2.jpg", alt: "Vocalista da banda no palco" },
        { src: "./Assets/Ensaio NSC/3.jpg", alt: "Guitarrista solo" },
        { src: "./Assets/Ensaio NSC/4.jpg", alt: "Público cantando junto" },
        { src: "./Assets/Ensaio NSC/5.jpg", alt: "Público cantando junto" },
        { src: "./Assets/Ensaio NSC/6.jpg", alt: "Público cantando junto" },
        { src: "./Assets/Ensaio NSC/7.jpg", alt: "Público cantando junto" },
        { src: "./Assets/Ensaio NSC/8.jpg", alt: "Público cantando junto" },
      ]
    },
    "publico-show": {
      title: "Público no Show",
      date: "22 de Julho, 2025",
      images: [
        { src: "./Assets/Público/1.jpg", alt: "Show completo da banda no Carioca Club" },
        { src: "./Assets/Público/2.jpg", alt: "Vocalista da banda no palco" },
        { src: "./Assets/Público/3.jpg", alt: "Guitarrista solo" },
        { src: "./Assets/Público/4.jpg", alt: "Público cantando junto" },
        { src: "./Assets/Público/5.jpg", alt: "Público cantando junto" },
      ]
    },
    "gravacao-single": {
      title: "Bastidores",
      date: "5 de Março, 2025",
      images: [
        { src: "./Assets/Bastidores/1.jpg", alt: "Show completo da banda no Carioca Club" },
        { src: "./Assets/Bastidores/2.jpg", alt: "Vocalista da banda no palco" },
        { src: "./Assets/Bastidores/3.jpg", alt: "Guitarrista solo" },
        { src: "./Assets/Bastidores/4.jpg", alt: "Público cantando junto" },
        { src: "./Assets/Bastidores/5.jpg", alt: "Público cantando junto" },
      ]
    }
  };

  // Elementos DOM
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const slider = document.getElementById('lightbox-slider');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const counter = document.getElementById('lightbox-counter');
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const zoomResetBtn = document.getElementById('zoom-reset');

  // Estado da galeria
  let currentEvent = null;
  let currentIndex = 0;
  let zoomLevel = 1;
  let touchStartX = 0;
  let touchEndX = 0;

  // Inicialização
  function init() {
    setupEventListeners();
    preloadImages();
    updateGalleryCounts();
  }

  // Pré-carrega imagens para melhor performance
  function preloadImages() {
    Object.values(galleryData).forEach(event => {
      event.images.forEach(img => {
        const image = new Image();
        image.src = img.src;
      });
    });
  }

  function updateGalleryCounts() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      const eventKey = item.getAttribute('data-event');
      const data = galleryData[eventKey];
      if (data) {
        const span = item.querySelector('.gallery-caption span');
        span.textContent = `${data.date} • ${data.images.length} fotos`;
      }
    });
  }

  // Configura listeners de eventos
  function setupEventListeners() {
    // Abrir lightbox
    galleryItems.forEach(item => {
      item.addEventListener('click', () => openLightbox(item.dataset.event));
    });

    // Controles do lightbox
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    zoomResetBtn.addEventListener('click', resetZoom);

    // Teclado
    document.addEventListener('keydown', handleKeyDown);

    // Toque para mobile
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // Abre o lightbox com as imagens do evento
  function openLightbox(eventKey) {
    currentEvent = galleryData[eventKey];
    currentIndex = 0;
    zoomLevel = 1;

    if (!currentEvent) return;

    // Preenche o slider com as imagens
    slider.innerHTML = '';
    currentEvent.images.forEach((img, index) => {
      const slide = document.createElement('div');
      slide.className = 'lightbox-slide';
      slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" data-index="${index}">`;
      slider.appendChild(slide);
    });

    // Ativa o lightbox
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Atualiza a interface
    updateCounter();
    updateNavButtons();
  }

  // Fecha o lightbox
  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    resetZoom();
  }

  // Mostra imagem anterior
  function showPrevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
      resetZoom();
    }
  }

  // Mostra próxima imagem
  function showNextImage() {
    if (currentIndex < currentEvent.images.length - 1) {
      currentIndex++;
      updateSlider();
      resetZoom();
    }
  }

  // Atualiza a posição do slider
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateCounter();
    updateNavButtons();
  }

  // Atualiza o contador
  function updateCounter() {
    counter.textContent = `${currentIndex + 1}/${currentEvent.images.length}`;
  }

  // Atualiza estado dos botões de navegação
  function updateNavButtons() {
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex === currentEvent.images.length - 1 ? 'hidden' : 'visible';
  }

  // Controles de zoom
  function zoomIn() {
    if (zoomLevel < 3) {
      zoomLevel += 0.2;
      applyZoom();
    }
  }

  function zoomOut() {
    if (zoomLevel > 0.5) {
      zoomLevel -= 0.2;
      applyZoom();
    }
  }

  function resetZoom() {
    zoomLevel = 1;
    applyZoom();
  }

  function applyZoom() {
    const slides = document.querySelectorAll('.lightbox-slide');
    slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      if (img) {
        if (index === currentIndex) {
          img.style.transform = `scale(${zoomLevel})`;
          img.style.transition = 'transform 0.3s ease';
        } else {
          img.style.transform = 'scale(1)';
        }
      }
    });
  }

  // Navegação por teclado
  function handleKeyDown(e) {
    if (!modal.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
      case '+':
        zoomIn();
        break;
      case '-':
        zoomOut();
        break;
      case '0':
        resetZoom();
        break;
    }
  }

  // Navegação por swipe (mobile)
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;

    if (diff > threshold) {
      showNextImage();
    } else if (diff < -threshold) {
      showPrevImage();
    }
  }

  // Inicializa a galeria
  init();

});


// Contratação - Modal e Formulário
document.addEventListener('DOMContentLoaded', function () {
  // Elementos do modal de contratação
  const hireButton = document.getElementById('hire-button');
  const modal = document.getElementById('hire-modal');
  const closeButton = document.querySelector('.close-modal');
  const hireForm = document.getElementById('hire-form');

  // Abrir modal ao clicar em Contratar
  if (hireButton) {
    hireButton.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';

      // Focar no primeiro campo ao abrir
      setTimeout(() => {
        document.getElementById('hire-name').focus();
      }, 100);
    });
  }

  // Fechar modal
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Fechar ao clicar fora do modal
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Fechar com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Validação em tempo real
  const requiredInputs = document.querySelectorAll('#hire-form [required]');
  requiredInputs.forEach(input => {
    input.addEventListener('input', function () {
      if (this.value.trim()) {
        this.style.borderColor = '#333';
      }
    });
  });

  // Envio do formulário de mensagem direta
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('direct-name').value.trim();
      const email = document.getElementById('direct-email').value.trim();
      const telefone = document.getElementById('direct-telefone').value.trim();
      const message = document.getElementById('direct-message').value.trim();

      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
      }

      const subject = `Mensagem de ${name}`;
      const body = `
      Nome: ${name}
      E-mail: ${email}
      Telefone: ${telefone}

      Mensagem:
      ${message}

      -------------------------
      Enviado pelo site da Banda NSC
      `.trim();

      const mailtoLink = `mailto:producao@nscbanda.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      contactForm.reset();
    });
  }



});

const form = {
  "sections": [
    {
      "title": "Seus Dados",
      "fields": [
        {
          "label": "Nome Completo*",
          "id": "hire-name",
          "name": "name",
          "type": "text",
          "required": true
        },
        {
          "label": "E-mail*",
          "id": "hire-email",
          "name": "email",
          "type": "email",
          "required": true
        },
        {
          "label": "Telefone/WhatsApp*",
          "id": "hire-phone",
          "name": "phone",
          "type": "tel",
          "required": true
        }
      ]
    },
    {
      "title": "Detalhes do Evento",
      "fields": [
        {
          "label": "Tipo de Evento*",
          "id": "hire-event",
          "name": "event_type",
          "type": "select",
          "required": true,
          "options": [
            "Casamento",
            "Aniversário",
            "Festa Corporativa",
            "Bar/Show",
            "Festival",
            "Outro"
          ]
        },
        {
          "label": "Data do Evento*",
          "id": "hire-date",
          "name": "event_date",
          "type": "date",
          "required": true
        },
        {
          "label": "Local do Evento*",
          "id": "hire-location",
          "name": "event_location",
          "type": "text",
          "placeholder": "Cidade, Estado e local específico",
          "required": true
        },
        {
          "label": "Duração do Show*",
          "id": "hire-duration",
          "name": "show_duration",
          "type": "select",
          "required": true,
          "options": [
            "1 hora",
            "1 hora e 30 minutos",
            "2 horas",
            "2 horas e 30 minutos",
            "3 horas",
            "Mais de 3 horas"
          ]
        }
      ]
    },
    {
      "title": "Informações Adicionais",
      "fields": [
        {
          "label": "Faixa de Orçamento*",
          "id": "hire-budget",
          "name": "budget_range",
          "type": "select",
          "required": true,
          "options": [
            "Até R$ 1.200",
            "R$ 1.200 - R$ 2.000",
            "R$ 2.000 - R$ 4.000",
            "R$ 4.000 - R$ 6.000",
            "R$ 6.000 - R$ 8.000",
            "Acima de R$ 8.000",
            "A combinar"
          ]
        },
        {
          "label": "Estrutura Disponibilizada",
          "id": "hire-structure",
          "name": "event_structure",
          "type": "select",
          "required": false,
          "options": [
            "Palco completo",
            "Som e iluminação básicos",
            "Apenas espaço",
            "Nenhuma estrutura"
          ]
        },
        {
          "label": "Detalhes Adicionais",
          "id": "hire-details",
          "name": "event_details",
          "type": "textarea",
          "required": false,
          "placeholder": "Nos conte mais sobre seu evento, estrutura, expectativas, repertório desejado..."
        }
      ]
    }
  ]
}

const monthMap = {
  JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
  JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12'
};

function showDateToISO(dateObj) {
  const day = String(dateObj.day).padStart(2, '0');
  const month = monthMap[dateObj.month.toUpperCase()];
  const year = dateObj.year;
  return `${year}-${month}-${day}`;
}

const blockedDates = shows.map(show => showDateToISO(show.date));


const hireForm = document.getElementById('hire-form');
function createField(field) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-group-contract';

  const label = document.createElement('label');
  label.htmlFor = field.id;
  label.textContent = field.label;
  wrapper.appendChild(label);

  let input;

  if (field.type === 'select') {
    input = document.createElement('select');
    input.id = field.id;
    input.name = field.name;
    if (field.required) input.required = true;

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = 'Selecione...';
    input.appendChild(defaultOption);

    field.options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      input.appendChild(option);
    });

  } else if (field.type === 'textarea') {
    input = document.createElement('textarea');
    input.id = field.id;
    input.name = field.name;
    if (field.placeholder) input.placeholder = field.placeholder;
    if (field.required) input.required = true;
    input.rows = 4;

  } else {
    input = document.createElement('input');
    input.type = field.type;
    input.id = field.id;
    input.name = field.name;
    if (field.placeholder) input.placeholder = field.placeholder;
    if (field.required) input.required = true;

    // Se for date, aplicar restrições abaixo
    if (field.type === 'date') {
      const today = new Date().toISOString().split('T')[0];
      input.setAttribute('min', today);
    }
  }

  wrapper.appendChild(input);
  return wrapper;
}

// Montar o formulário
form.sections.forEach(section => {
  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'form-section';

  const title = document.createElement('h3');
  title.textContent = section.title;
  sectionDiv.appendChild(title);

  section.fields.forEach(field => {
    sectionDiv.appendChild(createField(field));
  });

  hireForm.appendChild(sectionDiv);
});

// Botão enviar
const submitBtn = document.createElement('button');
submitBtn.type = 'submit';
submitBtn.className = 'btn-primary';
submitBtn.textContent = 'Enviar Proposta';
hireForm.appendChild(submitBtn);

// Área para mensagem de erro
const errorDiv = document.createElement('div');
errorDiv.className = 'form-error';
errorDiv.style.display = 'none';
hireForm.insertBefore(errorDiv, submitBtn);

// Bloquear datas dos shows no input de data
const dateInput = document.getElementById('hire-date');
if (dateInput) {
  dateInput.addEventListener('input', () => {
    const selected = dateInput.value;
    if (blockedDates.includes(selected)) {
      alert('Data ocupada por show. Por favor, escolha outra data.');
      dateInput.value = '';
    }
  });
}

// Validação + envio via mailto
hireForm.addEventListener('submit', e => {
  e.preventDefault();

  // Reset error
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';

  const requiredFields = hireForm.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = 'var(--rock-red, #e00)';
      field.classList.add('shake');
      setTimeout(() => field.classList.remove('shake'), 500);
    } else {
      field.style.borderColor = '#ccc';
    }
  });

  // Verifica se data está bloqueada
  if (dateInput && blockedDates.includes(dateInput.value)) {
    isValid = false;
    errorDiv.textContent = 'Data selecionada já está ocupada por outro show.';
    errorDiv.style.display = 'block';
    dateInput.style.borderColor = 'var(--rock-red, #e00)';
  }

  if (!isValid) {
    if (!errorDiv.textContent) {
      errorDiv.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    }
    errorDiv.style.display = 'block';
    hireForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const formData = new FormData(hireForm);
  const formObject = {};
  formData.forEach((value, key) => formObject[key] = value);

  const subject = `Proposta de contratação - ${formObject.name}`;
  const body = `
Nome: ${formObject.name}
E-mail: ${formObject.email}
Telefone/WhatsApp: ${formObject.phone}

Tipo de Evento: ${formObject.event_type}
Data do Evento: ${formObject.event_date}
Local do Evento: ${formObject.event_location}
Duração do Show: ${formObject.show_duration}

Faixa de Orçamento: ${formObject.budget_range}
Estrutura Disponibilizada: ${formObject.event_structure || 'Não informada'}

Detalhes Adicionais:
${formObject.event_details || 'Nenhum'}

-------------------------
Enviado pelo site da Banda NSC
  `.trim();

  const mailtoLink = `mailto:ninguem.sabe.ao.certo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  // Caso tenha modal, fecha e reset
  if (typeof modal !== 'undefined') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  hireForm.reset();
});