import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

const BlinkingText = ({ myText, mySize, pT, pB }) => {
const colorValue = useRef(new Animated.Value(0)).current;



useEffect(() => {
          const blinkingAnimation = Animated.loop(
                    Animated.sequence([
                              Animated.timing(colorValue, {
                                        toValue: 1,
                                        duration: 250, // Adjust the duration (in milliseconds) as needed
                                        useNativeDriver: false,
                              }),
                              Animated.timing(colorValue, {
                                        toValue: 2,
                                        duration: 250, // Adjust the duration (in milliseconds) as needed
                                        useNativeDriver: false,
                              }),
                    ])
          );

blinkingAnimation.start();

return () => {
          blinkingAnimation.stop();
};
}, []);

const interpolatedColor = colorValue.interpolate({
          inputRange: [1, 2],
          outputRange: ['red', '#F4B400'], // Adjust the colors as desired
});

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
                    <Animated.Text
                              style={{ paddingTop: pT, paddingBottom: pB, fontSize: mySize, fontFamily: "Hacked-KerX", color: interpolatedColor, }}>
                              {myText}
                    </Animated.Text>
          </View>
);
};

export default BlinkingText;

