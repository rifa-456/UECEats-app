import { InfoIcon } from "lucide-react-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { CheckIcon, CloseIcon } from "../../icons";

type InputTextProps<T extends FieldValues> = {
  control: Control<T>;
  formatInternalValue?: (str: string) => string;
  formatVisibleValue?: (str: string) => string;
  icon?: React.ComponentType<any> | null;
  iconProps?: {
    visible: boolean;
    onToggle: () => void;
    size: number;
  };
  inputProps?: React.ComponentProps<typeof TextInput>;
  isLoading?: boolean;
  name: Path<T>;
  placeholder?: string;
  rules?: any;
  visibleValidation?: boolean;
  staticIcon?: boolean;
  bColorFocus?: string;
  editable?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
} & React.ComponentProps<typeof TextInput>;

const InputText = <T extends FieldValues>({
  control,
  formatInternalValue,
  formatVisibleValue,
  containerStyle,
  inputStyle,
  icon,
  iconProps,
  inputProps,
  isLoading,
  name,
  placeholder,
  rules,
  visibleValidation,
  staticIcon,
  editable = true,
  numberOfLines = 1,
  maxLength,
  ...props
}: InputTextProps<T>) => {
  const _formatVisibleValue = formatVisibleValue || ((v) => v);
  const _formatInternalValue = formatInternalValue || ((v) => v);
  const _visibleValidation = visibleValidation ?? true;

  const handleInputIcon = (isValid: boolean, isInvalid: boolean) => {
    if (icon === null) {
      return (
        <View style={styles.iconWrapper}>
          <View style={{ width: 20, height: 20, display: "flex", alignItems: "center", opacity: 0 }} />
        </View>
      );
    }

    if ((icon && !isValid && !isInvalid) || (icon && staticIcon)) {
      const IconComp = icon as React.ComponentType<any>;
      return (
        <View style={styles.iconWrapper}>
          <IconComp color="#999" {...iconProps} />
        </View>
      );
    } else if (isValid && _visibleValidation) {
      return (
        <View style={styles.iconWrapper}>
          <CheckIcon />
        </View>
      );
    } else if (isInvalid && _visibleValidation) {
      return (
        <View style={styles.iconWrapper}>
          <CloseIcon />
        </View>
      );
    }
    return (
      <View style={styles.iconWrapper}>
        <InfoIcon color="#999" size={20} />
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => {
        const externalValue = _formatVisibleValue(value) || "";
        const isInvalid = externalValue.length > 0 && invalid;
        const isValid = externalValue.length > 0 && !invalid;

        return (
          <View
            style={[
              styles.container,
              containerStyle,
              {
                height: numberOfLines > 1 ? numberOfLines * 50 : 50,
                borderColor: isInvalid ? "red" : "#ccc",
              },
            ]}
          >
            <TextInput
              placeholder={placeholder}
              value={externalValue}
              onChangeText={(val) => onChange(_formatInternalValue(val))}
              editable={editable}
              multiline={numberOfLines > 1}
              numberOfLines={numberOfLines}
              maxLength={maxLength}
              style={[
                styles.textInput,
                { paddingTop: numberOfLines > 1 ? 10 : 0 },
                inputStyle,
              ]}
              {...inputProps}
              {...props}
            />

            {props.children && (
              <Text style={styles.childrenText}>{props.children}</Text>
            )}

            {handleInputIcon(isValid, isInvalid)}

            {isLoading && (
              <View style={styles.spinnerWrapper}>
                <ActivityIndicator size="small" color="#999" />
              </View>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0,
    margin: 0,
  },
  iconWrapper: {
    marginLeft: 8,
  },
  spinnerWrapper: {
    marginLeft: 8,
  },
  childrenText: {
    marginLeft: 8,
  },
});

export default InputText;
