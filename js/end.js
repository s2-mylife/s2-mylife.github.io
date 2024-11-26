// ORIENTATION VALIDATE

function checkOrientation() {
  if (window.innerWidth > window.innerHeight) {
    // horizontal
    document.body.classList.remove("blocked");
    document.getElementById("contentBody").classList.remove("hidden");
  } else {
    // vertical
    document.body.classList.add("blocked");
    document.getElementById("contentBody").classList.add("hidden");
  }
}

checkOrientation();

window.addEventListener("resize", checkOrientation);



// LOCK/UNLOCK PAGE

let visitCount = localStorage.getItem("visitCount");

if (!visitCount) {
  visitCount = 1;
} else {
  visitCount = parseInt(visitCount) + 1;
}

localStorage.setItem("visitCount", visitCount);

if (visitCount <= 3) {
  document.querySelector(".lock").style.display = "block";
} else if (visitCount > 3) {
  document.querySelector(".unlock").style.display = "block";
}

setTimeout(() => {
  const div = document.getElementById("remove");
  div.style.opacity = "0";
  setTimeout(() => {
    div.style.display = "none";
  }, 1000);
}, 5000); 


// FUNCTION FOR CREATE STARS
const numberOfStars = 200; // Número de estrelas

// Função para gerar estrelas
function createStars(element) {
  const starsContainer = document.getElementById(element); // Seleciona o contêiner
  const containerWidth = starsContainer.clientWidth; // Largura do contêiner
  const containerHeight = starsContainer.clientHeight; // Altura do contêiner

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const random = Math.floor(Math.random() * 10);
    if (random > 5) {
      star.classList.add("star-pulsante");
    }

    // Posições aleatórias dentro do contêiner
    const x = Math.random() * containerWidth;
    const y = Math.random() * containerHeight;

    // Define a posição
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Adiciona a estrela ao contêiner
    starsContainer.appendChild(star);
  }
}

window.onload = createStars("Stars");

// FUNCTION FOR SELECTED STAR RECORD
const stars = document.querySelectorAll(".starRecord");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    stars.forEach((s) => s.classList.remove("selected"));
    star.classList.add("selected");
  });
});



// FUNCTION MAIN FOR PAGE
document.querySelectorAll(".circle-data").forEach((circle) => {
  circle.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    const modalData = data[id];

    if (modalData) {
      document.getElementById("infoModalLabel").textContent = modalData.title;

      // Substitua textContent por innerHTML para permitir quebras de linha
      document.getElementById("infoModalDescription").innerHTML = modalData.description;

      const imagesContainer = document.getElementById("infoModalImages");
      imagesContainer.innerHTML = ""; // Limpa as imagens anteriores
      if (modalData.photos) {
        modalData.photos.forEach((photo) => {
          const img = document.createElement("img");
          img.src = photo;
          img.alt = "Imagem relacionada";
          img.className = "img-thumbnail"; // Estilo do Bootstrap
          img.style.width = "100px"; // Ajusta o tamanho
          imagesContainer.appendChild(img);
        });
      }
    }

    const modal = new bootstrap.Modal(document.getElementById("infoModal"));
    modal.show();
  });
});
