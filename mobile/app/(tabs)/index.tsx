import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from 'react-native';
import { useRef } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LoginForm } from '@/components/loginform';
import SidebarMenu from '@/components/SidebarMenu';

const paymentOptions = [
  { name: 'Pix', source: require('@/assets/images/pix.png') },
  { name: 'Transferência', source: require('@/assets/images/transferencia.png') },
  { name: 'Boleto', source: require('@/assets/images/boleto.png') },
  { name: 'Cartão', source: require('@/assets/images/cartao.png') },
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SidebarMenu />

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/logo_banco_virtual.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">BEM VINDO AO SEU BANCO!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Faça login para ter acesso à sua conta:</ThemedText>
          <LoginForm />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Tipos de pagamento:</ThemedText>

          <View style={styles.paymentOptionsContainer}>
            {paymentOptions.map((option, index) => (
              <AnimatedButton key={index} source={option.source} />
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Cartão de crédito</ThemedText>
          <ThemedText type="subtitle">Fatura atual:</ThemedText>

          <ThemedView style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}></Text>

            <View style={styles.topLine}></View>

            <View style={styles.balanceBox}>
              <Text style={styles.balanceAmount}>R$ 3.500,00</Text>
            </View>

            <View style={styles.bottomLine}></View>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </View>
  );
}

// Componente de botão animado
function AnimatedButton({ source }: { source: any }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverIn = () => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      style={{ margin: 10 }}
    >
      <Animated.View style={[styles.circleButton, { transform: [{ scale }] }]}>
        <Image source={source} style={styles.paymentImage} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  balanceContainer: {
    alignItems: 'flex-start',
    marginTop: 16,
    gap: 8,
    width: '100%',
    paddingLeft: 20,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balanceBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  topLine: {
    width: '60%',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    marginTop: 8,
  },
  bottomLine: {
    width: '60%',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 8,
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingVertical: 12,
  },
  circleButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});


