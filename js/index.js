class API{

    static getItem(id){
        const column = read().find(column => column.id == id);
        //se a coluna estiver vazia
        if(!column){
            return[];
        }
        return column.item;
    }

    static addItem(id,item,responsavel){
        const data = read();
        const column = read().find(column => column.id == id);
        const element = {id,item,responsavel};
        
        column.item.push(element);
        save(data);
    
        return element;
    }

}

function read(){
    const json = localStorage.getItem("kanban");
    //Verifica se o json está vazio
    if(!json){
        return [
            {
                id: 1,
                item: []

            },
            {
                id: 2,
                item: []

            },
            {
                id: 3,
                item: []

            }
        ];
    }
    return JSON.parse(json);
}

function save(data){
    localStorage.setItem("kanban",JSON.stringify(data));
}


console.log(API.getItem(1));
console.log(API.addItem(2,"Criando Kanban","Ana Flávia"));