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

export default class Issues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Issues:""
        }
    }

    Item (item) {
        return (
          <View style={styles.listItem}>
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{marginTop:10, fontSize:16, color:"#EBE7E6"}}>{item.title}</Text>
              <Text style={{marginTop:25, fontSize:18, color:"#EBE7E6"}}> Status : {item.state}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, marginTop:50, justifyContent:"center", alignItems:"center"}} onPress={() => this.props.navigation.navigate("Issue", {data:item})}>
              <Text style={{color:"#F07167"}}>More</Text>
            </TouchableOpacity>
          </View>
        );
      }

    async componentDidMount() {
        await ApiRequest.getIssuesUser(this.props.route.params.data.owner.login ,this.props.route.params.data.name).then(data => {
            this.setState({Issues: data})
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.titleProject}> {this.props.route.params.data.name} </Text>
                    <View style={styles.header2}>
                        <Text style={styles.userName}> {this.props.route.params.data.owner.login} </Text>
                    </View>
                </View>
                <View>
                    <FlatList
                    data={this.state.Issues}
                    keyExtractor={item => item.id}
                    renderItem= {(item) => this.Item(item.item) }
                    />  
                </View>            
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#294C60',
        flex:1
    },
    header:{
        backgroundColor: "#001B2E",
        height:120,
        alignItems: "center",
    },
    header2:{        
        justifyContent: "flex-end",
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