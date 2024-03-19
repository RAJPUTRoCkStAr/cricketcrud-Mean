const express = require("express");
const router = express.Router();
const playerModel = require('./db/model');

// Add Records
router.post('/player/create', async (req, res) => {
    try {
        const player = new playerModel(req.body);
        await player.validate(); // Validate the input data

        await player.save();
        res.status(201).send({
            status: true,
            message: "Player Created!"
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

// View Records
router.get('/players', async (req, res) => {
    try {
        const players = await playerModel.find({});
        res.send(players);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Find a single player record
router.get('/players/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const player = await playerModel.findById(_id);

        if (!player) {
            return res.status(404).send();
        }

        return res.status(200).send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update records
router.patch('/players/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedPlayer = await playerModel.findByIdAndUpdate(_id, body, { new: true });

        if (!updatedPlayer) {
            return res.status(404).send();
        }

        res.status(201).send({
            status: true,
            message: "Player Updated!"
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete records
router.delete('/players/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedPlayer = await playerModel.findByIdAndDelete(_id);

        if (!deletedPlayer) {
            return res.status(404).send();
        }

        res.status(201).send({
            status: true,
            message: "Player Deleted!"
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
