const client = require('./client');

async function insertPickedUp(parentId, children) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO picked_up("parentId", "allChildren")
        VALUES($1, $2)
        RETURNING *;
        `, [parentId, children]);

        return user;
    } catch (error) {
        console.error('Error inserting into picked up table', error)
    }
};

async function getAllPickedUp() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM picked_up;
        `);

        return rows;
    } catch (error) {
        console.error('Error getting all picked up students', error)
    }
};

async function clearPickedUpTable() {
    try {
        await client.query(`
        DELETE FROM picked_up;
        `);
        console.log('Picked up table cleared successfully');
    } catch (error) {
        console.error('Error clearing picked up table', error);
    }
}

module.exports = { insertPickedUp, getAllPickedUp, clearPickedUpTable };