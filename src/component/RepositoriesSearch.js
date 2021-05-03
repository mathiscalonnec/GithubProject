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
import ApiRequest from "./../api/Call-GitHub"



export default class RepositoriesSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputText: "",
            users: []
        }
    }

    Item (item) {
        return (
          <View style={styles.listItem}>
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:22, marginLeft:-150, fontFamily:'bold', color:"#EBE7E6"}}>{item.name}</Text>
              <Text style={{marginTop:10, fontSize:16, marginLeft:-100, color:"#EBE7E6"}}>{item.owner.login}</Text>
            </View>
            <TouchableOpacity style={{height:50, width:50, fontSize:20, marginRight: 10, justifyContent:"center", alignItems:"center"}}
                              onPress={() => this.props.navigation.navigate("Repository", {data:item})}>
              <Text style={{color:"#F07167"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }
  
     callUser = async (text) => {
        if (text.length > 2) {
            await ApiRequest.getRepositories(text, 100).then(data => {
                this.setState({users: data})
            })
        }
    };

        
    render () {
        return (
        <SafeAreaView style={styles.background}>

            <TouchableOpacity style={styles.repositoryButton} onPress={() => this.props.navigation.navigate("Home")}>
              <Text style={{color:"#F07167"}}>User</Text>
            </TouchableOpacity>

            <TextInput
            style={styles.input}
            placeholderTextColor = "#F07167"

            onSubmitEditing={()=>this.callUser(this.state.inputText)}
            onChangeText={(text) => this.setState({inputText: text})}
            placeholder=" Search Repository"
            keyboardType="default"
            />
            <View>
            <FlatList
            data={this.state.users}
            keyExtractor={item => item.id}
            renderItem= {(item) => this.Item(item.item) }
            />  
            </View>
          
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
      }
 })