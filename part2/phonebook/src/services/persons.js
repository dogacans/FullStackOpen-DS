import axios from "axios"

const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (newObject) => {
    const req = axios.post(baseURL, newObject)
    return req.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
} 

const deleteResource= (id) => {
    return axios.delete(`${baseURL}/${id}`)
} 

const modules = {
    getAll,
    create,
    update,
    deleteResource
}

export default modules