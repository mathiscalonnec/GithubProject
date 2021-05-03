import React from "react";
import { SafeAreaView,
         TextInput,
         FlatList,
         Text, 
         StyleSheet, 
         Image,
         View,
         TouchableOpacity
        } from "react-native";


import { grey100 } from "react-native-paper/lib/typescript/styles/colors";
import ApiRequest from "./../api/Call-GitHub"


export default class Followers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            login: this.props.route.params.data,
            Followers:""
        }
    }

    Item (item) {
        return (
          <View style={styles.listItem}>
            <Image source={{uri:item.avatar_url}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:20}}>{item.login}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center", alignItems:"center"}} onPress={() => this.props.navigation.navigate("User", {data:item})}>
              <Text style={{color:"#7a42f4"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }


    async componentDidMount() {
                await ApiRequest.getFollowersUser(this.state.login).then(data => {
                    this.setState({Followers: data})
                })
            }
        
    render () {
        return (
        <SafeAreaView>
            <View>
            <FlatList
            data={this.state.Followers}
            keyExtractor={item => item.id}
            renderItem= {(item) => this.Item(item.item) }
            />  
            </View>
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:20
      }
 })