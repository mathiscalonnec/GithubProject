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

export default class Issue extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.titleProject}> {this.props.route.params.data.title} </Text>
                    <Text style={styles.userName}> {this.props.route.params.data.user.login} </Text>
                </View>
                <View>
                    <Text style={{marginTop:25, fontSize:18, color:"#EBE7E6"}}> Status : {this.props.route.params.data.state}</Text>
                </View>
                <View style={styles.blockDescription}>
                    <Text style={styles.issueDescription}> {this.props.route.params.data.body} </Text>    
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
    userName:{
        fontSize: 15,
        marginTop: 30,
        color: 'grey',
    },
    titleProject:{
        color: '#F07167',
        fontSize: 20,
        marginTop: 20,
    },
    issueDescription:{
        color: '#EBE7E6',
        marginTop: 3,
        marginLeft: 5,
    },
    blockDescription:{
        flexBasis: "auto",
        backgroundColor:'#5A7C90',
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth:10,
        borderColor: '#294C60',
        minHeight: 80,
    },
})