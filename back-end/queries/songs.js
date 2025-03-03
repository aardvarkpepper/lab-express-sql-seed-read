const db = require('../db/dbConfig');

const getAllSongs = async (AscDesc = "", IsFavorite = "") => {
    // ORDER BY name ASC/DESC
    // WHERE is_favorite = true/false

    let basequery = `SELECT * FROM songs`;

    //Note:  Order of "if" statements is important.

    if (IsFavorite === "true") {
        basequery += ` WHERE is_favorite = true`;
    } else if (IsFavorite === "false") {
        basequery += ` WHERE is_favorite = false`;
    }

    if (AscDesc === "asc") {
        basequery += ` ORDER BY name ASC`;
    } else if (AscDesc === "desc") {
        basequery += ` ORDER BY name DESC`;
    }

    console.log(basequery);
    try {
        const allSongs = await db.any(basequery);
        return allSongs;
    } catch (error) {
        return error;
    }
};

const getASong = async (id) => {
    try {
        const song = await db.one("SELECT * FROM songs WHERE id=$1", id);
        return song;
    } catch (error) {
        return error;
    }
};

const createSong = async (songToAdd) => {
    try {
        const newSong = await db.one("INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", [songToAdd.name, songToAdd.artist, songToAdd.album, songToAdd.time, songToAdd.is_favorite]);
        return newSong;
    } catch (error) {
        return error;
    }
};

const deleteSong = async (id) => {
    try {
        const deletedSong = await db.one("DELETE FROM songs WHERE id=$1 RETURNING *", id);
        return deletedSong;
    } catch (error) {
        return error;
    }
};

const updateSong = async (id, songToAdd) => {
    try {
        const updatedSong = await db.one(
            "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *", [songToAdd.name, songToAdd.artist, songToAdd.album, songToAdd.time, songToAdd.is_favorite, id]
        );
        return updatedSong;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllSongs,
    getASong,
    createSong,
    deleteSong,
    updateSong
}