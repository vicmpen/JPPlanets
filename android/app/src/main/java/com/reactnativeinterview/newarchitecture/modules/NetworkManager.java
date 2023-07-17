package com.reactnativeinterview.newarchitecture.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class NetworkManager extends ReactContextBaseJavaModule {
    @NonNull
    @Override
    public String getName() {
        return "NetworkManager";
    }

    /**
     * @param inputUrl-endpoint to make request
     * @param promise-return  a success/error payload to js
     */
    @ReactMethod
    public void doGet(String inputUrl,final Promise promise) {
        URL url;
        HttpURLConnection urlConnection = null;
        try {
            url = new URL(inputUrl);
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");


            int responseCode = urlConnection.getResponseCode();
            System.out.println("GET Response Code :: " + responseCode);
            if (responseCode == HttpURLConnection.HTTP_OK) { // success
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                BufferedReader reader = new BufferedReader(new InputStreamReader(in));
                StringBuilder result = new StringBuilder();
                String line;
                while((line = reader.readLine()) != null) {
                    result.append(line);
                }
                promise.resolve(result.toString());
                in.close();

            }

        } catch (IOException e) {
            e.printStackTrace();
            promise.reject(e.fillInStackTrace());
        } finally {
            assert urlConnection != null;
            urlConnection.disconnect();
        }

    }
}
