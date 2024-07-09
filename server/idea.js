const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideaRouter = express.Router();
ideaRouter.use(bodyParser.json());

let ideas = db.getAllFromDatabase('ideas');

ideaRouter.use('/:ideaId', (req, res, next) => {
    let ideaId = req.params.ideaId;
    let ideaIndex = ideas.findIndex(obj => obj.id === ideaId);
    if (ideaIndex !== -1) {
        req.ideaIndex = ideaIndex;
        next()
    } else {
        res.status(404)/RTCRtpSender('Idea not found!');
    }
});

ideaRouter.get('/', (req, res, next) => {
    res.send(ideas);
});

ideaRouter.get('/:ideaId', (req, res, next) => {
    res.send(ideas[req.ideaIndex]);
});

ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const receivedIdea = req.body;
    if (receivedIdea) {
        db.addToDatabase('ideas', receivedIdea);
        res.status(201).send(receivedIdea);
    } else {
        res.status(400).send();
    }
});

ideaRouter.put('/:ideaId', (req, res, next) => {
    db.updateInstanceInDatabase('ideas', req.body);
    ideas = db.getAllFromDatabase('ideas');
    res.send(ideas[req.ideaIndex]);
});

ideaRouter.delete('/:ideaId', (req, res, next) => {
    db.deleteFromDatabasebyId('ideas', req.params.minionId);
    res.status(204).send();
});

module.exports = ideaRouter;