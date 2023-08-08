import React from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function PersonalFont({ myText, myFont, mySize, myColor, myWidth, myAlign})  {

const [fontsLoaded] = useFonts({
          "STAMPWRITERKIT": require("../assets/fonts/STAMPWRITER-KIT.ttf"),
          "RubikVinyl-Regular": require("../assets/fonts/RubikVinyl-Regular.ttf"),
          "Hacked-KerX": require("../assets/fonts/Hacked-KerX.ttf"),                                        
});          

if (!fontsLoaded) {
          return null;
}

return (          
          <View>
                    <Text style={{ fontFamily: myFont, fontSize: mySize, color: myColor, textAlign: myAlign, width: myWidth}}> {myText} </Text>
          </View>
);
}

