import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.API_URL || ''}/api/v1.0.0`,
});
