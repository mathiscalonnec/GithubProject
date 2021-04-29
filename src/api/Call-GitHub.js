import Axios from 'axios'

export default class ApiRequest {

    static async getInfoUser(name) {
        return await Axios.get(`https://api.github.com/users/${name}`)
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