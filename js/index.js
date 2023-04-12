// ===================================== CLASS BOARD ====================================
class Board{
    constructor(){}

    getId(){
        return this.id;
    }
    setId(id){
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

class Projeto extends Board{}

class Implementacao extends Board{}

class Teste extends Board{}

// ===================================== CLASS BOARD ====================================

let coluna_projeto = document.querySelector("#projeto");
let coluna_implementacao = document.querySelector('#implementacao');
let coluna_teste = document.querySelector("#testes");

let popup_sucesso = document.querySelector("#popup");
let popup_delete = document.querySelector("#popup_delete");

let item_projeto = document.querySelector("#item_projeto");
let responsavel_projeto = document.querySelector("#responsavel_projeto");

let id_projeto = 0;
let input_responsavel = "";

const draggables = document.querySelectorAll("item_input");
const droppables = document.querySelectorAll("dropzone");

//Cria um novo board
function geraBoard(coluna){
    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item_input");
    div_item.setAttribute("draggable","true");
    div_item.setAttribute("id", "item_input_"+coluna.id+"_"+id_projeto);
    id_projeto++;
    let todo = document.createElement("h6");
    todo.appendChild(document.createTextNode("TODO"));
    let input_item = document.createElement("input");
    input_item.setAttribute("type","text");
    input_item.setAttribute("class","topico projeto_item");
    input_item.setAttribute("id","item_"+coluna.id);
    input_item.setAttribute("onchange","addItem(this,"+id_projeto+","+coluna.id+")");
    input_item.setAttribute("placeholder","Tarefa");
    input_responsavel = document.createElement("input");
    input_responsavel.setAttribute("type","text");
    input_responsavel.setAttribute("class","topico responsavel");
    input_responsavel.setAttribute("id","responsavel_"+coluna.id);
    input_responsavel.setAttribute("disabled","true");
    input_responsavel.setAttribute("onchange","addResponsavel(this)");
    input_responsavel.setAttribute("placeholder","Responsável");

    let delete_item = document.createElement("span");
    delete_item.setAttribute("class","material-symbols-outlined lixeira");
    delete_item.appendChild(document.createTextNode("delete"));
    delete_item.setAttribute("onclick","delete_projeto(this.parentNode, "+id_projeto+","+coluna.id+")");
    
    div_item.appendChild(todo);
    div_item.appendChild(input_item);
    div_item.appendChild(input_responsavel);
    div_item.appendChild(delete_item);

    let div_dropzone = document.createElement("div");
    div_dropzone.setAttribute("class","dropzone");

    div_item.addEventListener("dragstart", () => {
        div_item.classList.add("is-dragging");
    });
    div_item.addEventListener("dragend", () => {
        div_item.classList.remove("is-dragging");
    });

    coluna.appendChild(div_item);
    coluna.appendChild(div_dropzone);
    
    coluna.addEventListener("dragover",(e)=>{
        e.preventDefault();
        const item_dragging = document.querySelector(".is-dragging");
        coluna.appendChild(item_dragging);
    });

}

// Constroí um board para cada item salvo no LocalStorage
function readSavedBoards(item_board){
    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item_input");
    div_item.setAttribute("draggable","true");
    div_item.setAttribute("id", "item_input_"+item_board.getStatus()+"_"+item_board.getId());
    let todo = document.createElement("h6");
    todo.appendChild(document.createTextNode("TODO"));
    let input_item = document.createElement("input");
    input_item.setAttribute("type","text");
    input_item.setAttribute("class","topico projeto_item");
    input_item.setAttribute("id","item_"+item_board.getStatus());
    input_item.setAttribute("value",item_board.getItem());
    input_item.setAttribute("onchange","addItem(this,"+item_board.getId()+","+item_board.getStatus()+")");
    input_item.setAttribute("placeholder","Tarefa");
    input_responsavel = document.createElement("input");
    input_responsavel.setAttribute("type","text");
    input_responsavel.setAttribute("class","topico responsavel");
    input_responsavel.setAttribute("id","responsavel_"+item_board.getStatus());
    input_responsavel.setAttribute("value",item_board.getResponsavel());
    input_responsavel.setAttribute("onchange","addResponsavel(this)");
    input_responsavel.setAttribute("placeholder","Responsável");

    let delete_item = document.createElement("span");
    delete_item.setAttribute("class","material-symbols-outlined lixeira");
    delete_item.appendChild(document.createTextNode("delete"));
    delete_item.setAttribute("onclick","delete_projeto(this.parentNode, "+item_board.getId()+","+item_board.getStatus()+")");
    
    div_item.appendChild(todo);
    div_item.appendChild(input_item);
    div_item.appendChild(input_responsavel);
    div_item.appendChild(delete_item);

    div_item.addEventListener("dragstart", () => {
        div_item.classList.add("is-dragging");
    });
    div_item.addEventListener("dragend", () => {
        div_item.classList.remove("is-dragging");
    });

    let div_dropzone = document.createElement("div");
    div_dropzone.setAttribute("class","dropzone");

    if(item_board.getStatus() == "projeto"){
        
        coluna_projeto.appendChild(div_item);
        coluna_projeto.appendChild(div_dropzone);
        coluna_projeto.addEventListener("dragover",(e)=>{
            e.preventDefault();
            const item_dragging = document.querySelector(".is-dragging");
            let coluna_original = item_dragging.id.split("_");
            let board_drag = new Projeto();
            array_boards.forEach(element => {
                if(element.id == coluna_original[3]){
                    board_drag.setId(element.id);
                    board_drag.setItem(element.item);
                    board_drag.setResponsavel(element.responsavel);
                    board_drag.setStatus("projeto");
                    array_boards = array_boards.filter((item)=> item.id !== (board_drag.getId()))
                    localStorage.clear();
                    array_boards.push(board_drag);
                    localStorage.boards = JSON.stringify(array_boards);
                }
            });
            coluna_projeto.appendChild(item_dragging);
            window.location.href="../pages/index.html";
        });
    }

    if(item_board.getStatus() == "implementacao"){
        coluna_implementacao.appendChild(div_item);
        coluna_implementacao.appendChild(div_dropzone);
        coluna_implementacao.addEventListener("dragover",(e)=>{
            e.preventDefault();
            const item_dragging = document.querySelector(".is-dragging");
            let coluna_original = item_dragging.id.split("_");
            let board_drag = new Implementacao();
            array_boards.forEach(element => {
                if(element.id == coluna_original[3]){
                    board_drag.setId(element.id);
                    board_drag.setItem(element.item);
                    board_drag.setResponsavel(element.responsavel);
                    board_drag.setStatus("implementacao");
                    array_boards = array_boards.filter((item)=> item.id !== (board_drag.getId()))
                    localStorage.clear();
                    array_boards.push(board_drag);
                    localStorage.boards = JSON.stringify(array_boards);
                }
            });
            coluna_implementacao.appendChild(item_dragging);
            window.location.href="../pages/index.html";
        });
    }

    if(item_board.getStatus() == "testes"){
        coluna_teste.appendChild(div_item);
        coluna_teste.appendChild(div_dropzone);
        coluna_teste.addEventListener("dragover",(e)=>{
            e.preventDefault();
            const item_dragging = document.querySelector(".is-dragging");
            let coluna_original = item_dragging.id.split("_");
            let board_drag = new Teste();
            array_boards.forEach(element => {
                if(element.id == coluna_original[3]){
                    board_drag.setId(element.id);
                    board_drag.setItem(element.item);
                    board_drag.setResponsavel(element.responsavel);
                    board_drag.setStatus("testes");
                    array_boards = array_boards.filter((item)=> item.id !== (board_drag.getId()))
                    localStorage.clear();
                    array_boards.push(board_drag);
                    localStorage.boards = JSON.stringify(array_boards);
                }
            });
            coluna_teste.appendChild(item_dragging);
            window.location.href="../pages/index.html";
        });
    }

    id_projeto = item_board.getId();   

    
    
}
let board_apagar;
function delete_projeto(item,id_board,coluna){
    let coluna_delete = document.getElementById(coluna.id);
    if(item.childNodes[1].value == ""){
        // não faz nada
    }else{
        array_boards.forEach(element => {
            if(element.id == id_board){
                if(coluna.id == "projeto"){
                    board_apagar = new Projeto();
                }
                if(coluna.id == "implementacao"){
                    board_apagar = new Implementacao();
                }
                if(coluna.id == "testes"){
                    console.log("passei aqui");
                    board_apagar = new Teste();
                }
                board_apagar.setId(element.id);
                board_apagar.setItem(element.item);
                board_apagar.setResponsavel(element.responsavel);
                board_apagar.setStatus(element.status);
            }
        });
        if(array_boards == null){
            //não faz nada
        }else{
            array_boards = array_boards.filter((item)=> item.id !== (board_apagar.getId()))
            localStorage.clear();
            localStorage.boards = JSON.stringify(array_boards);
        }
    }
    coluna_delete.removeChild(item);
}

let board;
function addItem(item,id,status){
    if(status.id == "projeto"){
        console.log("entrei no projeto");
        board = new Projeto();
    }
    if(status.id == "implementacao"){
        board = new Implementacao();
    }
    if(status.id == "testes"){
        board = new Teste();
    }
    
    let aux = document.querySelector("#responsavel_projeto");
    board.setId(id);
    board.setItem(item.value);
    board.setStatus(status.id);
    input_responsavel.removeAttribute("disabled");
    input_responsavel.setAttribute("required",true);
    aux.addEventListener("onchange",addResponsavel);
}

let array_boards = new Array();

function addResponsavel(responsavel){
    board.setResponsavel(responsavel.value);
    if(board.getResponsavel()!="" && board.getItem()!=""){
        array_boards.push(board);
        localStorage.boards = JSON.stringify(array_boards);
        window.location.href="../pages/index.html";
    }
}

coluna_projeto.addEventListener("load", readBoardProjeto);

function readBoardProjeto(){
    if(localStorage.boards){
        array_boards = JSON.parse(localStorage.getItem('boards'));
        array_boards.forEach(element => {
            let novo_board;
            if(element.status == "projeto"){
                novo_board = new Projeto();
            }
            if(element.status == "implementacao"){
                novo_board = new Implementacao();
            }
            if(element.status == "testes"){
                novo_board = new Teste();
            }

            novo_board.setId(element.id);
            novo_board.setItem(element.item);
            novo_board.setResponsavel(element.responsavel);
            novo_board.setStatus(element.status);
            readSavedBoards(novo_board);
        });
    }  
}
// Salvando dados no LocalStorage
let button_save = document.querySelector("#saveItem");
button_save.addEventListener("click",()=>{
    if(board== null){
        board = new Board();
    }
    if((board.getItem()!="") && (board.getResponsavel()=="")){
        board.setResponsavel("");
        array_boards.push(board);
    }
    array_boards.forEach(element => {
        if(element.item==""){
            array_boards = array_boards.filter((item)=> item.id !== element.id);
        }
    });
    
    localStorage.boards = JSON.stringify(array_boards);
    popup_sucesso.style.display = "block";
    setTimeout(() => {
        popup_sucesso.style.display = "none";
    }, 3000);
});

//Apagando todas as informações do LocalStorage
let button_deleteAll = document.querySelector("#deleteItem");
button_deleteAll.addEventListener("click",()=>{
    localStorage.clear();
    popup_delete.style.display = "block";
    setTimeout(() => {
        popup_delete.style.display = "none";
        window.location.href = '../pages/index.html'
    }, 3000);
});









