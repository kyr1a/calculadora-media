const form = document.getElementById("form-atividade");
let linhas = "";
const svgAprovado = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" alt="Aprovado">
              <path fill="rgb(6, 55, 19)" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7 3.414L11.914 6.5L10.5 5.086L7 8.586l-1.5-1.5L4.086 8.5z" />
            </svg>`;
const svgReprovado = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" alt="Reprovado"><path fill="rgb(55, 6, 14)" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-1.414l-2-2L4.586 6l2 2l-2 2L6 11.414l2-2l2 2L11.414 10l-2-2l2-2L10 4.586z"/></svg>`;
const atividades = [];
const notas = [];
const spanAprovado = `<span class="resultado aprovado">Aprovado</span>`;
const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`;
const notaMinima = parseFloat(prompt("Digite a nota mínima para aprovação: "));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

const addLinha = () => {
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");

  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade "${inputNomeAtividade.value}" já foi inserida`);
  }

  atividades.push(inputNomeAtividade.value);
  notas.push(parseFloat(inputNotaAtividade.value));

  let linha = "<tr>";
  linha += `<td>${inputNomeAtividade.value}</td>`;
  linha += `<td>${inputNotaAtividade.value}</td>`;
  linha += `<td>${
    inputNotaAtividade.value >= notaMinima ? svgAprovado : svgReprovado
  }</td>`;
  linha += "</tr>";

  linhas += linha;

  inputNomeAtividade.value = "";
  inputNotaAtividade.value = "";
};

const atualizaTabela = () => {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas;
};

const atualizaMediaFinal = () => {
  const mediaFinal = calculaMediaFinal();

  document.getElementById("media-final-valor").innerHTML = mediaFinal;
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
};

const calculaMediaFinal = () => {
  let somaDasNotas = 0;
  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }

  return Math.round((somaDasNotas / notas.length) * 10) / 10;
};
