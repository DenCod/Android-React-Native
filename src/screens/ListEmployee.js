// import React from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, TouchableHighlight, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const API_ALL_USERS = 'https://mam-api-6e353e4d80e7.herokuapp.com/users'; 
const API__SEARCH = 'https://mam-api-6e353e4d80e7.herokuapp.com/users?name='; 

const HomeScreen = ({ navigation }) => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Memanggil API saat komponen dimuat
    fetch(API_ALL_USERS)
      .then((response) => response.json())  // Mengubah response menjadi JSON
      .then((data) => {
        setEmployees(data.data);  // Menyimpan data ke state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [name, setName] = useState('');

  const handleSearchSubmit = () => {
      // Memanggil API saat komponen dimuat
      fetch(API__SEARCH + name)
        .then((response) => response.json())  // Mengubah response menjadi JSON
        .then((data) => {
          setEmployees(data.data);  // Menyimpan data ke state
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  };

  const handleDelete = async (value) => {
    const apiUrl = 'https://mam-api-6e353e4d80e7.herokuapp.com/users/' + value;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Hapus data dari state
        const data = employees.filter((item) => item.id !== value);
        setEmployees(data);
  
        Alert.alert('Sukses', `Data berhasil dihapus.`);
      } else {
        Alert.alert('Error', 'Gagal menghapus data.');
      }
  
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Gagal menghapus data');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 10 }}>
      {/* Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={style.ButtonAdd} onPress={() => navigation.navigate("Create")} >
          <Text style={style.TextButtonAdd}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.ButtonList} title="List Karyawan">
          <Text style={style.TextButtonList}>List</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={{ marginBottom: 20 }}>
        <TextInput placeholder="Search By Name" style={style.SearchInput} onChangeText={text => setName(text)} onSubmitEditing={handleSearchSubmit}></TextInput>
      </View>

      {/* List Employee */}
      <FlatList 
        data={employees}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={ style.CardEmployee }>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <View>
              <Image source={{ uri: item.image }} style={style.ImageEmployee} />
            </View>
            <View>
              <Text style={{ fontSize: 15 }}>{ item.name } ({item.gender})</Text>
              <Text style={{ fontSize: 12 }}>{item.departement} - {item.email}</Text>
            </View>
          </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableHighlight onPress={() => navigation.navigate("Update", { employee : item.id })}>
                <Image source={require('../pencil.png')} style={style.IconEditDelete} />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => handleDelete(item.id)}>
                <Image source={require('../bin.png')} style={style.IconEditDelete} />
              </TouchableHighlight>
            </View>
          </View>
        )}
      />
    </View>
  );
};


const style = StyleSheet.create({
  ButtonAdd: {
    width: '48%',
    backgroundColor: '#a3a3a3',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#a3a3a3',
    elevation: 3
  },
  ButtonList: {
    width: '48%',
    backgroundColor: '#029cf5',
    padding: 10,
    borderRadius: 10,
    elevation: 3
  },
  TextButtonAdd: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 500,
    color: 'white'
  },
  TextButtonList: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 500,
    color: 'white'
  },
  SearchInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#cccccc',
    paddingLeft: 10
  },
  CardEmployee: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    marginBottom:15
  },
  ImageEmployee: {
    width: 70,
    height: 70,
    borderRadius: 5
  },
  IconEditDelete: {
    width: 20,
    height: 20
  }
});

export default HomeScreen;