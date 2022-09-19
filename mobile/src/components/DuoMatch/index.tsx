import React, { useState } from "react";
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading";
import * as ClipBoard from 'expo-clipboard';


interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState(false);
    async function handleCopyDiscordToClipBoard() {
        setIsCopping(true);
        await ClipBoard.setStringAsync(discord)
        setIsCopping(false);
        Alert.alert('Discord Copiado!', 'Usuário copiado para sua você colocar no Discord. ')
    }

  return (
    <Modal 
      transparent
      statusBarTranslucent
      {...rest}
      animationType="fade"
      >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
              onPress={onClose}
            />
          </TouchableOpacity>

          <CheckCircle size={64} weight={"bold"} color={THEME.COLORS.SUCCESS} />
          <Heading 
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24}}
            />
          <Text style={styles.label}>Adicione o seu discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipBoard}
            disabled={isCopping}
          >
            <Text
            style={styles.discord}>{isCopping ?<ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
