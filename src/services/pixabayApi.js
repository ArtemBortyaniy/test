import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34616553-8cb9dbb490290e4b0963e806d';

export async function pixabayApi(queryParam, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${queryParam}&page=${page}&per_page=12`
    );

    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
