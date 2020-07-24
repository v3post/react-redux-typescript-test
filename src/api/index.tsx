import axios from 'axios'

export default axios.create({
  baseURL: 'https://my-json-server.typicode.com/aero-frontend/test-task/',
  responseType: 'json'
});