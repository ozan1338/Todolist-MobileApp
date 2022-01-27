import { Pressable, Text } from "react-native";


export default function Btn({ handleTextInput,loading, bgColor, buttonText }) {
  return (
    <Pressable 
      onPress={() => handleTextInput()}
      style={{
          backgroundColor: bgColor,
          height: 40,
          width: '70%',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20,
          borderRadius: 10
      }}>
        <Text style={{
            color: 'white'
        }}
        >{loading ? "Loading..." : buttonText}</Text>
    </Pressable>
  );
}