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
            users: [],
            nbRepo: 20,
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
  
     callUser = async () => {
        if (this.state.inputText.length > 2) {
            await ApiRequest.getRepositories(this.state.inputText, this.state.nbRepo).then(data => {
              if (data != "undefined")
              this.setState({users: data})
          })
        }
    };

    loadNewElem = () => {
      this.setState(
        {
          nbRepo: this.state.nbRepo + 20
        },
        () => {
          this.callUser();
        }
        )
    }

    refreshShearchBar = (text) => {
      this.setState({inputText: text})
      this.setState({nbRepo: 20})
    }
    
    render () {
        return (
        <SafeAreaView style={styles.background}>
            <TextInput
            style={styles.input}
            placeholderTextColor = "#F07167"

            onSubmitEditing={()=>this.callUser(this.state.inputText)}
            onChangeText={(text) => this.refreshShearchBar(text)}
            placeholder=" Search Repository"
            keyboardType="default"
            />
            <View>
            <FlatList
            data={this.state.users}
            keyExtractor={item => item.id}
            renderItem= {(item) => this.Item(item.item)}
            contentContainerStyle={{paddingBottom: 90}}
            onEndReached={() => this.loadNewElem()}
            onEndReachedThreshold={1}
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
      },
      repositoryButton2:{
        height:40,
        width:100,
        marginTop: -41,
        marginLeft:60,
        borderRadius:17,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'grey',
      }
 })