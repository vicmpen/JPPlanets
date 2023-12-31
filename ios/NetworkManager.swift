//
//  NetworkManager.swift
//  ReactNativeInterview
//
//  Created by Fernando Santos on 01/07/2022.
//

import Foundation

@objc(NetworkManager)
class NetworkManager: NSObject {

@objc func doGet(_ url: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    guard let constructedURL = URL(string: url) else {
      fatalError("Failed to create URL")
    }
  
    //Implement the caching mechanism in the native side, if performance is key
    let request = URLRequest(url: constructedURL)
    
    let dataTask = URLSession.shared.dataTask(with: request) { data, response, error in
      guard error == nil else {
        let httpResponse = response as? HTTPURLResponse
        rejecter("\(httpResponse?.statusCode ?? -1)", response.debugDescription, error)
        return
      }
      
      guard let responseData = data else {
        let httpResponse = response as? HTTPURLResponse
        rejecter("\(httpResponse?.statusCode ?? -1)", "No response data", nil)
        return
      }
      
      //probably create a response DTO, and a map transformation of it, in order to pass it RN
      let stringifiedData = String(data: responseData, encoding: .utf8)
      resolver(stringifiedData)
    }
    
    dataTask.resume()
  }
  
  @objc static func requiresMainQueueSetup() -> Bool { return true }

}
