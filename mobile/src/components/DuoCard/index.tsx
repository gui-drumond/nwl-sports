import React from 'react';
import { THEME } from '../../theme';
import { styles } from './styles';

import { GameController } from 'phosphor-react-native';

import { View,Text, TouchableOpacity} from 'react-native';
import { DuoInfo } from '../DuoInfo';


export interface DuoCardProps {
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
  hourEnd: string;
  hourStart: string;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void
}

export function DuoCard({ data, onConnect}: Props) {

  return (
    <View style={styles.container}>
      <DuoInfo 
        label='Nome'
        value={data.name}
      />
      <DuoInfo 
        label='Tempo de Jogo'
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo 
        label='Disponibilidade'
        value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart.trim()} - ${data.hourEnd.trim()}`}
      />
      <DuoInfo 
        label='Chamada de áudio?'
        value={data.useVoiceChannel? "Sim": "Não"}
        colorValue={data.useVoiceChannel? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity
      style={styles.button}
      >
        <GameController 
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>

    </View>
  );
}