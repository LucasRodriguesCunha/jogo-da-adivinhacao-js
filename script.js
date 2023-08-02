// Obtém os elementos HTML
const adivinharSection = document.querySelector("#adivinhar-section");
const adivinharInput = document.querySelector("#adivinhe");
const adivinharBtn = document.querySelector("#adivinhe-btn");
const resultadoParagrafo = document.querySelector("#resultado");
const dificuldadeSelect = document.querySelector("#dificuldade");
const dificuldadeSection = document.querySelector("#dificuldade-section");
const jogoSection = document.querySelector("#jogo-section");
const tentativas = document.querySelector("#tentativas-restantes");
const resetarBtn = document.querySelector("#resetar-btn");

// Define as configurações de dificuldade
let max_tentativas;
let num_aleatorio;
let tentativas_perdidas;

// Define as configurações de dificuldade quando o usuário escolhe uma opção
dificuldadeSelect.addEventListener("change", function () {
    const dificuldade = parseInt(dificuldadeSelect.value);


    switch (dificuldade) {
        case 1:
            max_tentativas = 10;
            break;
        case 2:
            max_tentativas = 7;
            break;
        case 3:
            max_tentativas = 5;
            break;
        default:
            max_tentativas = 10;
            break;
    }

    tentativas_perdidas = max_tentativas
    tentativas.textContent = tentativas_perdidas;

    num_aleatorio = Math.floor(Math.random() * 100) + 1;

    // Oculta a seleção da dificuldade e exibe o campo de entrada de palpite
    dificuldadeSection.style.display = "none";
    jogoSection.style.display = "block";
    adivinharSection.style.display = "flex";

    // Mostra o número aleatório no console
    console.log(num_aleatorio);

});

// Adiciona o evento de clique ao botão "Enviar"
adivinharBtn.addEventListener("click", function () {
    // Obtém o valor do campo de texto
    const adivinhe = parseInt(adivinharInput.value);

    // Verifica se o valor é um número válido
    if (isNaN(adivinhe) || adivinhe < 1 || adivinhe > 100) {
        resultadoParagrafo.textContent = "Por favor, insira um número de 1 a 100."
    } else {
        // Compara o palpite do usuário com o número aleatório
        if (adivinhe === num_aleatorio) {
            resultadoParagrafo.textContent = `Parabéns, você acertou o número em ${max_tentativas - tentativas_perdidas + 1} tentativa(s).`;

            resetarBtn.style.display = "block";
            tentativas.style.display = "none";
        } else if (adivinhe > num_aleatorio) {
            resultadoParagrafo.textContent = "Muito alto, tente novamente.";
            tentativas_perdidas--;
        } else {
            resultadoParagrafo.textContent = "Muito baixo, tente novamente.";
            tentativas_perdidas--;
        }

        // Verifica se o usuário excedeu o número máximo de tentativas
        if (tentativas_perdidas == 0) {
            resultadoParagrafo.textContent = "Suas tentativas acabaram. O número correto era " + num_aleatorio + ".";
            resetarBtn.style.display = "block";
            tentativas.style.display = "none";
        }

        tentativas.textContent = tentativas_perdidas;

        // Limpa o campo de texto
        adivinharInput.value = "";
    }
});

function resetarJogo() {
    dificuldadeSelect.value = "";
    resultadoParagrafo.textContent = "";

    dificuldadeSection.style.display = "flex";
    jogoSection.style.display = "none";
    adivinharSection.style.display = "none"
    resetarBtn.style.display = "none";
}

resetarBtn.addEventListener("click", resetarJogo);