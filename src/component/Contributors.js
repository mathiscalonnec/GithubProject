import React from "react";
import { SafeAreaView,
         FlatList,
         Text, 
         StyleSheet, 
         Image,
         View,
         TouchableOpacity
        } from "react-native";

import ApiRequest from "./../api/Call-GitHub"


export default class Contributors extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            login: "",
            repoName: "",
            Contributor:""
        }
    }

    Item (item) {
        return (
          <View style={styles.listItem}>
            <Image source={{uri:item.avatar_url}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:20, color:"#EBE7E6"}}>{item.login}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center", alignItems:"center"}} onPress={() => this.props.navigation.navigate("User", {data:item.login})}>
              <Text style={{color:"#F07167"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }


    async componentDidMount() {
        await ApiRequest.getContributorsUser(this.props.route.params.data.owner.login ,this.props.route.params.data.name).then(data => {
            this.setState({Contributor: data})
        })

    }
        
    render () {
        return (
        <SafeAreaView style={styles.background}>
            <View>
              <FlatList
              data={this.state.Contributor}
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