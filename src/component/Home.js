import React from "react";
import { SafeAreaView, TextInput, FlatList, Text } from "react-native";
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
            onSubmitEditing={()=>this.callUser(this.state.inputText)}
            onChangeText={(text) => this.setState({inputText: text})}
            placeholder="Search User"
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