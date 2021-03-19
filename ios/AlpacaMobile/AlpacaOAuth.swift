//
//  AlpacaOAuth.swift
//  AlpacaMobile
//
//  Created by hakuna on 3/19/21.
//

import UIKit
import SafariServices

@objc(AlpacaOAuth)
class AlpacaOAuth: NSObject {
  
  private var authSession: SFAuthenticationSession?
  
  @objc func AuthStart(_ url: String,
                       resolver resolve: @escaping RCTPromiseResolveBlock,
                       rejecter reject: @escaping RCTPromiseRejectBlock) {
    let webOAuthUrl = URL(string: url)!
    
    authSession = SFAuthenticationSession(url: webOAuthUrl, callbackURLScheme: "alpacamobile://") { url, error in
      let urlStr = url?.relativeString
      if (error == nil) {
        resolve(urlStr)
      } else {
        resolve("")
      }
    }
    authSession?.start()
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
