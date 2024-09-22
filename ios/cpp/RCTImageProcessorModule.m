//
//  RCTImageProcessorModule.m
//  app_cpp
//
//  Created by Puwell on 16/9/24.
//

#import <Foundation/Foundation.h>

#import "RCTImageProcessorModule.h"
#import <React/RCTLog.h>
#import "hello.h"

@implementation RCTImageProcessorModule

// To export a module named RCTImageProcessorModule.

RCT_EXPORT_MODULE();

// Export a Native Method to JavaScript
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

RCT_REMAP_METHOD(helloFromXcode,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  // Return a string using the promise
  NSString *responseString = @"Hello from Xcode";
  resolve(responseString);
}

RCT_REMAP_METHOD(helloFromXcodeCpp,
                 get_data_resolver:(RCTPromiseResolveBlock)resolve
                 send_count_resolver:(RCTPromiseRejectBlock)reject) {
  // Convert C-string to NSString
 const char *cString = test();
 NSString *responseString = [NSString stringWithUTF8String:cString];
  resolve(responseString);
}

// synchronous native method
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
return [[UIDevice currentDevice] name];
}

@end

