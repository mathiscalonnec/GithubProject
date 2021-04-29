import React from "react";
import { SafeAreaView, TextInput, FlatList, Text, StyleSheet } from "react-native";
import { grey100 } from "react-native-paper/lib/typescript/styles/colors";
import ApiRequest from "./../api/Call-GitHub"

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.users = [
            {
            id: '1',
            name: 'Patrick jean',
            },
            {
            id: '2',
            name: 'Johan leNG',
            },
            {
            id: '3',
            name: 'jeremy quem',
            },
        ];
        this.state = {
            inputText: "",
        }
    }
  
     callUser = async (text) => {
        if (text.length > 2) {
            await ApiRequest.getInfoUser(text).then(data => {
                console.log (data)
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
            <FlatList
            data={this.users}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <Text style={{ fontSize: 22 }}>
                {item.id} - {item.name}
            </Text>
            )}
            />
    
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
       color: 'grey'
    }
 })