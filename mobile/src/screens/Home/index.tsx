import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [games, setGames ] = useState<GameCardProps[]>([]);
  useEffect(()=>{
    fetch('http://192.168.1.87:3333/games')
    .then( response => response.json())
    .then(data => setGames(data))
  }, [])

  const navegation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl}: GameCardProps){
    navegation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />
        <Heading 
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
          <FlatList 
            data={games}
            keyExtractor={item=> item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
            renderItem={({ item }) => (
              <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )}
          />
      </SafeAreaView>
    </Background>
  );
}
