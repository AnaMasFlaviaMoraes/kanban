// ===================================== CLASS BOARD ====================================
let ct = 0;
class Board{
    constructor(){}

    getCodigos(){
        return this.codigos;
    }
    setCodigos(id){
        this.id = id;
    }
    setItem(item){
        this.item = item;
    }
    getItem(){
        return this.item;
    }
    setResponsavel(responsavel){
        this.responsavel = responsavel;
    }
    getResponsavel(){
        return this.getResponsavel;
    }
    setStatus(status){
        this.status = status;
    }
    getStatus(){
        return this.status;
    }

    toString(){
        return "{id: "+this.id+", item: "+this.item.value+", responsavel: "+this.responsavel.value+", Status: "+this.status+"}";
    }

}

// ===================================== CLASS BOARD ====================================


let array_projetos = new Array();
let array_implementacao= new Array();
let array_testes = new Array();

let coluna_projeto = document.querySelector('#projeto');
let coluna_implementacao = document.querySelector('#implementacao');

let item_projeto = document.querySelector("#item_projeto");
let responsavel_projeto = document.querySelector("#responsavel_projeto");

let id_projeto = 0;
let input_responsavel = "";


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
    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item_input");
    div_item.setAttribute("id", "item_input_"+coluna.id+id_projeto);
    id_projeto++;
    let todo = document.createElement("h6");
    todo.appendChild(document.createTextNode("TODO"));
    let input_item = document.createElement("input");
    input_item.setAttribute("type","text");
    input_item.setAttribute("class","topico projeto_item");
    input_item.setAttribute("id","item_"+coluna.id);
    input_item.setAttribute("onchange","addItem"+coluna.id+"(this,"+id_projeto+","+coluna.id+")");
    input_item.setAttribute("placeholder","Tarefa");
    input_responsavel = document.createElement("input");
    input_responsavel.setAttribute("type","text");
    input_responsavel.setAttribute("class","topico responsavel");
    input_responsavel.setAttribute("id","responsavel_"+coluna.id);
    input_responsavel.setAttribute("disabled","true");
    input_responsavel.setAttribute("onchange","addResponsavel"+coluna.id+"(this)");
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

let board = new Board();
function addItemprojeto(item,id,status){
    
    let aux = document.querySelector("#responsavel_projeto");
    board.setCodigos(id);
    board.setItem(item);
    board.setStatus(status.id);
    input_responsavel.removeAttribute("disabled");
    aux.addEventListener("onchange",addResponsavelprojeto);
}
// LOCAL STORAGE ESTÁ SALVANDO SEM ITEM E SEM RESPONSÁVEL
function addResponsavelprojeto(responsavel){
    board.setResponsavel(responsavel);
    console.log(board.toString());
    if(board.getItem() != "" && board.getResponsavel() != null){
        if(localStorage.hasOwnProperty("projetos")){
            array_projetos = JSON.parse(localStorage.getItem("projetos"));
        }
        
        //setando no localstorage
        array_projetos.push(board);
        localStorage.setItem("projetos", JSON.stringify(array_projetos));
    }
}







