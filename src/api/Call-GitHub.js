import Axios from 'axios'

export default class ApiRequest {

    static async getInfoUser(name, per_page) {
        return await Axios.get(`https://api.github.com/search/users?q=${name}&per_page=${per_page}`, {
            params: {
                accept: 'accept'
            }
          })
        .then((response) => {
            return (response.data.items)
        })
        .catch((error) => {
            return ("undefined")
        })
    }

    static async getRepositories(name, per_page) {
        return await Axios.get(`https://api.github.com/search/repositories?q=${name}&per_page=${per_page}`, {
            params: {
                accept: 'accept'
            }
          })
        .then((response) => {
            return (response.data.items)
        })
        .catch((error) => {
            return ("undefined")
        })
    }

    static async getRepoUser(name) {
        return await Axios.get(`https://api.github.com/users/${name}/repos`, {
          })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            return (error.response)
        })
    }

    static async getFollowersUser(name) {
        return await Axios.get(`https://api.github.com/users/${name}/followers`, {
          })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            return (error.response)
        })
    }

    static async getContributorsUser(name, repo) {
        return await Axios.get(`https://api.github.com/repos/${name}/${repo}/contributors`, {
          })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            return (error.response)
        })
    }

    static async getIssuesUser(name, repo) {
        return await Axios.get(`https://api.github.com/repos/${name}/${repo}/issues`, {
          })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            return (error.response)
        })
    }

    static async getUser(name) {
        return await Axios.get(`https://api.github.com/users/${name}`, {
          })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            return (error.response)
        })
    }

    static async getRepo(name, repo) {
        return await Axios.get(`https://api.github.com/repos/${name}/${repo}`, {
          })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            return (error.response)
        })
    }

};
