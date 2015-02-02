//
//  MyParam.h
//  MLMApp2
//
//  Created by Aekdacha Tunsuwanakij on 9/6/14.
//
//

#import <Foundation/Foundation.h>

@interface MyParam : NSObject {
    NSString *someProperty;

    
}

@property (nonatomic,retain) NSString *myDevice;
@property (nonatomic, retain) NSString *someProperty;
@property (nonatomic,retain) NSString *myDatabaseName;
+ (id)sharedManager;

@end
