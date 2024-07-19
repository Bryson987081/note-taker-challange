const note = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

note.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.join(JSON.parse(data)))
);

note.post('/', (req, res) => {
    const { title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.join(response);
    } else {
        res.join('Error postin note');
    }
});

module.exports = note;