import React, { ReactNode } from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";
import { colors } from "../../../../utils/colors";

interface TextProps {
  children: ReactNode;
  color?: string;
  fs?: number;
  textAlign?: TextStyle['textAlign'];
  w?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  fw?: TextStyle['fontWeight'];
  style?: TextStyle;
}

const styles = StyleSheet.create({
  defaultText: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: 'normal',
  },
});

const Text = ({
  children,
  color,
  fs,
  textAlign,
  w,
  mt,
  mb,
  ml,
  mr,
  fw,
  style,
}: TextProps) => {
  const dynamicStyles: TextStyle = {
    color: color ?? styles.defaultText.color,
    fontSize: fs ?? styles.defaultText.fontSize,
    textAlign: textAlign ?? styles.defaultText.textAlign,
    width: w ?? styles.defaultText.width,
    marginTop: mt ?? styles.defaultText.marginTop,
    marginBottom: mb ?? styles.defaultText.marginBottom,
    marginLeft: ml ?? styles.defaultText.marginLeft,
    marginRight: mr ?? styles.defaultText.marginRight,
    fontWeight: fw ?? styles.defaultText.fontWeight,
  };

  return (
    <RNText style={[styles.defaultText, dynamicStyles, style]}>
      {children}
    </RNText>
  );
};

export default Text;
