const note = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

note.get('/api/notes', (req, res) =>
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))
);

note.post('/api/notes', (req, res) => {
    const { title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, 'db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.join(response);
    } else {
        res.join('Error posting note');
    }
});

module.exports = note;