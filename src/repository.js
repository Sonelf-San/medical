// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';

// export function getRegularTips () {
//  return axios.get(`${BASE_URL}/users`)
//  .then(response => response.data);
//  }

// export function getSpecialTips () {
//  return axios.get(`${BASE_URL}/users`, { params: { 'token': localStorage.getItem('token')} })
//  .then(response => response.data)
//  .catch(err => Promise.reject('Request Not Authenticated!'));
//  }

// export function login (data) {
//  return axios.post(`${BASE_URL}/api/auth`, { name: data.name, password: data.password })
//  .then(response => {
//  localStorage.setItem('token', response.data.token);
//  localStorage.setItem('token-expiration', Date.now() + 2 * 60 * 60 * 1000);
//  return response.data
//  })
//  .catch(err => Promise.reject('Authentication Failed!'));
//  }

// export function isAuthenticated(){
//  return localStorage.getItem('token') && localStorage.getItem('token-expiration') > Date.now()
//  }