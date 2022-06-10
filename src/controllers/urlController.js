import db from  '../db.js';
import { nanoid } from 'nanoid';

export async function shortUrl(req, res) {
    const {url} = req.body;
    const userId = res.locals.user.id;

    const shortUrl = nanoid(8);

    try {
        await db.query(`
        INSERT INTO
        urls ("userId", url, "shortUrl")
        VALUES ($1, $2, $3)
        `, [userId, url, shortUrl]);

        res.status(201).send({shortUrl: shortUrl});

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUrlById(req, res) {
    const {id} = req.params;

    try {
        const { rows: urls } = await db.query('SELECT id, "shortUrl", url FROM urls WHERE id=$1', [id])
        const [url] = urls;

        if (!url) return res.sendStatus(404);

        res.status(200).send(url);

    } catch (error) {
        res.status(500).send(error);
    }
}