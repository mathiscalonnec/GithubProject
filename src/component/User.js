import React from "react";
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, FlatList,
         View,
         ScrollView} from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import ApiRequest from "../api/Call-GitHub"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userStorage from "./userStorage";


export default class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.route.params.data,
            picture: ".",
            type: "",
            followers: "",
            url_followers: "",
            description: "",
            repo: [],
            iconColour : ""

        }
    }


    Item (item) {
        return (
          <View style={styles.listItem}>
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:20, color:"#EBE7E6"}}>{item.name}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center", alignItems:"center"}} onPress={() => this.props.navigation.navigate("Repository", {data:item})}>
              <Text style={{color:"#F07167"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }


    async CallAPI(){
        console.log("premier consol", this.props.route.params.data)
        await ApiRequest.getUser(this.props.route.params.data).then(data => {
            this.setState({picture: data.avatar_url})
            this.setState({type: data.type})
            this.setState({followers: data.followers})
            this.setState({url_followers: data.followers_url})
            this.setState({description: data.bio})

        })
        await ApiRequest.getRepoUser(this.props.route.params.data).then(data => {
            this.setState({repo: data})
        })

    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.CallAPI()
            this.setState({user: this.props.route.params.data})
        });
        const color = await userStorage.isFavorite('user', this.props.route.params.data)
        this.setState({iconColour: color})
    }

    render () {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}></View>
            <Image
                style={styles.logo}
                source={{uri:this.state.picture}}
            />
            <Text style={styles.userName}> {this.state.user}</Text>
            <TouchableOpacity  style={styles.userFollowers} onPress={() =>this.props.navigation.navigate("Followers", {data:this.state.user})}>
                <Text style={{ fontSize: 15, color:"#EBE7E6"}} > Followers {this.state.followers} </Text>
            </TouchableOpacity>

            <Icon
            style={styles.heartIcon}
            size={26}
            color= {this.state.iconColour}
            name="heart"
            onPress={() => {
                if (this.state.iconColour === "white") {
                    this.setState(  {iconColour : "red"})
                    userStorage.saveItem(this.state.user, "user")
                    console.log("add : ", this.state.user)
                } else {
                    userStorage.removeItem("user", this.state.user)
                    this.setState({iconColour: "white"})

                }
            }
                
                }/>


            <Text style={styles.userType}> {this.state.type} </Text>
            <View style={styles.blockDescription}>
                <Text style={styles.userDescription} numberOfLines={3}> {this.state.description} </Text>    
            </View>

                <FlatList
                    contentContainerStyle={{
                        paddingTop: 20,
                        paddingBottom: 10 }}
                    data={this.state.repo}
                    keyExtractor={item => item.id}
                    renderItem= {(item) => this.Item(item.item)}
                />
        </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    header:{
        backgroundColor: "#001B2E",
        height:120,
      },
    container:{
        flex: 1,
        backgroundColor: '#294C60',
    },
    userName:{
        marginTop: -160,
        marginLeft: 20,
        color: '#F07167',
        fontSize: 18,
    },
    userFollowers:{
        fontSize: 15,
        marginTop: -21,
        marginLeft: 280,
        color:"#EBE7E6"
    },
    userType:{
        color:"#EBE7E6",
        marginTop: 30,
        marginLeft: 280,

    },
    userDescription:{
        color: '#EBE7E6',
        marginTop: 3,
        marginLeft: 5,

    },
    blockDescription:{
        backgroundColor:'#5A7C90',
        marginTop: 100,
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth:10,
        borderColor: '#294C60',
        height: 80,
    },

    logo: {
        marginTop: -70,
        alignSelf: 'center',
        borderRadius: 80,
        borderColor: '#294C60',
        borderWidth:5,
        marginLeft: 5,
        width: 130,
        height: 130,
    },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:'#5A7C90',
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:20
      },
    heartIcon:{
        margin:20,
        padding:10
    }
    

  });