import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';


const DetailScreen = ({ navigation }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'MALE',
    departement: 'IT',
    image: '',
  });

  // Fungsi untuk menangani perubahan pada TextInput
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData, // Menyalin nilai sebelumnya
      [key]: value, // Mengupdate nilai berdasarkan kunci (key)
    });
    console.log(formData);
  };

  // Fungsi untuk menangani penyimpanan data
  const handleSave = async () => {
    const emailRegex = /^[^\s@]+@[^\d\s@]+\.[^\d\s@]+$/;
    if (!formData.name || !formData.email || !formData.gender || !formData.departement || !formData.image) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      Alert.alert("Validasi Gagal", "Email tidak valid. Masukkan email yang benar.");
      return;
    }

    const apiUrl = 'https://mam-api-6e353e4d80e7.herokuapp.com/users';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Mengubah data ke format JSON
      });

      const data = await response.json(); // Mengubah response ke JSON
      console.log('Response:', data);

      Alert.alert('Sukses', 'Data berhasil disimpan!');
      navigation.navigate("List");

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Gagal menambah data');
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, marginTop: 10 }}>
      {/* Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={style.ButtonAdd}>
          <Text style={style.TextButtonAdd}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.ButtonList} onPress={() => navigation.goBack()}>
          <Text style={style.TextButtonList}>List</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ marginBottom: 15 }}>
          <Text style={style.LabelText}>Name</Text>
          <TextInput style={style.InputText} value={formData.name} onChangeText={(value) => handleInputChange('name', value)}></TextInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={style.LabelText}>Email</Text>
          <TextInput placeholder='example@gmail.com' style={style.InputText} value={formData.email} onChangeText={(value) => handleInputChange('email', value)}></TextInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={style.LabelText}>Gender</Text>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
            style={style.picker}
          >
            <Picker.Item label="MALE" value="MALE" />
            <Picker.Item label="FEMALE" value="FEMALE" />
          </Picker>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={style.LabelText}>Departement</Text>
          <Picker
            selectedValue={formData.departement}
            onValueChange={(itemValue) => handleInputChange('departement', itemValue)}
            style={style.picker}
          >
            <Picker.Item label="IT" value="IT" />
            <Picker.Item label="HSE" value="HSE" />
            <Picker.Item label="HRGA" value="HRGA" />
            <Picker.Item label="PRODUKSI" value="PRODUKSI" />
            <Picker.Item label="PLAN" value="PLAN" />
          </Picker>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={style.LabelText}>Image URL</Text>
          <TextInput style={style.InputText} value={formData.image} onChangeText={(value) => handleInputChange('image', value)}></TextInput>
        </View>
        
        <TouchableOpacity style={style.ButtonSave} onPress={handleSave}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}>Tambah</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
  
  
const style = StyleSheet.create({
  ButtonAdd: {
    width: '48%',
    backgroundColor: '#029cf5',
    padding: 10,
    borderRadius: 10,
    elevation: 3
  },
  ButtonList: {
    width: '48%',
    backgroundColor: '#a3a3a3',
    borderColor: '#a3a3a3',
    borderWidth: 2,
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
  picker: {
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e0e0e0'
  },
  LabelText: {
    fontWeight: 500,
    marginBottom: 3,
    fontSize: 15
  },
  InputText: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  ButtonSave: {
    backgroundColor: '#029cf5',
    padding: 12,
    borderRadius: 5
  }
});

export default DetailScreen;