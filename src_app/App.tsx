/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import { Platform,SafeAreaView, StyleSheet, View, Button, Image, Alert, Text } from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

import ImageProcessor from './android/ImageProcessor'; 
import ImageProcessor_ios from './ios/ImageProcessor_ios';

const App: React.FC = () => {
  // State to manage selected and processed image URIs
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const [deviceID, setDeviceID] = useState('');
  const [deviceCppID, setdeviceCppID] = useState('');


  if (Platform.OS === 'ios') {
    // iOS-specific code
    
    console.log("Load IOS package succesfully ", ImageProcessor_ios);
  // ImageProcessor_ios.createCalendarEvent('foo', 'bar'); // print on log Xocde
    useEffect(() => {
      const fetchDeviceID = async() => {
        const id = await ImageProcessor_ios.helloFromXcode();
        setDeviceID(id); 
      };
      fetchDeviceID();
      }, []); // procedure to work with function return value  - print value on screen

    useEffect(() => {
      const fetchDeviceCppID = async() => {
        const id = await ImageProcessor_ios.helloFromXcodeCpp();
        setdeviceCppID(id); 
      };
      fetchDeviceCppID();
      }, []); // procedure to work with function return value  - print value on screen
  
  } else if (Platform.OS === 'android') {
    // Android-specific code
    
    // ImageProcessor.show(); //work - call direcly 

    useEffect(() => {
    const fetchDeviceID = async() => {
      const id = await ImageProcessor.helloFromJavaAndroid();
      setDeviceID(id); 
    };
    fetchDeviceID();
    }, []); // procedure to work with function return value   

    useEffect(() => {
      const fetchDeviceCppID = async() => {
        const id = await ImageProcessor.getDeviceID();
        setdeviceCppID(id); 
      };
      fetchDeviceCppID();
      }, []); // procedure to work with function return value  - print value on screen   
  } else {
    console.log('Running on neither IOS nor android');
  }
 
  

  
  

  

  // Function to pick an image from the device's library
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage || 'An unknown error occurred');
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri ?? null;
          setSelectedImage(uri);
        } else {
          console.log('Unexpected error: No assets found in response');
        }
      }
    );
  };

  // Function to simulate processing of the selected image
  const processImage = () => {
    if (!selectedImage) {
      console.log('No image selected');
      Alert.alert('No Image', 'Please select an image to process.');
      return;
    }

    // Simulate processing by simply using the same image URI
    // In a real-world scenario, you could apply filters, resize, etc.
    const processedUri = selectedImage;
    setProcessedImage(processedUri);

    // ImageProcessor.processImageRN();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {Platform.OS === 'ios' ? 'Hello from iOS' : 'Hello from Android'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Select Image" onPress={pickImage} />
      </View>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Process Image" onPress={processImage} />
      </View>
      {processedImage && (
        <Image source={{ uri: processedImage }} style={styles.image} />
      )}

      
      <Text>{deviceID}</Text>
      <Text>{deviceCppID}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default App;
registerRootComponent(App);

