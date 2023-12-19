const formulario = window.document.getElementById("formulario");
const imgAprovado = `<img src="images/aprovado.png" />`;
const imgReprovado = `<img src="images/reprovado.png" />`;
var linhas = {};

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nomeAtividade = document.getElementById("nomeAtividade");
  const notaAtividade = document.getElementById("notaAtividade");

  // Verificar se a atividade já existe na tabela
  if (linhas[nomeAtividade.value]) {
    alert("Atividade com mesmo nome já existe. Escolha outro nome.");
    return;
  }

  // Criação da linha HTML
  var linha = `<tr>`;
  linha += `<td>${nomeAtividade.value}</td>`;
  linha += `<td>${notaAtividade.value}</td>`;
  linha += `<td>${notaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`;
  linha += `</tr>`;

  // Adiciona a linha à tabela e ao objeto de controle
  linhas[nomeAtividade.value] = linha;
  document.getElementById("tbody").innerHTML = Object.values(linhas).join("");

  // Limpa os campos do formulário após adicionar a linha
  nomeAtividade.value = "";
  notaAtividade.value = "";

  // Recalcula e exibe a média final
  calcularMediaFinal();
});

function calcularMediaFinal() {
  // Obtenha todas as linhas da tabela
  var linhasTabela = document.querySelectorAll("#tbody tr");

  // Inicialize as variáveis
  var somaNotas = 0;
  var numeroNotas = 0;

  // Percorra as linhas da tabela
  linhasTabela.forEach(function (linha) {
    var nota = parseFloat(linha.cells[1].textContent);

    // Verifique se a nota é um número válido
    if (!isNaN(nota)) {
      somaNotas += nota;
      numeroNotas++;
    }
  });

  // Calcule a média final
  var mediaFinal = numeroNotas > 0 ? somaNotas / numeroNotas : 0;

  // Atualize a célula de média final na tabela
  document.querySelector("tfoot td:nth-child(2)").textContent =
    mediaFinal.toFixed(2);

  // Atualize a aprovação/reprovação
  var resultado = document.querySelector(".resultado");
  resultado.textContent = mediaFinal >= 7 ? "Aprovado" : "Reprovado";
  resultado.style.background = mediaFinal >= 7 ? "#009432" : "#ff0000";
}
