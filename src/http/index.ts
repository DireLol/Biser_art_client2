import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'
//На какой-то запрос или ответ мы можем повесить некоторую самую обычную функцию, которая называется интерцептор
//а интерцептор она потому что как бы перехватывает запрос или ответ 
const $api =axios.create({
    withCredentials:true,
    baseURL: API_URL 
})
$api.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})
export default $api;