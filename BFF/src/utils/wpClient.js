const fetch = require('node-fetch');

const wpClient = async (query, variables = {}) => {
    const response = await fetch(process.env.WP_GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    if (result.errors) throw new Error(JSON.stringify(result.errors));
    return result.data;
};

module.exports = wpClient;