import React from 'react';
import { ImageBackground } from 'react-native';
import backgroundColor from '../../assets/background-galaxy.png'
import { styles } from './styles';

interface Props{
    children: React.ReactNode;
}

export function Background({ children }:Props) {
  return (
    <ImageBackground 
        source={backgroundColor}
        defaultSource={backgroundColor}
        style={styles.container}
    >
        {children}
    </ImageBackground>
  );
}