//#1. Dependencies
const path = require("path");
const router = require("express").Router();
const store = require("../db/store");


//#2. Routing

    //get method -gets from data base 

      router.get("/notes", function(req, res) {
          store
            .getNotes()
            .then((notes => res.json(notes))
            .catch(err => res.status(500).json(err));

      });

    //post method -posts to data base 

      router.post("/notes", (req, res) => {
        store
          .addNotes(req.body)
          .then((note) => res.json(note))
          .catch(err => res.status(500).json(err));

    });
    
    //delete method -deletes from data base 

    router.delete("/notes/:id", function(req, res) {
        store
          .deleteNotes(req.params.id)
          .then(() => res.json({ok:true}))
          .catch(err => res.status(500).json(err));

    });

    module.exports = router;