let currentSlide = 0;
let slideImages = [];

const screen2 = document.getElementById('screen2');
memories.forEach((memory) => {
    const star = document.createElement('div');
    star.className = 'star-link';
    star.style.top = `${Math.random() * 80 + 10}%`;
    star.style.left = `${Math.random() * 80 + 10}%`;
    star.style.backgroundColor = memory.color;
    star.dataset.title = memory.title;
    star.dataset.text = memory.text;
    star.dataset.images = JSON.stringify(memory.images);

    star.addEventListener('click', () => {
        openMessageBox(memory.title, memory.text, memory.images);
    });

    screen2.appendChild(star);
});

function updateTimer() {
    const startDate = new Date("2024-06-01T00:00:00");
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('timer').textContent = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
}

setInterval(updateTimer, 1000);

function switchToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    connectStars();
}

function connectStars() {
    const stars = document.querySelectorAll('.star-link');
    const connections = document.getElementById('connections');
    connections.innerHTML = '';

    const starPositions = Array.from(stars).map(star => {
        const rect = star.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        return { x, y };
    });

    for (let i = 0; i < starPositions.length - 1; i++) {
        const start = starPositions[i];
        const end = starPositions[i + 1];

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', start.x);
        line.setAttribute('y1', start.y);
        line.setAttribute('x2', end.x);
        line.setAttribute('y2', end.y);
        connections.appendChild(line);
    }
}

function openMessageBox(title, text, images) {
    document.getElementById('messageTitle').innerText = title;
    document.getElementById('messageText').innerHTML = text;

    slideImages = images;
    currentSlide = 0;
    updateSlide();

    document.getElementById("messageBox").style.display = "block";
}

function updateSlide() {
    const img = document.getElementById("messageImage");
    img.src = slideImages[currentSlide];
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slideImages.length) % slideImages.length;
    updateSlide();
}

function closeMessage() {
    document.getElementById("messageBox").style.display = "none";
}




setTimeout(() => {
    const div = document.getElementById("remove");
    div.style.opacity = "0";
    setTimeout(() => {
      div.style.display = "none";
    }, 1000);
  }, 3000); 