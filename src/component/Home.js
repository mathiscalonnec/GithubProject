import React from "react";
import { SafeAreaView,
         TextInput,
         FlatList,
         Text, 
         StyleSheet, 
         Image,
         View,
         TouchableOpacity,
         ActivityIndicator
        } from "react-native";
import ApiRequest from "./../api/Call-GitHub"
import RepositoriesSearch from "./RepositoriesSearch";



export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputText: "",
            users: [],
            repoOrUser: false,
            NbUser: 20,
        }
    }

    Item (item) {
        return (
          <View style={styles.listItem}>
            <Image source={{uri:item.avatar_url}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:20, color:"#EBE7E6"}}>{item.login}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center", alignItems:"center"}} onPress={() => this.props.navigation.navigate("User", {data:item})}>
              <Text style={{color:"#F07167"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }

     callUser = async () => {
        if (this.state.inputText.length > 2) {
            await ApiRequest.getInfoUser(this.state.inputText, this.state.NbUser).then(data => {
                this.setState({users: data})
            })
        }
    };

    DisplayUser = () => {
      return (
        <View>
          <TextInput
          style={styles.input}
          placeholderTextColor = "#F07167"
          
          onSubmitEditing={()=>this.callUser()}
          onChangeText={(text) => this.setState({inputText: text})}
          placeholder=" Search User"
          keyboardType="default"
          />
          <View>
            <FlatList
            data={this.state.users}
            contentContainerStyle={{paddingBottom: 90}}
            keyExtractor={item => item.id}
            renderItem= {(item) => this.Item(item.item)}
            />  
          </View>
        </View>
      )
    }

    displayRepoOrUser = () => {
      if (this.state.repoOrUser === false ) {
        return(this.DisplayUser());
      } else {
        return(<RepositoriesSearch/>)
      }

    }

        
    render () {
        return (
          <SafeAreaView style={styles.background}>
            <TouchableOpacity style={styles.repositoryButton} onPress={() => this.setState({repoOrUser: true})}>
              <Text style={{color:"#F07167"}}>Repositories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.repositoryButton2} onPress={() => this.setState({repoOrUser: false})}>
              <Text style={{color:"#F07167"}}>User</Text>
            </TouchableOpacity>
            {this.displayRepoOrUser()}
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    background: {
      backgroundColor: '#294C60',
      flex:1
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: "#F07167",
       borderWidth: 2,
       borderRadius:17,
       color:"#F07167",
       paddingLeft:20
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
      repositoryButton:{
        height:40,
        width:100,
        marginTop: 10,
        marginLeft:280,
        borderRadius:17,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'grey',
      },
      repositoryButton2:{
        height:40,
        width:100,
        marginTop: -41,
        marginLeft: 30,
        borderRadius:17,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'grey',
      }
 })