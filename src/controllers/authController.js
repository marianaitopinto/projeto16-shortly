import db from "../db.js";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 5;

export async function signUp(req, res) {
    const {name, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    try {
        const checkEmail = await db.query('SELECT * FROM users WHERE email=$1', [email]);
        if (checkEmail.rowCount > 0) {
            return res.status(409).send("E-mail is already registered.");
          }

        await db.query(
            `INSERT INTO
            users (name, email, password)
            VALUES ($1, $2, $3)
            `, [name, email, hashPassword]
        );

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
    }
}