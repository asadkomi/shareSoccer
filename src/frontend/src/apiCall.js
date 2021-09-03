import fetch from 'unfetch'

const checkStatus = response => {
    if (response.ok) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error)
}
export const getAllPlayers = () => {
    return fetch("api/v1/players")
        .then(checkStatus);
}

export const addPlayer = player => {
    return fetch("api/v1/players", {
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(player)
    }).then(checkStatus)
}

export const deletePlayer = playerId => {
    return fetch(`api/v1/players/${playerId}`, {
        method: 'DELETE'
    }).then(checkStatus)

}
