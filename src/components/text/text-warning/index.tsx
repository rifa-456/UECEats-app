import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { styles } from "../styles";
import Text from "../text";

interface TextWarningProps {
  children: string | string[];
  backgroundColor?: string;
  textColor?: string;
  fs?: number;
  w?: number;
  o?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  h?: number;
  fw?: TextStyle["fontWeight"];
}

const TextWarning = (props: TextWarningProps) => {
  const dynamicStylesBG: ViewStyle = {
    backgroundColor: props.backgroundColor ?? styles.warningWrapper.backgroundColor,
    width: props.w ?? styles.warningWrapper.width,
    opacity: props.o ?? styles.warningWrapper.opacity,
    marginTop: props.mt ?? styles.warningWrapper.marginTop,
    marginBottom: props.mb ?? styles.warningWrapper.marginBottom,
    marginRight: props.mr ?? styles.warningWrapper.marginRight,
    marginLeft: props.ml ?? styles.warningWrapper.marginLeft,
    height: props.h ?? styles.warningWrapper.height,
  };

  return (
    <View style={[styles.warningWrapper, dynamicStylesBG]}>
      <Text
        fs={props.fs ?? styles.warningText.fontSize}
        fw={props.fw}
        color={props.textColor ?? styles.warningText.color}
      >
        {props.children}
      </Text>
    </View>
  );
};

export default TextWarning;
