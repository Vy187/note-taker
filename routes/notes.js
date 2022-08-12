const notes = require(`express`).Router();
const { v4: uuidv4 } = require('uuid');
const fs = require(`fs`);

notes.get(`/`, (req, res) => { fs.readFile(`./db/db.json`, `utf8`, (err, data) =>  (err) ? console.error(err) : res.json(JSON.parse(data)) ) })

notes.post(`/`, (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4()
    }

    fs.readFile(`./db/db.json`, `utf8`, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile(`./db/db.json`, JSON.stringify(parsedData), (err) => {
                if(err) {
                    console.error(err);
                } else {
                    console.info(`\nData written to ./db/db.json`);
                    res.json(`Note added successfully`);
                }
            })
        }
    })
})

notes.delete(`/:id`, (req, res) => {
    const noteId = req.params.id;
    fs.readFile(`db/db.json`, `utf8`, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            const result = parsedData.filter((note) => note.id !== noteId);
            fs.writeFile(`./db/db.json`, JSON.stringify(result), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.info(`\nData wiritten to ./db/db.json`);
                    res.json(`Item ${noteId} deleted successfully`)
                }
            })
        }
    })
})

module.exports = notes;