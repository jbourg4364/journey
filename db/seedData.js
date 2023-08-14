const client = require('./client');
const { createUser } = require('./users');


async function dropTables() {
    console.log('Dropping tables...');
    try {
        await client.query(`
        DROP TABLE IF EXISTS users;
        `);
    } catch (error) {
        throw error;
    }
};

async function createTables() {
    console.log('Creating tables...');
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
        )
        `);
        console.log('Finished creating tables...');
    } catch (error) {
        throw error;
    }
};

async function createInitialUsers() {
    console.log('Creating initial users...');
    try {
        const pendingUsers = [
            {
                username: 'test123',
                password: 'testPassword123',
                firstname: 'First',
                lastname: 'Last',
                email: 'testUser@gmail.com'
            }
        ];

        const users = await Promise.all(pendingUsers.map(createUser));

        console.log('Users created:', users);
    } catch (error) {
        console.error('Error creating initial users');
    }
};

async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.error('Error during rebuildDB');
        throw error;
    }
};


module.exports = {
    rebuildDB
};