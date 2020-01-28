//#1. Dependencies
const util = require("util");
const fs = require("fs");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.readFile);

class Store{
    constructor(){
        this.lastId = 0;

        var file = fs.readFileSync('db/db.json', { encoding: 'utf8' });
        if (file.length > 0) {
            var existingNotes = JSON.parse(file);
            for (let i = 0; i < existingNotes.length; i++) {
                const note = existingNotes[i];
                if (this.lastId < note.id) {
                    this.lastId = note.id;
                }
            }
        }
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

        note.id = this.lastId + 1
         this.lastId = note.id
 
         return this.read()
             .then(notes => {
                 
                 let notesParse = [].concat(JSON.parse(notes))
 
                 notesParse.push(note)
                 console.log(notesParse)
                 this.write(notesParse)
                 return note;
             }) 
    }

    deleteNotes(id){
       
         return this.read()
         .then(notes => {

             notes = [].concat(JSON.parse(notes))
             for (let i = 0; i < notes.length; i++) {
                 const note = notes[i];
                 if (note.id == id) {
                    
                     notes.splice(i, 1)

                     break;
                 }
             }
             this.write(notes)

         })

    }
}

module.exports  = new Store();