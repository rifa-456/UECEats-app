import React from "react";
import { Pressable, PressableProps } from "react-native";

const StyledButton = React.forwardRef<React.ComponentRef<typeof Pressable>, PressableProps>(
  ({ children, ...rest }, ref) => (
    <Pressable ref={ref} {...rest}>
      {children}
    </Pressable>
  )
);

export default StyledButton;
