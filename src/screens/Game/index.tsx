
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/background';
import { GameParams } from '../../@types/navigation';


import { THEME } from '../../theme';
import { styles } from './styles';
import { Heading } from '../../components/heading';
import { DuoCard } from '../../components/DuoCard';

interface RouteParams{
  id:string;
  title:string;
  bannerUrl:string;
}

export function Game() {
  
  const [duos, setDuos] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function hangleGoBack(){
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.1.3:3333/games/${game.id}/ads`)
    .then((result) => result.json())
    .then((data) => setDuos(data))
      
  },[]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={hangleGoBack}>
              <Entypo 
                name='chevron-thin-left'
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image
              source={logoImg}
              style={styles.logo}
            />

            <View style={styles.right}/>
          </View>

          <Image
            source={{uri:game.bannerUrl}}
            style={styles.cover}
            resizeMode='cover'
          />

          <Heading
            title={game.title}
            subtitle='Conecte-se e comece a jogar!'
          />

          <FlatList
            data ={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard
                data={item}
                onConnect={() => { }}
              />
            )}
            horizontal
            contentContainerStyle={styles.contentList}
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
          />
          

      </SafeAreaView>
    </Background>
  );
}