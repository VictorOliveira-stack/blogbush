/*function pesquisa(){
    const valorPesquisa = document.getElementById('pesquisaiten').value

    if (valorPesquisa.trim() === ""){
        alert("Por favor insira uma pesquisa!")
        return;
    }

    const respostaPesquisa = document.getElementById("respostaPesquisa")
    respostaPesquisa.innerHTML = `Você pesquisou por <strong>${valorPesquisa}</strong>`
}
*/

function pesquise(){
    document.getElementById("pesquisar").style.width = "300px"
}

function fecharpesquisa() {
  

    document.getElementById("pesquisar").style.width = "0";
  }
