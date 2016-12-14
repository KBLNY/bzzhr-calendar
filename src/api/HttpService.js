/**
 * This constant defines the Header "application/json"
 */
const ApplicationJson = 'application/json';

/**
 * This constant defines the HTTP Methods
 */
const HttpMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};


/**
 * This is a helper to do a GET HTTP request
 * @param {string} url The url of the GET query 
 * @return {Promise} A Promise
 */
export function doGet(url) {
    return fetch(url, {
        method: HttpMethod.GET,
        headers: {
            'Accept': ApplicationJson
        }
    })
    .then(response => checkStatus(response))
    .then(response => checkBodyAsJson(response))
}

/**
 * This is a helper method in order to check if the status of the response is a "Success" (HTTP Code 2xx)
 * @param {Response} response The response to check
 * @return {Response} The response is returned if its HTTP code is between 200 (included) and 300 (excluded)
 * @throws {Error} An Error containing the error raised
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        // Here We are turning off Error handling to be allowed to
        // augment its properties with the response attribute.
        const error = new Error(response.statusText);
        // Augmenting error attributes with the response attribute.
        error.response = response;
        
        throw error;
    }
}

/**
 * This is a helper method in order to check if the JSON return by the request is not a server error
 * @param {Response} response The response to check
 * @return {Promise} The Promise of the request
 * @throws {Error} An Error containing the error raised
 */
function checkBodyAsJson(response) {
    return (
        response.json().then(responseBody => {
            if (!responseBody.hasOwnProperty("error")) {
                return responseBody;
            } else {
                // Here We are turning off Error handling to be allowed to
                // augment its properties with the response attribute.
                const error = new Error(responseBody.message);
                // Augmenting error attributes with the response attribute.
                error.response = response;

                throw error;
            }
        })
    );
};
