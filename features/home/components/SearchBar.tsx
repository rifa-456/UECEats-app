import React from 'react';
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from 'lucide-react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}
 
export const SearchBar = ({ value, onChangeText, placeholder = "O que você deseja hoje?" }: SearchBarProps) => {
  return (
    <Input className="rounded-full border-gray-300">
      <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} className="text-gray-500" />
      </InputSlot>
      <InputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="text-lg"
      />
    </Input>
  );
};