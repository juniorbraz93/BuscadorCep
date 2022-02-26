/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';

import api from './src/services/api';
import Colors from './src/config/Colors';

const App = () => {
  const [cep, setCep] = useState('');
  const [valorCep, setValorCep]: any = useState(null);
  const inputRef = useRef(null);

  async function buscar() {
    if (cep === '') {
      Alert.alert('Digite um CEP valido.');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json/`);
      // console.log(response.data);
      Keyboard.dismiss();
      setValorCep(response.data);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  function limpar() {
    setCep('');
    setValorCep(null);
    inputRef.current.focus();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewDigitarCep}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="EX:.29136082"
          value={cep}
          onChangeText={index => setCep(index)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btnBuscar} onPress={buscar}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLimpar} onPress={limpar}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {valorCep && (
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {valorCep.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {valorCep.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {valorCep.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {valorCep.localidade}</Text>
          <Text style={styles.itemText}>Estado: {valorCep.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewDigitarCep: {
    alignItems: 'center',
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  btnArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  btnBuscar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.blue,
  },
  btnLimpar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.red,
  },
  btnText: {
    fontSize: 18,
    color: Colors.white,
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
  },
});

export default App;
