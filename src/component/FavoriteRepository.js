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

import userStorage from "./userStorage";


import ApiRequest from "../api/Call-GitHub"


export default class FavoriteRepository extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users : []
        }
    }

    async componentDidMount() {
        let array = await userStorage.getItem('repository')
        this.setState({repositories: array.data})

    }

    Item (item) {
        return (
          <View style={styles.listItem}>
            <Image source={{uri:item.avatar_url}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:20, color:"#EBE7E6"}}>{item.repo}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center", alignItems:"center"}} 
            onPress={async () => {
              this.props.navigation.navigate("Repository", {data:item})}}>
              <Text style={{color:"#F07167"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }

        
    render () {
        console.log("logg", this.state.repositories)

        return (
        <SafeAreaView style={styles.background}>
            <View>
              <FlatList
              data={this.state.repositories}
              keyExtractor={(item, index) => index}
              renderItem= {(item, index) => this.Item(item.item) }
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

  listItem:{
    margin:10,
    padding:10,
    backgroundColor:'#5A7C90',
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:20
 }
})