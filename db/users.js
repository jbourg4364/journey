const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;


async function createUser({
    username,
    password,
    firstname,
    lastname,
    email,
    children
}) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, firstname, lastname, email, children)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [username, hashedPassword, firstname, lastname, email, children]);

        return {
            id: user.id,
            username: user.username,
            password: hashedPassword
        };
    } catch (error) {
        throw error;
    }
};

async function getUserById(Id) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE id = $1;
        `, [Id]);

        return user;
    } catch (error) {
        throw error;
    }
};

async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1;
        `, [username]);

        return user;
    } catch (error) {
        throw error;
    }
};

async function getUser({ username, password }) {
    try {
        const user = await getUserByUsername(username);

        if (!user) {
            return null;
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return {
                id: user.id,
                username: user.username
            };
        } else {
            return null;
        };
    } catch (error) {
        throw error;
    }
};

async function updateStatus(currentStatus, userId) {
    const { rows: [user] } = await client.query(`
    UPDATE users
    SET status = $1
    WHERE id = $2;
    `, [currentStatus, userId]);

    return user;
};

async function getStatus(userId) {
    const { rows: [status] } = await client.query(`
    SELECT status FROM users
    WHERE id = $1;
    `, [userId]);

    return status;
};


module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    getUser,
    updateStatus,
    getStatus
};