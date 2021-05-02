import React from "react";
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import ApiRequest from "../api/Call-GitHub"

export default class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.route.params.data.login,
            picture: "",
            type: "",
            followers: "",
            url_followers: "",
            description: "",
            repo: []
        }
    }

    async componentDidMount() {
        console.log(this.props.route.params.data)
        await ApiRequest.getUser(this.state.user).then(data => {
            console.log(data)
            this.setState({picture: data.avatar_url})
            this.setState({type: data.type})
            this.setState({followers: data.followers})
            this.setState({url_followers: data.followers_url})
            this.setState({description: data.bio})

        })
        await ApiRequest.getRepoUser(this.state.user).then(data => {
            this.setState({repo: data})
        })
    }

    renderRepo() {
        return (
            <Text>{repo.name}</Text>
        );
    }

    render () {
        return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                source={{uri:this.state.picture}}
            />
            <Text style={styles.userName}> {this.state.user}</Text>
            <TouchableOpacity onPress={() => console.log("le geto")}>
                <Text style={styles.userFollowers}> Number of followers {this.state.followers} </Text>
            </TouchableOpacity>
            <Text style={styles.userDescription}> {this.state.description} </Text>
            <Text style={styles.userDescription}> {this.state.type} </Text>

        </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#191970',
    },
    userName:{
        paddingTop: 10,
        color: '#FF0000',
        fontSize: 20,
    },
    userFollowers:{
        //marginLeft:'auto',
        fontSize: 20,
        color: '#FF0000',
    },
    userDescription:{
        color: '#95A5A6'
    },
    logo: {
        marginTop: 20,
        marginLeft: 5,
        width: 150,
        height: 130,
        borderRadius: 80,
    },
  });