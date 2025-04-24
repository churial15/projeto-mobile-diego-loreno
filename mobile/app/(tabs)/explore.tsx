import { StyleSheet, Image, Pressable, Animated, View } from 'react-native';
import React, { useRef } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';
import SidebarMenu from '@/components/SidebarMenu';
import creditCardIcon from '@/assets/images/cartao_credito.png';

export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SidebarMenu />

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#f0f0f0', dark: '#1a1a1a' }}
        headerImage={
          <Image
            source={require('@/assets/images/logo_banco_virtual.png')}
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.greeting}>OLÁ, DIEGO! 👋</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.balanceLabel}>Saldo disponível:</ThemedText>
          <ThemedText type="title" style={styles.balance}>R$ 5.230,75</ThemedText>

          <ThemedView style={styles.actionsRow}>
            <QuickActionButton label="Transferir" />
            <QuickActionButton label="Depositar" />
            <QuickActionButton label="Pagar" />
          </ThemedView>

          <Collapsible title="Cartão de crédito">
            <Image source={creditCardIcon} style={styles.cardIcon} />
            <ThemedText>Limite disponível: <ThemedText type="defaultSemiBold">R$ 1.200,00</ThemedText></ThemedText>
            <ThemedText>Próxima fatura: <ThemedText type="defaultSemiBold">R$ 800,00</ThemedText></ThemedText>
          </Collapsible>

          <Collapsible title="Últimas movimentações">
            <TransactionItem label="Mercado Livre" amount="- R$ 220,00" />
            <TransactionItem label="PIX recebido" amount="+ R$ 600,00" positive />
            <TransactionItem label="Netflix" amount="- R$ 39,90" />
            <ThemedText type="link" style={styles.link}>Ver todas as movimentações</ThemedText>
          </Collapsible>

          <ThemedText style={styles.userCardsTitle}>Cartões do usuário</ThemedText>
          <View style={styles.cardButtonsContainer}>
            <CardButton label="Cartão Virtual" subLabel="Usado para compras online" />
            <CardButton label="Cartão Físico" subLabel="Cartão para compras no Brasil" />
            <CardButton label="Cartão Internacional" subLabel="Compras no exterior" />
          </View>

          <ThemedText style={styles.footerInfo}>🔒 Segurança em dia · Atendimento 24h</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </View>
  );
}

function QuickActionButton({ label, image }: { label: string; image?: any }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.quickAction, { transform: [{ scale: scaleAnim }] }]}>
        {image && <Image source={image} style={styles.quickActionImage} />}
        <ThemedText type="defaultSemiBold" style={styles.quickActionText}>{label}</ThemedText>
      </Animated.View>
    </Pressable>
  );
}

function TransactionItem({
  label,
  amount,
  positive = false,
}: {
  label: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <ThemedView style={styles.transactionItem}>
      <ThemedText>{label}</ThemedText>
      <ThemedText style={{ color: positive ? 'green' : 'red' }}>{amount}</ThemedText>
    </ThemedView>
  );
}

function CardButton({ label, subLabel }: { label: string; subLabel: string }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Pressable onPressIn={handlePressIn}>
      <Animated.View style={[styles.cardButton, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={creditCardIcon} style={styles.cardButtonImage} />
        <ThemedText type="title" style={styles.cardButtonText}>{label}</ThemedText>
        <ThemedText style={styles.cardButtonSubText}>{subLabel}</ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    padding: 16,
    gap: 16,
  },
  greeting: {
    fontSize: 24,
  },
  balanceLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  balance: {
    fontSize: 32,
    color: '#00aa77',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  quickAction: {
    backgroundColor: '#33cc99',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  quickActionImage: {
    width: 32,
    height: 32,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  quickActionText: {
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  link: {
    marginTop: 10,
    textAlign: 'right',
  },
  footerInfo: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
    color: '#888',
  },
  cardIcon: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 10,
  },
  userCardsTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  cardButton: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
  },
  cardButtonImage: {
    width: 300,
    height: 180,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  cardButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  cardButtonSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  cardButtonsContainer: {
    flexDirection: 'column',
    gap: 12,
    alignItems: 'flex-start', // alinha os filhos (os botões) à esquerda
  },
  
  cardButton: {
    // alignSelf: 'center', // Removido para seguir o alinhamento do container
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
  },
});

