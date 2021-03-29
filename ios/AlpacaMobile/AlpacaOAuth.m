//
//  AlpacaOAuth.m
//  AlpacaMobile
//
//  Created by hakuna on 3/19/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AlpacaOAuth, NSObject)

RCT_EXTERN_METHOD(AuthStart:(NSString *)url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
