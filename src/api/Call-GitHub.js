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

};