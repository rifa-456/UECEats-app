import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { ComponentProps, useState } from "react";
import { FieldValues } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { isValidPassword } from "../../../libs/validators/validations";
import InputText from "../input-text";

const DEFAULT_ERROR_MESSAGE = "Senha inválida";

const validate = (value: string) => {
  if (!value) return true;
  return isValidPassword(value) || DEFAULT_ERROR_MESSAGE;
};

const InputPasswordValidation = <T extends FieldValues>(
  props: ComponentProps<typeof InputText<T>>
) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <InputText
        {...props}
        inputProps={{
          ...props.inputProps,
          secureTextEntry: !showPassword,
        }}
        rules={{ validate, ...props.rules }}
      />
      <TouchableOpacity onPress={togglePassword} style={{ position: "absolute", right: 10 }}>
        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
      </TouchableOpacity>
    </View>
  );
};

export default InputPasswordValidation;