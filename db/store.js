//#1. Dependencies
const util = require("util");
const fs = require("fs");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.readFile);

class Store{
    constructor(){
        this.lastId = 0;
    }

    read() {
        return readFileAsync("./db.json", "utf8");
    }

    write(note){
        return writeFileAsync("./db.json", JSON.stringify(note));
    }

    getNotes(){
        return this.read().then(notes => {
            let notesParse;

            try {
                notesParse = [].concat(JSON.parse(notes));
            } 
            catch (err) {
                notesParse = [];
            }

            return notesParse;
        })
    }

    addNotes(note){
        ""
    }

    deleteNotes(id){
        ""
    }
}

module.exports  = new Store();