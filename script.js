let lastOperator = null;
let resultado = document.getElementById("resultado");
let maxChars = 30; // limite de caracteres
let pontoAdicionado = false;
let numeroApósPonto = false;

function insert(num) {
  let numero = document.getElementById("resultado").innerHTML;

  if (num === "+" || num === "-" || num === "*" || num === "/") {
    if (pontoAdicionado && !numeroApósPonto) {
      return; // não adiciona operador matemático após o ponto sem número
    }
    if (
      lastOperator !== null &&
      resultado.innerHTML.slice(-1) === lastOperator
    ) {
      resultado.innerHTML = resultado.innerHTML.slice(0, -1) + num;
    } else {
      if (!isNaN(resultado.innerHTML.slice(-1))) {
        resultado.innerHTML += num;
      }
    }
    lastOperator = num;
    pontoAdicionado = false;
    numeroApósPonto = false;
  } else if (num === ".") {
    if (!pontoAdicionado && !isNaN(resultado.innerHTML.slice(-1))) {
      resultado.innerHTML += num;
      pontoAdicionado = true;
    }
  } else {
    if (pontoAdicionado) {
      resultado.innerHTML += num;
      numeroApósPonto = true;
    } else {
      resultado.innerHTML += num;
    }
  }

  // ajusta o tamanho da fonte e altura do resultado
  const texto = resultado.innerHTML;
  const limite = 20; // limite de caracteres

  if (texto.length > limite) {
    const fontSize = parseInt(resultado.style.fontSize);
    resultado.style.fontSize = `${fontSize - 5}px`;
    resultado.style.height = `${parseInt(resultado.style.height) + 20}px`;
  }
}

function back() {
  if (resultado.innerHTML.length > 0) {
    resultado.innerHTML = resultado.innerHTML.slice(0, -1);
    if (resultado.innerHTML.slice(-1) === ".") {
      pontoAdicionado = false;
      numeroApósPonto = false;
    }
  }
}

function clean() {
  document.getElementById("resultado").innerHTML = "";
}

function back() {
  let resultado = document.getElementById("resultado").innerHTML;
  document.getElementById("resultado").innerHTML = resultado.substring(
    0,
    resultado.length - 1
  );
}

function calculate() {
  let resultado = document.getElementById("resultado").innerHTML;

  if (resultado) {
    document.getElementById("resultado").innerHTML = eval(resultado);
  } else {
    document.getElementById("resultado").innerHTML = "";
  }
}

// adiciona evento de teclado para inserir números
document.addEventListener("keydown", function (event) {
  if (event.key >= 0 && event.key <= 9) {
    insert(event.key);
  } else if (event.key === ".") {
    insert(".");
  } else if (event.key === "+") {
    insert("+");
  } else if (event.key === "-") {
    insert("-");
  } else if (event.key === "*") {
    insert("*");
  } else if (event.key === "/") {
    insert("/");
  } else if (event.key === "Enter") {
    calculate();
  } else if (event.key === "Backspace") {
    back();
  }
});
