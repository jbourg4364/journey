const BASE = 'http://localhost:8080/api';

// deployment
// const BASE = 'api';

export const updateStatus = async (currentStatus, userId) => {
    try {
        const response = await fetch(`${BASE}/users/dashboard/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({currentStatus}),
        });
        
        return response;

    } catch (error) {
        console.error('Error updating status', error);
    }
};

export const getStatus = async (userId) => {
    try {
        const response = await fetch(`${BASE}/users/dashboard/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error getting status', error);
    }
};

export const getAllCarlineParents = async () => {
    try {
        const response = await fetch(`${BASE}/users/carline`);
        const result = await response.json();
 
        return result;
    } catch (error) {
        console.error('Error getting all carline parents', error)
    }
};