
//https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

type Config = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

export function clientApi(endpoint: string, customConfig: Config = {}) {
    const config = {
        method: 'GET',
        ...customConfig
    }

    return fetch(`${process.env.API_URL}/api/${endpoint}`, config)
        .then(async response => {
            if (!response.ok) {
                const errorMessage = await response.text()
                return Promise.reject(new Error(errorMessage))
            }

            return await response.json()
        })
}