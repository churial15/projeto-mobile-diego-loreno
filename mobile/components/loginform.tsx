import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // ícone de erro

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUserError, setShowUserError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const [errorPosition, setErrorPosition] = useState<'user' | 'pass'>('user'); // Inicia a posição do erro como 'user'

  const userAnim = useRef(new Animated.Value(0)).current;
  const passAnim = useRef(new Animated.Value(0)).current;

  const showError = (animRef: Animated.Value, setShow: (v: boolean) => void, position: 'user' | 'pass') => {
    setShow(true);
    setErrorPosition(position); // Atualiza a posição do erro para o campo correto
    Animated.timing(animRef, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const hideError = (animRef: Animated.Value, setShow: (v: boolean) => void) => {
    Animated.timing(animRef, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => setShow(false));
  };

  const onLogin = () => {
    let valid = true;

    // Verifica se o campo email está vazio e exibe a mensagem de erro
    if (!username.trim()) {
      showError(userAnim, setShowUserError, 'user');
      valid = false;
    } else if (!password.trim() && username.trim()) {
      // Depois de preencher o email, verifica a senha
      showError(passAnim, setShowPassError, 'pass');
      valid = false;
    }

    if (valid) {
      // Lógica de login aqui
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Usuário"
          value={username}
          onChangeText={(text) => setUsername(text)}
          onFocus={() => hideError(userAnim, setShowUserError)} // Esconde o erro ao focar
          style={styles.input}
        />
        {showUserError && errorPosition === 'user' && (
          <Animated.View style={[styles.tooltip, { opacity: userAnim }]}>
            <MaterialIcons name="error-outline" size={16} color="#fff" />
            <Text style={styles.tooltipText}>Preencha este campo</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => hideError(passAnim, setShowPassError)} // Esconde o erro ao focar
          secureTextEntry
          style={styles.input}
        />
        {showPassError && errorPosition === 'pass' && (
          <Animated.View style={[styles.tooltip, { opacity: passAnim }]}>
            <MaterialIcons name="error-outline" size={16} color="#fff" />
            <Text style={styles.tooltipText}>Preencha este campo</Text>
          </Animated.View>
        )}
      </View>

      <TouchableOpacity style={styles.customButton} onPress={onLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputWrapper: {
    width: '90%',
    maxWidth: 400,
    marginBottom: 10,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  tooltip: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -35 : -30,
    left: 10,
    backgroundColor: '#dc3545',
    padding: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 13,
  },
  customButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
