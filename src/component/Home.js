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



export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputText: "",
            users: []
        }
    }

    Item (item) {
        console.log(item.login)
        return (
          <View style={styles.listItem}>
              {/* <Text style={{fontWeight:"bold"}}>{item.login}</Text> */}
            <Image source={{uri:item.avatar_url}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:20}}>{item.login}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"#7a42f4"}}>More</Text>
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
        <SafeAreaView>
            <TextInput
            style={styles.input}
            placeholderTextColor = "#9a73ef"

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
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 2,
       borderRadius:17,
       color: 'grey',
       paddingLeft:20
    },
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