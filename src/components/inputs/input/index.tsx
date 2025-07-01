import { TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      className="h-12 px-4 mb-2 border border-gray-300 rounded-md text-base text-black"
      placeholderTextColor="#999"
      {...props}
    />
  );
}