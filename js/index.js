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
        return this.responsavel;
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


let array_boards= new Array();
let array_implementacao= new Array();
let array_testes = new Array();

let coluna_projeto = document.querySelector("#projeto");
let coluna_implementacao = document.querySelector('#implementacao');

let item_projeto = document.querySelector("#item_projeto");
let responsavel_projeto = document.querySelector("#responsavel_projeto");

let id_projeto = 0;
let input_responsavel = "";


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

function geraBoardProjetos(projeto){
    console.log("entrei")
    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item_input");
    div_item.setAttribute("id", "item_input_"+projeto.getStatus()+projeto.getCodigos());
    let todo = document.createElement("h6");
    todo.appendChild(document.createTextNode("TODO"));
    let input_item = document.createElement("input");
    input_item.setAttribute("type","text");
    input_item.setAttribute("class","topico projeto_item");
    input_item.setAttribute("id","item_"+projeto.getStatus());
    input_item.setAttribute("value",projeto.getItem());
    input_item.setAttribute("onchange","addItem"+projeto.getStatus()+"(this,"+projeto.getCodigos()+","+projeto.getStatus()+")");
    input_item.setAttribute("placeholder","Tarefa");
    input_responsavel = document.createElement("input");
    input_responsavel.setAttribute("type","text");
    input_responsavel.setAttribute("class","topico responsavel");
    input_responsavel.setAttribute("id","responsavel_"+projeto.getStatus());
    input_responsavel.setAttribute("value",projeto.getResponsavel());
    input_responsavel.setAttribute("onchange","addResponsavel"+projeto.getStatus()+"(this)");
    input_responsavel.setAttribute("placeholder","Responsável");

    let delete_item = document.createElement("span");
    delete_item.setAttribute("class","material-symbols-outlined lixeira");
    delete_item.appendChild(document.createTextNode("delete"));
    delete_item.setAttribute("onclick","delete_projeto(this.parentNode, "+projeto.getStatus()+")");
    
    div_item.appendChild(todo);
    div_item.appendChild(input_item);
    div_item.appendChild(input_responsavel);
    div_item.appendChild(delete_item);

    let div_dropzone = document.createElement("div");
    div_dropzone.setAttribute("class","dropzone");

    coluna_projeto.appendChild(div_item);
    coluna_projeto.appendChild(div_dropzone);
}

function delete_projeto(item,coluna){
    let coluna_delete = document.getElementById(coluna.id);
    coluna_delete.removeChild(item);
}

let board = new Board();
function addItemprojeto(item,id,status){
    
    let aux = document.querySelector("#responsavel_projeto");
    board.setCodigos(id);
    board.setItem(item.value);
    board.setStatus(status.id);
    input_responsavel.removeAttribute("disabled");
    aux.addEventListener("onchange",addResponsavelprojeto);
}
// LOCAL STORAGE ESTÁ SALVANDO SEM ITEM E SEM RESPONSÁVEL
function addResponsavelprojeto(responsavel){
    board.setResponsavel(responsavel.value);
    console.log(board.getItem());

    if(localStorage.boards){
        array_boards = JSON.parse(localStorage.getItem('boards'));
    }
    array_boards.push(board);
    localStorage.boards = JSON.stringify(array_boards);
}

coluna_projeto.addEventListener("load", readBoardProjeto);

function readBoardProjeto(e){
    console.log("entrando na função")
    if(localStorage.boards){
        array_boards = JSON.parse(localStorage.getItem('boards'));
        console.log("entrei no localstorage" + array_boards);
        array_boards.forEach(element => {
            let novo_board = new Board();
            console.log("Element: "+element.item);
            novo_board.setCodigos(element.id);
            novo_board.setItem(element.item);
            novo_board.setResponsavel(element.responsavel);
            novo_board.setStatus(element.status);
            console.log(novo_board.getStatus());
            if(novo_board.getStatus() == "projeto"){
                geraBoardProjetos(novo_board);
            }
        });
        }

    
}








