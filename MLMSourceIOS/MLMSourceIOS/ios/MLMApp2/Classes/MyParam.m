//
//  MyParam.m
//  MLMApp2
//
//  Created by Aekdacha Tunsuwanakij on 9/6/14.
//
//

#import "MyParam.h"

@implementation MyParam

@synthesize myDevice, myDatabaseName;
@synthesize someProperty;
#pragma mark Singleton Methods

+ (id)sharedManager {
    static MyParam *sharedMyManager = nil;
    @synchronized(self) {
        if (sharedMyManager == nil)
        sharedMyManager = [[self alloc] init];
    }
    return sharedMyManager;
}

- (id)init {
    
    myDatabaseName = @"pageupcloud_MLM_DB_2014.db";
    if (self = [super init]) {
        someProperty = @"Default Property Value";
    }
    return self;
}

- (void)dealloc {
    // Should never be called, but just here for clarity really.
}

@end
