import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, ImageBackground, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export interface GameCardProps{
  id: string;
  title: string;
  _count: {
    ads: string
  }
  bannerUrl: string;
} 

interface Props extends TouchableOpacityProps{
  data: GameCardProps
}

export function GameCard({ data , ...rest}:Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        <ImageBackground
          style={styles.cover}
          source={{ uri: data.bannerUrl }}
          >
          <LinearGradient
            colors={THEME.COLORS.FOOTER}
            style={styles.footer}
          >
            <Text style={styles.name}>
              {data.title}
            </Text>
            <Text style={styles.ads}>
              {data._count.ads} Anúncio(s)
            </Text>
          </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>
  );
}