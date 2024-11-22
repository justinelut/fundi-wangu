import React from "react";
import { Controller } from "react-hook-form";
import { View, TextInput, Text } from "react-native";

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  secureTextEntry?: boolean;
  textContentType?: string;
  control: any; // Pass control from useForm
  name: string; // Name of the form field
  error?: any; // Validation error message
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  icon,
  secureTextEntry,
  textContentType,
  control,
  name,
  error,
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              textContentType={textContentType}
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default InputField;
