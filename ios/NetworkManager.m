//
//  NetworkManager.m
//  ReactNativeInterview
//
//  Created by Victor Benetatos on 11/7/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(NetworkManager, NSObject)
RCT_EXTERN_METHOD(doGet:(NSString *)url resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter )
@end
