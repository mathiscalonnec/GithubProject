
import AsyncStorage from "@react-native-async-storage/async-storage"

export default class userStorage {

    static saveRepo = async (username, reponame, type) => {
       
        let value = await this.getItem(type)
        let pair = {user:username, repo:reponame}

        if (value.data !== null) {
            let tab = value.data
            tab.push(pair)
            try {
                await AsyncStorage.setItem(
                    type,
                    JSON.stringify(tab)
                );
            } catch (error) {
                console.log(error.message)
            }
        } else {
            const myArray = []
            myArray.push(pair)
            try {
                await AsyncStorage.setItem(
                    type,
                    JSON.stringify(myArray)
                    );
            } catch (error) {
                console.log(error.message)
            }

        }
   
    };




    static saveItem = async (username, type) => {
        let value = await this.getItem(type)
        if (value.data !== null) {
            const tab = value.data
            tab.push(username)
            try {
                await AsyncStorage.setItem(
                    type,
                    JSON.stringify(tab)
                );
            } catch (error) {
                console.log(error.message)
            }
        } else {
            const myArray = []
            myArray.push(username)
            try {
                await AsyncStorage.setItem(
                    type,
                    JSON.stringify(myArray)
                    );
            } catch (error) {
                console.log(error.message)
            }

        }
   
    };
    

    static getItem = async (item) => {
        try {
        const value = await AsyncStorage.getItem(item)
        let data = JSON.parse(value)
        return {data}
        }
        catch(error) {
        console.log(error.message)
        return(null)
        }
    }

    static removeItem = async (item, name) => {
        let value = await this.getItem(item)

        if (value.data !== null) {
            let tab = value.data
            let ind = null

            if(item === "user")
                ind = tab.indexOf(name)
            else 
                ind = tab.findIndex(element => element.repo === name)
           if (ind != -1)
                tab.splice(ind, 1)
            try {
                await AsyncStorage.setItem(
                    item,
                    JSON.stringify(tab)
                );
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    static isFavorite = async(item, name) => {
        let value = await this.getItem(item)
        let found = null

        if(value.data === null)
            return ("white")
        if (item === "user")
            found = value.data.find(element => element === name)
        else
            found = value.data.find(element => element.repo === name)
        if (found === undefined)
            return ("white")
        else
            return ("red")
    }

}