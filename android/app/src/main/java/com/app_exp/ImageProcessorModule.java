package com.app_exp;

import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.provider.Settings;



public class ImageProcessorModule extends ReactContextBaseJavaModule {

    static {
        System.loadLibrary("app_exp"); // Load your C++ library
    }

    private static  ReactApplicationContext reactContext;
    private static final String TAG = "TAG_Module"; // Converted constant
    public ImageProcessorModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ImageProcessor";
    }

//    @ReactMethod
////    public void process(String imagePath, Promise promise) {
//    public void process( Promise promise) {
//        try {
////            String result = processImage(imagePath); // Call the C++ function
////            processImage();
//            Log.i(TAG, "Here Module");
////            promise.resolve(result); // return value
//        } catch (Exception e) {
//            promise.reject("Error processing image", e);
//        }
//    }

    @ReactMethod
    public void getDeviceID(Promise promise){
        try {
            String android_id = Settings.Secure.getString(reactContext.getContentResolver(),
                    Settings.Secure.ANDROID_ID);
            processImage(); // see in Log of android
            String hello_from_cpp = helloFromCpp();
            promise.resolve(hello_from_cpp);
        }catch (Exception e){
            promise.reject("Error",e);
        }
    }

    @ReactMethod
    public void show(){
        Toast.makeText(reactContext, "Hi from android", Toast.LENGTH_SHORT).show();
        Log.i(TAG, "Here Module");
    }

    @ReactMethod
    public void helloFromJavaAndroid(Promise promise){
        try {
            String hello = "Hello From Java ";
            promise.resolve(hello);
        }catch (Exception e){
            promise.reject("Error",e);
        }
    }

    // Declare the native method
    public native void processImage();
    public native String helloFromCpp();
}
