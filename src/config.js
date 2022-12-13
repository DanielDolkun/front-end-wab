import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://back-end-wab.adaptable.app/api/',
})
