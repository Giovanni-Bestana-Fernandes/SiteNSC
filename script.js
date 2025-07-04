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
    title: "Tempestade Urbana",
    album: "Primeiros Passos EP",
    image: "./Assets/logo-nsc.png",
    src: "https://www.youtube.com/embed/9eyV_W-grok?si=QEMwGJku-s_hvx0x",
    type: "youtube",
    duration: "4:23"
  },
  {
    title: "Noite Sem Fim",
    album: "Primeiros Passos EP",
    image: "./Assets/logo-nsc.png",
    src: "./Assets/gravando.m4a",
    type: "audio",
    duration: "3:45"
  },
  {
    title: "Cidade Dorme (Ao Vivo)",
    album: "Show 2024",
    image: "./Assets/logo-nsc.png",
    src: "https://www.youtube.com/embed/9fbvrq6-4II?si=UAg3aGT1nycqZiwW",
    type: "youtube",
    duration: "5:12"
  }
];

const shows = [
  {
    date: { day: '20', month: 'JUL', year: '2025' },
    city: 'Barra Bonita, SP',
    venue: 'Encontro Carros Antigos',
    note: 'NSC / Aueba Trio',
    link: '#',
    hasTickets: false
  },
  {
    date: { day: '26', month: 'JUL', year: '2024' },
    city: 'JAÚ, SP',
    venue: 'Circo Voador',
    note: 'NSC / COVER LEGIÃO URBANA',
    link: '#',
    hasTickets: false
  },
  {
    date: { day: '05', month: 'SET', year: '2024' },
    city: 'BARRA BONITA, SP',
    venue: 'Stone Music Bar',
    note: 'Show acústico',
    link: '#',
    hasTickets: false
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

  shows.forEach(show => {
    const showCard = document.createElement('div');
    showCard.className = 'show-card';
    showCard.innerHTML = `
      <div class="show-date">
        <span class="day">${show.date.day}</span>
        <span class="month">${show.date.month}</span>
        <span class="year">${show.date.year}</span>
      </div>
      <div class="show-info">
        <h3>${show.city}</h3>
        <p>${show.venue}</p>
        <small>${show.note}</small>
      </div>
      ${show.hasTickets ? `<a href="${show.link}" class="btn-primary btn-sm">Ingressos</a>` : ''}
    `;
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
      title: "Show no Carioca Club",
      date: "15 de Julho, 2023",
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
      date: "10 de Março, 2024",
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
      date: "22 de Setembro, 2023",
      images: [
        { src: "./Assets/Público/1.jpg", alt: "Show completo da banda no Carioca Club" },
        { src: "./Assets/Público/2.jpg", alt: "Vocalista da banda no palco" },
        { src: "./Assets/Público/3.jpg", alt: "Guitarrista solo" },
        { src: "./Assets/Público/4.jpg", alt: "Público cantando junto" },
        { src: "./Assets/Público/5.jpg", alt: "Público cantando junto" },
      ]
    },
    "gravacao-single": {
      title: "Gravação do Novo Single",
      date: "5 de Janeiro, 2024",
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

  // Envio do formulário via mailto
  if (hireForm) {
    hireForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const requiredFields = hireForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--rock-red)';
          isValid = false;
          field.classList.add('shake');
          setTimeout(() => field.classList.remove('shake'), 500);
        } else {
          field.style.borderColor = '#333';
        }
      });

      if (!isValid) {
        const oldError = hireForm.querySelector('.form-error');
        if (oldError) oldError.remove();

        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        hireForm.insertBefore(errorMessage, hireForm.firstChild);

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

      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      hireForm.reset();
    });
  }

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