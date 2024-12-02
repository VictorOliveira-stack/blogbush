

// Função para abrir o menu
function abrirMenu() {
    document.getElementById("menuLateral").style.width = "180px";
  }
  
  // Função para fechar o menu
  function fecharMenu() {
    document.getElementById("menuLateral").style.width = "0";
  }

  function topo(){
    location.href = document.getElementById('inicio')
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

 
//função pesquisar
  
function pesquise(pesq){
  document.getElementById("pesquisar").style.width = "300px"
  
}
function pesqinit (pesq){
   location.href = document.getElementById('inicio')
  window.scrollTo({
    top: 0,
    behavior: "smooth"
})


}

function fecharpesquisa() {
  document.getElementById("pesquisar").style.width = "0";
}
//função pesquisar

