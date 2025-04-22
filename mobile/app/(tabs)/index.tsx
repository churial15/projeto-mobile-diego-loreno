import { Image, StyleSheet, Text, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LoginForm } from '@/components/LoginForm';
import SidebarMenu from '@/components/SidebarMenu'; // ✅ Importa o menu lateral

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SidebarMenu /> {/* ✅ Insere o menu lateral aqui */}

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>

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
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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
});

