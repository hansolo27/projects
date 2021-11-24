import axios from 'axios';
const baseUrl = 'https://devsharp.siisltd.ru/test/api/';

export default {
  getProjects() { 
    return new Promise((resolve, reject) => {
      axios.get(`${baseUrl}projects`)
      .then(response => {
        resolve(response.data);
      }) 
      .catch(err => { 
        if (err.response) { 
          //errorMessage
          reject(err)
        } else if (err.request) { 
          reject(err)
        } else { 
          reject(err) 
        } 
      });
    });
  },
  getFilteredProjects(params) {
    return new Promise((resolve, reject) => {
      axios.get(`${baseUrl}projects`, {
        params
      })
      .then(response => {
        resolve(response.data);
      }) 
      .catch(err => { 
        if (err.response) {
          //errorMessage
          reject(err)
        } else if (err.request) { 
          reject(err)
        } else { 
          reject(err) 
        } 
      });
    });
  }
}