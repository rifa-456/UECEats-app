import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { colors } from "../../../utils/colors";

interface HeadingProps {
  children: ReactNode;
  mt?: number;
  mb?: number;
  fs?: number;
  color?: string;
  textAlign?: TextStyle['textAlign'];
  w?: number;
  style?: TextStyle;
}

const styles = StyleSheet.create({
  defaultHeading: {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 0,
    color: colors.black,
    width: '100%',
  },
});

const Heading = ({
  children,
  mt,
  mb,
  fs,
  color,
  textAlign,
  w,
  style,
}: HeadingProps) => {
  const dynamicStyles: TextStyle = {
    marginTop: mt ?? styles.defaultHeading.marginTop,
    marginBottom: mb ?? styles.defaultHeading.marginBottom,
    fontSize: fs ?? styles.defaultHeading.fontSize,
    color: color ?? styles.defaultHeading.color,
    textAlign: textAlign ?? styles.defaultHeading.textAlign,
    width: w ?? styles.defaultHeading.width,
  };

  return (
    <Text style={[styles.defaultHeading, dynamicStyles, style]}>
      {children}
    </Text>
  );
};

export default Heading;