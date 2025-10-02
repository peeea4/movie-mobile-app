import { View, Image, TextInput } from "react-native";
import React, { FC } from "react";
import { icons } from "@/constants/icons";

interface ISearchBarProps {
  placeholder: string;
  onChange?: (text: string) => void;
  value?: string;
  onPress?: () => void;
}

export const SearchBar: FC<ISearchBarProps> = ({
  placeholder,
  onChange,
  value,
  onPress,
}) => (
  <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
    <Image source={icons.search} resizeMode="contain" tintColor="#ab8bff" />
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      placeholderTextColor="#a8b5db"
      className="flex-1 ml-2 text-white"
      onPress={onPress}
    />
  </View>
);
