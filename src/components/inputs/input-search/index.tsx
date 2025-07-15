import React, { useEffect, useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Keyboard, TouchableOpacity } from "react-native";
import useDebounce from "../../../../hooks/useDebounce";
import { colors } from "../../../../utils/colors";
import { CloseIcon, SearchIcon } from "../../icons";
import { InputText } from "../index";

type SearchInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  onDebouncedChange: (value: string) => void;
  debounceTime?: number;
};

export default function SearchInput<T extends FieldValues>({
  control,
  name,
  placeholder = "Search...",
  onDebouncedChange,
  debounceTime = 500,
}: SearchInputProps<T>) {
  const [rawValue, setRawValue] = useState("");

  const [debouncedValue] = useDebounce(rawValue, debounceTime);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue]);

  const showCloseIcon = rawValue.length > 0;

  const handleIconClick = () => {
    setRawValue("");
    Keyboard.dismiss();
  };

  const CustomIcon = showCloseIcon
    ? () => (
        <TouchableOpacity onPress={handleIconClick} style={{ marginLeft: 8 }}>
          <CloseIcon color={colors.buttonBlue} size={26} />
        </TouchableOpacity>
      )
    : () => <SearchIcon color={colors.buttonBlue} size={26} />;

  return (
    <InputText
      control={control}
      name={name}
      placeholder={placeholder}
      icon={CustomIcon}
      formatInternalValue={(v) => {
        setRawValue(v);
        return v;
      }}
      formatVisibleValue={(v) => {
        if (rawValue !== v) setRawValue(v);
        return v;
      }}
    />
  );
}
