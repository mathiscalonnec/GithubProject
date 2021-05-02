import Axios from 'axios'

export default class ApiRequest {

    static async getInfoUser(name, per_page) {
        return await Axios.get(`https://api.github.com/search/users?q=${name}&per_page=${per_page}`, {
            params: {
                accept: 'accept'
            }
          })
        .then((response) => {
           // console.log("ici",response.data)
            return (response.data.items)
        })
        .catch((error) => {
            //console.log("Err", error.response)
            return (error.response)
        })
    }

    static async getRepoUser(name) {
        return await Axios.get(`https://api.github.com/users/${name}/repos`, {
          })
        .then((response) => {
           // console.log("ici",response.data)
            return (response.data)
        })
        .catch((error) => {
            //console.log("Err", error.response)
            return (error.response)
        })
    }

    static async getFollowersUser(name) {
        return await Axios.get(`https://api.github.com/users/${name}/followers`, {
          })
        .then((response) => {
           // console.log("ici",response.data)
            return (response.data)
        })
        .catch((error) => {
            //console.log("Err", error.response)
            return (error.response)
        })
    }

    static async getUser(name) {
        return await Axios.get(`https://api.github.com/users/${name}`, {
          })
        .then((response) => {
           // console.log("ici",response.data)
            return (response.data)
        })
        .catch((error) => {
            //console.log("Err", error.response)
            return (error.response)
        })
    }
};