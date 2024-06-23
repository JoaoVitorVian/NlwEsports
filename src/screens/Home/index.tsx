import { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/heading';
import { GameCard } from '../../components/GameCard';

import { GameCardProps } from './../../components/GameCard/index';
import { Background } from '../../components/background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation =  useNavigation();

  function handleOpenGame({id, title, bannerUrl} : GameCardProps){
    navigation.navigate('game',{id, title, bannerUrl});
  }

  useEffect(() => {
    fetch('http://192.168.1.3:3333/games')
    .then((result) => result.json())
    .then((data) => setGames(data))
      
  },[]);

  return (
    <Background>
      <View style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title='Encontre seu duo!'
          subtitle=' Selecione o game que deseja jogar!'
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id} 
          renderItem={({item}) => ( 
            <GameCard
            data={item}
            onPress={() => handleOpenGame(item)}
          />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentsList}
        />

      </View>
    </Background>
  );
}