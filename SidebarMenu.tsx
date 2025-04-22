import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const toggleSidebar = () => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH - 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <>
      {/* Botão de menu flutuando no canto superior direito */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Barra lateral animada */}
      {isOpen && (
        <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Início</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Perfil</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Configurações</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Sair</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 135,
    right: 16,
    zIndex: 999,
  },
  menuButton: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
  },
  menuText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 185, // abaixo do botão
    width: 200,
    height: 'auto', // ajusta à altura dos itens
    backgroundColor: '#003366',
    paddingHorizontal: 17,
    paddingBottom: 20,
    zIndex: 1000,
    alignItems: 'center',

  },
  item: {
    paddingVertical: 30,
  },
  itemText: {
    color: 'white',
    fontSize: 18  ,
    textAlign: 'center',

  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff44',
    marginVertical: 4,
    width: '100%',

  },
});
