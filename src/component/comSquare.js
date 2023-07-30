
import React, { useState, useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { Pressable, Touchable, TouchableOpacity, View, Text, Image, StyleSheet, Animated } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

export default function Square({ sLeft, sTop, sValue, ifClick, sSize, _png }) {
const imgPath = genRanImg(_png);
function genRanImg(_pn){      
          const images = [
                    require('./1.png'),
                    require('./2.png'),
                    require('./3.png'),
                    require('./4.png'),
                    require('./5.png'),
                    require('./6.png'),
                    require('./7.png'),
                    require('./8.png'),
                    require('./9.png'),
                    require('./0.png'),
          ];          
return images[_pn];
}

const posX = useState(new Animated.Value(sLeft))[0];
const posY = useState(new Animated.Value(sTop))[0];


const [fontsLoaded] = useFonts({
          "STAMPWRITERKIT": require("../assets/fonts/STAMPWRITER-KIT.ttf"),
});

useEffect(()=>{
          async function prepare(){
                    await SplashScreen.preventAutoHideAsync();
          }
          prepare();
},[]);


if(!fontsLoaded){   
          return undefined;
}else{
          SplashScreen.hideAsync();
}

const styles = StyleSheet.create({
          buttonContainer: {
                    width: sSize,
                    height: sSize,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingTop: 5,
                    position: "absolute",    
          },
          buttonContent: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
          },
          buttonImage: {
                    width: sSize,
                    height: sSize,
                    borderRadius: 10,    
          },
          buttonText: {
                    fontFamily: 'STAMPWRITERKIT',
                    position: 'absolute',
                    color: '#FFFFFF',
                    fontSize: 40,
                    // fontWeight: 'bold', //this will disable the custom font
          },
          elevation: { //Works only in android
                    // elevation: 10,
                    // shadowColor: '#52006A',
                    elevation: 10,     
          },
  });

function cssTransition(arg1,arg2){    
          Animated.timing(posX,{
                    toValue: arg1,
                    duration: 300,
                    useNativeDriver: true,
          }).start()
                    Animated.timing(posY,{
                    toValue: arg2,
                    duration: 300,
                    useNativeDriver: true,
          }).start()
}

cssTransition(sLeft,sTop);

return (              
          <Animated.View style={[{transform: [{translateX: posX},{translateY: posY}]}]}>
                    <View>    
                              <Pressable style={[styles.buttonContainer, styles.elevation]}  onPress={ifClick} >
                                        <View>
                                                  <View style={styles.buttonContent}>
                                                            <Image source={imgPath} style={styles.buttonImage} />
                                                            <Text style={styles.buttonText}>{sValue}</Text>                                                     
                                                  </View>
                                        </View>      
                              </Pressable>
                    </View>
          </Animated.View> 

);


};




