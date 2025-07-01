import { ComponentProps, ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../../../../utils/colors";
import { CheckIcon } from "../../icons";

type InputCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  label?: ReactNode;
  name: Path<T>;
  w?: number;
  fs?: number;
  mt?: number;
  mb?: number;
  value?: any;
} & ComponentProps<typeof Pressable>;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
    marginRight: 10,
    gap: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  checkboxLabel: {
    fontSize: 16,
    alignItems: "center",
  },
});

const InputCheckbox = <T extends FieldValues>({
  control,
  label,
  name,
  w,
  fs,
  mt,
  mb,
  value = true,
  ...props
}: InputCheckboxProps<T>) => {
  const dynamicContainer: ViewStyle = {
      width: (typeof w === "number" ? w : "100%"),
      marginTop: mt ?? 5,
      marginBottom: mb ?? 15,
  };

  const dynamicLabel = {
    fontSize: fs ?? styles.checkboxLabel.fontSize,
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: fieldValue } }) => {
        const isChecked = fieldValue === value;

        return (
          <Pressable
            onPress={() => onChange(isChecked ? false : value)}
            style={[styles.checkboxContainer, dynamicContainer]}
            {...props}
          >
            <View style={styles.checkboxBox}>
              {isChecked && <CheckIcon />}
            </View>

            {typeof label === "string" ? (
              <Text style={[styles.checkboxLabel, dynamicLabel]}>{label}</Text>
            ) : (
              label
            )}
          </Pressable>
        );
      }}
    />
  );
};

export default InputCheckbox;
