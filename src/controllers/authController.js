import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid_v4 } from "uuid";

const SALT_ROUNDS = 10;

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    try {
        const checkEmail = await db.query('SELECT * FROM users WHERE email=$1', [email]);
        if (checkEmail.rowCount > 0) {
            return res.status(409).send('E-mail is already registered.');
        }

        await db.query(
            `INSERT INTO
            users (name, email, password)
            VALUES ($1, $2, $3)
            `, [name, email, hashPassword]
        );

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    const token = uuid_v4();

    try {
        const { rows: users } = await db.query('SELECT * FROM users WHERE email=$1', [email])
        const [user] = users;

        if (!user) return res.status(401).send('E-mail is not registered.');

        if (bcrypt.compareSync(password, user.password)) {
            await db.query(`INSERT INTO
            sessions ("userId", token)
            VALUES ($1, $2)
            `, [user.id, token]);

        return res.status(200).send(token);
        }

        return res.sendStatus(401);

    } catch (error) {
        res.status(500).send(error);
    }
}