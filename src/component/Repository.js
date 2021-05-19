import React from "react";
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList,
    View,
    ScrollView,
    Button} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userStorage from "./userStorage";


export default class Repository extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: "",
            projectName: "",
            fork: "",
            description: "",
            size: "",
            defaultBranchName: "",
            private: "",
            iconColour : ""

        }
    }

    async componentDidMount() {
        console.log("data------lololol", this.props.route.params.data)
        let calldata = await userStorage.isFavorite('repository', this.props.route.params.data.user, this.props.route.params.data.repo)
        console.log("call data------lololol", calldata)

        this.setState({user: this.props.route.params.data.owner.login})
        this.setState({projectName: this.props.route.params.data.name})
        this.setState({description: this.props.route.params.data.description})
        this.setState({size: this.props.route.params.data.size})
        this.setState({private: this.props.route.params.data.private})
        this.setState({defaultBranchName: this.props.route.params.data.default_branch})
        if (this.props.route.params.data.fork === false)
            this.setState({fork: "false"})
        else if (this.props.route.params.data.fork === true)
            this.setState({fork: "true"})
        else
            this.setState({fork: "NULL"})
        const color = await userStorage.isFavorite('repository', this.props.route.params.data.name)
        this.setState({iconColour: color})
    
    }

    render () {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleProject}> {this.state.projectName} </Text>
                    <View style={styles.header2}>
                    <Text style={styles.userName}> {this.state.user} </Text>
                    </View>
                </View>
                    <Icon
                        style={styles.heartIcon}
                        size={26}
                        color= {this.state.iconColour}
                        name="heart"
                        onPress={() => {
                            if (this.state.iconColour === "white") {
                                this.setState(  {iconColour : "red"})
                                userStorage.saveRepo(this.state.user, this.state.projectName, "repository")
                                let value = userStorage.getItem("repository")
                                
                            } else {
                                userStorage.removeItem("repository", this.state.projectName)
                                this.setState({iconColour: "white"})

                            }
                        }
                    }   
                   />

                <View style={styles.blockDescription}>
                    <Text style={styles.repoDescription}> {this.state.description} </Text>    
                </View>
                <View style={{alignItems:"center",flex:1}}>
                    <Text style={styles.infoRepo}> Fork: {this.state.fork} </Text>
                    <Text style={styles.infoRepo}> Size: {this.state.size} </Text>
                    <Text style={styles.infoRepo}> Default branch: {this.state.defaultBranchName} </Text>
                </View>
                <View style={styles.alignButton}>
                    <TouchableOpacity style={styles.repositoryButton} onPress={() => this.props.navigation.navigate("Issues", {data:this.props.route.params.data})}>
                        <Text style={styles.bottomButton}>Issues</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.repositoryButton} onPress={() => this.props.navigation.navigate("Contributors", {data:this.props.route.params.data})}>
                        <Text style={styles.bottomButton}>Contributors</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#294C60',
    },
    header:{
        backgroundColor: "#001B2E",
        height:120,
        alignItems: "center",
    },
    header2:{        
        justifyContent: "flex-end",
    },
    alignButton:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 50,
    },
    titleProject:{
        color: '#F07167',
        fontSize: 30,
        marginTop: 20,
    },
    userName:{
        fontSize: 15,
        marginTop: 30,
        color: 'grey',
    },
    repoDescription:{
        color: '#EBE7E6',
        marginTop: 3,
        marginLeft: 5,

    },
    blockDescription:{
        backgroundColor:'#5A7C90',
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth:10,
        borderColor: '#294C60',
        height: 80,
    },
    infoRepo: {
        fontSize: 20,
        marginBottom: 3,
        color:"#EBE7E6",
    },
    repositoryButton:{
        height:50,
        width:140,
        borderRadius:17,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#001B2E',
    },
    bottomButton:{
        color:"#F07167",
        fontSize: 20
    },
    heartIcon:{
        margin:20,
        padding:10
    }
})