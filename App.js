import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from "expo-contacts"

export default function App() {
  const [data, setData] = useState([])

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.PhoneNumbers] })
      setData(data)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList style={{ flex: 3, marginTop: 50 }}
      data={data}
      renderItem={({item}) => {
        return <Text>{item.name} {item.phoneNumbers[0].number}</Text>
      }}
      keyExtractor={item => item.id}/>
      <Button style={{ flex: 1, paddingBottom: 5 }} onPress={getContacts} title="Get Contacts" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
