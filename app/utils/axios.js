import axios from 'axios';

export default axios.create({
  baseURL: `${process.browser ? '' : process.env.BE_API_URL}/api/v1.0.0`,
});
