// #########################
// CLOCK
// #########################
// FUNCTION FOR START CLOCK
let intervalId; 

function startCount() {
  intervalId = setInterval(function () {
    var _segundo = 1000;
    var _minuto = _segundo * 60;
    var _hora = _minuto * 60;
    var _dia = _hora * 24;

    var atual = new Date("06/01/2024 21:00:00");
    var fim = new Date();

    var diferenca = fim - atual;

    var dias = Math.floor(diferenca / _dia);
    var horas = Math.floor((diferenca % _dia) / _hora);
    var minutos = Math.floor((diferenca % _hora) / _minuto);
    var segundos = Math.floor((diferenca % _minuto) / _segundo);

    console.log(dias);
    document.getElementById("contador").innerHTML = dias + " dias, ";
    document.getElementById("contador").innerHTML += horas + " horas, ";
    document.getElementById("contador").innerHTML += minutos + " minutos e ";
    document.getElementById("contador").innerHTML += segundos + " segundos";
  }, 1000);
}

// FUNCTION FOR STOP CLOCK
function stopCount() {
  setTimeout(() => {
    clearInterval(intervalId);
    console.log("Intervalo parado.");
  }, 1000);
}

startCount();

// #########################
// SUBMIT
// #########################
// SEND FOR NEXT PAGE
function submit(hidden, visible) {
  const elementoHidden = hidden ? document.querySelector("." + hidden) : null; // Seleciona o elemento oculto
  const elementoVisible = visible
    ? document.querySelector("." + visible)
    : null; // Seleciona o elemento visível
  const buttons = document.querySelectorAll(".buttons");

  // Função para iniciar a transição
  function startTransition(element) {
    element.classList.remove("show"); // Remove a classe 'show' para reiniciar a transição
    element.classList.add("transition-white"); // Adiciona a classe 'transition-white' ao elemento

    // Listener para remover a classe após a transição
    element.addEventListener(
      "transitionend",
      function removeTransition() {
        element.classList.remove("transition-white"); // Remove a classe 'transition-white'
        element.removeEventListener("transitionend", removeTransition); // Evita múltiplas execuções
      }
    );

    // Ativa a classe 'show' para a transição de opacidade e cor de fundo
    setTimeout(() => {
      element.classList.add("show");
    }, 100); // Delay pequeno para ativar a transição
  }

  // Iniciar transição no elemento visível
  if (elementoVisible) {
    startTransition(elementoVisible);
  }

  if (hidden == "step2") {
    stopCount();
  }

  if (hidden == "step1") {
    startCount();
  }

  // Alterna a visibilidade dos elementos
  if (elementoVisible) {
    elementoVisible.classList.toggle("hidden"); // Torna o elemento visível
  }

  if (elementoHidden) {
    elementoHidden.classList.toggle("hidden"); // Torna o elemento oculto
  }

  // Esconde todos os botões
  buttons.forEach(function (button) {
    button.classList.add("hidden");
  });
}
