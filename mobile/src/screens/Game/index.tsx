import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SafeAreaView, TouchableOpacity, View, Text, Image, FlatList } from "react-native";
import { GameParams } from "../../@types/navigation";

import { Entypo } from "@expo/vector-icons";
import { Background } from "../../components/Background";
import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps} from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";



export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  useEffect(() => {
    fetch(`http://192.168.1.87:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.1.87:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{
            uri: game.bannerUrl,
          }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          horizontal
          renderItem={ ({ item }) => {
            return (
               <DuoCard 
                data={item}
                onConnect={()=> getDiscordUser(item.id)}
                />
              )
          }}
          contentContainerStyle={[duos.length > 0? styles.contentList : styles.emptyListContent]}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={()=> <Text style={styles.emptyListText}>Não há anúncios para este Jogo. </Text>}
          
        />
        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected} 
          onClose={()=> setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
