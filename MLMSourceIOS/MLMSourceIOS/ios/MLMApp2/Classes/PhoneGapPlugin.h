//
//  CDVPlugin+PhoneGapPlugin.h
//  MLMApp2
//
//  Created by Aekdacha Tunsuwanakij on 8/20/14.
//
//

#import <Cordova/CDV.h>

@interface PhoneGapPlugin : CDVPlugin
- (void) cordovaGetCurrentDate:(CDVInvokedUrlCommand *)command;

- (void) cordovaGetSecureCode:(CDVInvokedUrlCommand *)command;

- (void) cordovaTon:(CDVInvokedUrlCommand *)command;

- (void) GetTokenDevice:(CDVInvokedUrlCommand *)command;

//- (void) cordovaTon:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
@end
