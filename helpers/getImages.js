const axios = require('axios');
const { API_KEY, BASE_URL } = process.env;
const maxItems = 10;

module.exports = getImages = async (page, category) => {
  const endpoint = `${BASE_URL}?per_page=${maxItems}&page=${page}&query=${category}&client_id=${API_KEY}`;
  const { data } = await axios.get(endpoint);
  if (!Number(page) || Number(page) > data.total_pages)
    throw new Error('Not Found.');
  return data;
};
