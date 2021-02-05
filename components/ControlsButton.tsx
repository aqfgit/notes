import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onPressHandler: () => void;
  disabled?: boolean;
  iconName: string;
  iconSize: number;
  iconColor: string;
  text: string;
  additionalStyles?: {[key: string]: unknown};
}

const ControlsButton: React.FC<Props> = ({
  onPressHandler,
  disabled,
  iconName,
  iconSize,
  iconColor,
  text,
  additionalStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressHandler();
      }}
      disabled={disabled}
      style={[styles.button, additionalStyles]}>
      <Icon
        name={iconName}
        size={iconSize}
        style={styles.icon}
        color={iconColor}
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ControlsButton;

const styles = StyleSheet.create({
  icon: {
    paddingRight: 0,
    paddingVertical: 0,
    alignSelf: 'center',
    zIndex: 4,
  },
  button: {
    flex: 0,
    flexDirection: 'column',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },

  buttonText: {
    fontSize: 13,
  },
});
