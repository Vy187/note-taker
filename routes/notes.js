const notes = require(`express`).Router();
const noteData = require(`../db/db.json`);
const { v4: uuidv4 } = require('uuid');

notes.get(`/`, (req, res) => res.json(noteData));

notes.get(`/:notes_title`, (req, res) => { res.json(noteData) })

module.exports = notes;