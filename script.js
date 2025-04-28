window.addEventListener("DOMContentLoaded", async () => {
    const carousel = document.getElementById("carouselExampleIndicators");
    if (carousel) {
        console.log("Carrossel Inicializado");
        new bootstrap.Carousel(carousel);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuSidebar = document.getElementById("menuSidebar");
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");

    if (menuToggle && menuSidebar && closeMenu) {
        // Abre o menu
        menuToggle.addEventListener("click", () => {
            menuSidebar.classList.add("active");
            console.log("Menu aberto");
        });

        // Fecha o menu
        closeMenu.addEventListener("click", () => {
            menuSidebar.classList.remove("active");
            console.log("Menu fechado");
        });
    } else {
        console.error("Erro: Elementos do menu não encontrados.");
    }
});

// Função para enviar mensagem no WhatsApp
function enviarMensagem() {
    const numero = '5511999999999'; // coloque aqui o número da banda (com DDD e país)
    const mensagem = encodeURIComponent('Olá, gostaria de falar com a banda!');
    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
}

function filterVideos(category) {
    const carousels = document.querySelectorAll('.video-carousel');
    const buttons = document.querySelectorAll('.filter-btn');

    carousels.forEach(carousel => {
        carousel.classList.remove('active-carousel');
    });

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(category).classList.add('active-carousel');
    document.querySelector(`.filter-btn[onclick="filterVideos('${category}')"]`).classList.add('active');
}
