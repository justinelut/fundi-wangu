import React from "react";
import { Controller, Control } from "react-hook-form";
import { View, TextInput, Text, StyleSheet } from "react-native";

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  secureTextEntry?: boolean;
  control: Control<any>; // Correctly type 'control' from react-hook-form
  name: string;
  error?: string; // Explicit error typing
  style?: object; // Optional style prop for customization
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  icon,
  secureTextEntry,
  control,
  name,
  error,
  style,
}) => {
  return (
    <View style={styles.container}>
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
              style={[styles.input, error && styles.inputError, style]} // Apply error styles if error exists
            />
            {error && <Text style={styles.errorText}>{error}</Text>} {/* Display error message */}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15, // You can adjust this value
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc", // Default border color
  },
  inputError: {
    borderColor: "red", // Red border for errors
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default InputField;
