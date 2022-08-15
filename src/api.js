const api = 'https://bakesaleforgood.com/api';

export const fetchInitDeals = () => {
    return fetch(`${api}/deals`)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
};
export const fetchDeal = (id) => {
    return fetch(`${api}/deals/${id}`)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
};
export const searchDeal = (term) => {
    return fetch(`${api}/deals?searchTerm=${term}`)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
};