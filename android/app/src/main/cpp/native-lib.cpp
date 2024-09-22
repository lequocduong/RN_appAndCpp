#include <jni.h>
#include <string>

#include "android/log.h"
#define LOG_TAG "TAG_jni"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)


extern "C"
JNIEXPORT void JNICALL
Java_com_app_1exp_ImageProcessorModule_processImage(JNIEnv *env, jobject thiz) {
    LOGI("Here C++");
}
extern "C"
JNIEXPORT jstring JNICALL
Java_com_app_1exp_ImageProcessorModule_helloFromCpp(JNIEnv *env, jobject thiz) {
    std::string hello = "Hello form C++ of Android";
    return env->NewStringUTF(hello.c_str());
}