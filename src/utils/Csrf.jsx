import axios from 'axios';

const fetchCSRFToken = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/csrf-token/');
  axios.defaults.headers.post['X-CSRFToken'] = response.data.csrfToken;
};

export default fetchCSRFToken;
