import React from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';


export default function App() {
  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <SafeAreaView style={styles.container}>
      <LinearGradient 
          start={{x: 1, y: 1}} 
          end={{x: 0, y: 0}} 
          colors={['#1F2233', '#303550']} 
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            Simple Linear Gradient Backgrount
          </Text>
        </LinearGradient>

        


      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  linearGradient: {
    flex: 1,
    alignSelf: 'stretch',
  },
});



{/*
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>

            +++++++++++++++++++++++++++++++++++++++++++++
            +++++++++++++++++++++++++++++++++++++++++++++


            <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
            
            >
              <Text style={styles.buttonText}>
                Curtir
              </Text>
            </TouchableOpacity>



*/}