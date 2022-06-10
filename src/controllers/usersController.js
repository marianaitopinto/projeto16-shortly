import db from "../db.js";

export async function getUser(req, res) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    try {
        const { rows: urls } = await db.query('SELECT * FROM users WHERE id=$1', [id])
        const [url] = urls;

        if (!url) return res.sendStatus(404);
        if (Number(id) !== Number(userId)) return res.sendStatus(401);

        const { rows: userInfo } = await db.query(`
        SELECT users.id, users.name, sum(COALESCE(urls.visits, 0)) as "VisitCount" 
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        WHERE users.id = $1
        GROUP BY users.id;
        `, [id]);

        const { rows: userUrls } = await db.query(`
        SELECT id, "shortUrl", url, visits AS "visitCount"
        FROM urls
        WHERE "userId"=$1
        `, [id]);

        const shortenedUrls = userUrls;
        const userResponse = { ...userInfo[0], shortenedUrls };

        res.status(200).send(userResponse);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getRanking(req, res) {

    try {
        const { rows: ranking } = await db.query(`
        SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", sum(COALESCE(urls.visits, 0)) as "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `)

        res.status(200).send(ranking);

    } catch (error) {
        res.status(500).send(error);
    }
}