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



export default class Home extends React.Component {

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
            <Image source={{uri:item.avatar_url}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:20, color:"#EBE7E6"}}>{item.login}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center", alignItems:"center"}} onPress={() => this.props.navigation.navigate("Repository", {data:item})}>
              <Text style={{color:"#F07167"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }
  
     callUser = async (text) => {
        if (text.length > 2) {
            await ApiRequest.getInfoUser(text, 100).then(data => {
                this.setState({users: data})
            })
        }
    };

        
    render () {
        return (
        <SafeAreaView style={styles.background}>

            <TouchableOpacity style={styles.repositoryButton} onPress={() => this.props.navigation.navigate("Repositories")}>
              <Text style={{color:"#F07167"}}>Repositories</Text>
            </TouchableOpacity>

            <TextInput
            style={styles.input}
            placeholderTextColor = "#F07167"

            onSubmitEditing={()=>this.callUser(this.state.inputText)}
            onChangeText={(text) => this.setState({inputText: text})}
            placeholder=" Search User"
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