//
//  CDVPlugin+PhoneGapPlugin.m
//  MLMApp2
//
//  Created by Aekdacha Tunsuwanakij on 8/20/14.
//
//

#import "PhoneGapPlugin.h"
#import "MyParam.h"

@implementation PhoneGapPlugin

- (void) cordovaGetCurrentDate:(CDVInvokedUrlCommand *)command {
    NSString *currentDate =[self getCurrentDate];
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsString : currentDate
                                     ];
    // Execute sendPluginResult on this plugin's commandDelegate, passing in the ...
    // ... instance of CDVPluginResult
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

//UserDefined Method to getting Current Date :
- (NSString *) getCurrentDate{
    NSDate *currDate = [NSDate date];
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
    [dateFormatter setDateFormat:@"dd.MM.YY HH:mm:ss"];
    NSString *dateString = [dateFormatter stringFromDate:currDate];
    return dateString;
}

- (void) GetTokenDevice:(CDVInvokedUrlCommand *)command {
    
    MyParam *sharedManager = [MyParam sharedManager];
    NSString *param = [[NSString alloc] initWithFormat: @"%@" ,sharedManager.myDevice];
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsString :  param
                                     ];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}



- (void) cordovaGetSecureCode:(CDVInvokedUrlCommand *)command {
    NSString *param = @"d"; //@"FCAuIfoj8QHYwjv5WtbuZTDNo5Zo9OBksDam143VxgETkoGLbFqKzb5tdvoaLI21mob1quNkyOJvGQHZYFqLvA==";
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsString :  param
                                     ];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void) cordovaTon:(CDVInvokedUrlCommand *)command {
    NSString* myarg = [command.arguments objectAtIndex:0];
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsString :  myarg
                                     ];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/*

- (void) cordovaTon:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    
    //get the callback id
    NSString *callbackId = [arguments pop];
    
    NSLog(@"Hello, this is a native function called from PhoneGap/Cordova!");
    
    NSString *resultType = [arguments objectAtIndex:0];
    CDVPluginResult *result;
    
    if ( [resultType isEqualToString:@"success"] ) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @"Success :)"];
        [self writeJavascript:[result toSuccessCallbackString:callbackId]];
    }
    else {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: @"Error :("];
        [self writeJavascript:[result toErrorCallbackString:callbackId]];
    }
}

*/
@end
