import React from "react";
import { SafeAreaView, StyleSheet, TextInput, FlatList, Text } from "react-native";

const users = [
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

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search User"
        keyboardType="numeric"
      />
      <FlatList
      data={users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Text style={{ fontSize: 22 }}>
          {item.id} - {item.name}
        </Text>
      )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default UselessTextInput;