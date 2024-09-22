import {  NativeModules } from 'react-native';

const {ImageProcessorModule} = NativeModules;



// Define the interface for the native module
interface ImageProcessorModuleInterface {
    createCalendarEvent(name: string, location: string): void;
    // Add other methods if necessary
}


export default ImageProcessorModule as ImageProcessorModuleInterface;


