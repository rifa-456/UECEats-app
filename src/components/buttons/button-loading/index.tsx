import { colors } from "@/utils/colors";
import { ComponentProps, ReactNode } from "react";
import { ActivityIndicator, Text, ViewStyle } from "react-native";
import StyledButton from "../button";

type ButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  backgroundColor?: string;
  textColor?: string;
  mt?: number;
  w?: number;
  h?: number;
  ph?: number;
  isDisabled?: boolean;
  onPress?: () => void;
} & ComponentProps<typeof StyledButton>;

const Button = ({
  children,
  isLoading = false,
  backgroundColor = colors.green,
  textColor = colors.whiteSmoke,
  mt = 0,
  w = 200,
  h = 48,
  ph = 50,
  isDisabled = false,
  onPress,
  ...rest
}: ButtonProps) => {
  const dynamicButtonStyles: ViewStyle = {
    backgroundColor,
    paddingHorizontal: ph,
    marginTop: mt,
    width: w,
    height: h,
    opacity: isLoading || isDisabled ? 0.5 : 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  };

  return (
    <StyledButton
      disabled={isLoading || isDisabled}
      style={dynamicButtonStyles}
      onPress={onPress}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={{ color: textColor, fontWeight: "600" }}>{children}</Text>
      )}
    </StyledButton>
  );
};

export default Button;
