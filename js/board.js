export default class Board{
    codigos;
    constructor(id, item,responsavel, status){
        this.id = id;
        this.item = item;
        this.responsavel = responsavel;
        this.status = status;
    }
    constructor(id){
        this.setCodigos(id);
    }
    constructor(){}

    getCodigos(){
        return codigos;
    }
    setCodigos(id){
        this.codigos.push(id);
    }
    setItem(item){
        this.item = item;
    }
    getItem(){
        return this.item;
    }
    setResponsavel(responsavel){
        this.responsavel = responsave;
    }
    setStatus(status){
        this.status = status;
    }

    toString(){
        return "{id: }"+this.id+", item: "+this.item+", responsavel: "+this.responsavel+", Status: "+this.status+"}";
    }

}