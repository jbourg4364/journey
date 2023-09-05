const client = require('./client');

async function getAllCarlineParents() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM users
        WHERE status = 'In line';
    `);
    

        return rows;

    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    };
};

module.exports = { getAllCarlineParents }