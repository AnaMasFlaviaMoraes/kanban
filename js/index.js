// function read(){
//     const json = localStorage.getItem("kanban");
//     //Verifica se o json está vazio
//     if(!json){
//         return
//     }
//     return JSON.parse(json);
// }

// function save(data){
//     localStorage.setItem("kanban",JSON.stringify(data));
// }

let array_projetos = new Array();
let array_implementacao= new Array();
let array_testes = new Array();

let coluna_projeto = document.querySelector('#projeto');
let coluna_implementacao = document.querySelector('#implementacao');

let item_projeto = document.querySelector("#item_projeto");
let responsavel_projeto = document.querySelector("#responsavel_projeto");

// let add_item_projeto = document.querySelector('#add_projeto').addEventListener("click", (e) =>{
//     e.preventDefault();
//     console.log(responsavel_projeto.value);
//     console.log(item_projeto.value);
//     if(localStorage.hasOwnProperty("projetos")){
//         array_projetos = JSON.parse(localStorage.getItem("projetos"));
//     }
//     array_projetos.push(item_projeto.value, responsavel_projeto.value);
//     localStorage.setItem("projetos", JSON.stringify(array_projetos));
// });

function geraBoard(coluna){
    console.log(coluna.id);
    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item_input");
    let todo = document.createElement("h6");
    todo.appendChild(document.createTextNode("TODO"));
    let input_item = document.createElement("input");
    input_item.setAttribute("type","text");
    input_item.setAttribute("class","topico projeto_item");
    input_item.setAttribute("placeholder","Tarefa");
    let input_responsavel = document.createElement("input");
    input_responsavel.setAttribute("type","text");
    input_responsavel.setAttribute("class","topico responsavel");
    input_responsavel.setAttribute("placeholder","Responsável");

    let delete_item = document.createElement("span");
    delete_item.setAttribute("class","material-symbols-outlined lixeira");
    delete_item.appendChild(document.createTextNode("delete"));
    delete_item.setAttribute("onclick","delete_projeto(this.parentNode, "+coluna.id+")");
    
    div_item.appendChild(todo);
    div_item.appendChild(input_item);
    div_item.appendChild(input_responsavel);
    div_item.appendChild(delete_item);

    let div_dropzone = document.createElement("div");
    div_dropzone.setAttribute("class","dropzone");

    coluna.appendChild(div_item);
    coluna.appendChild(div_dropzone);
}

function delete_projeto(item,coluna){
    let coluna_delete = document.getElementById(coluna.id);
    coluna_delete.removeChild(item);
}

