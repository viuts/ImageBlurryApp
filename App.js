/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Button, View, Text} from 'react-native';

import RNPytorch from 'react-native-pytorch';
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const [results, setResults] = useState([]);
  RNPytorch.loadModel('blurry', 'words')
    .then(() => console.log('done'))
    .catch(err => console.log(err));
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View>
          <Button
            title="Press me"
            color="#f194ff"
            onPress={() => {
              ImagePicker.showImagePicker({}, async response => {
                try {
                  if (!response.uri) {
                    return;
                  }
                  // console.time('inferrece');
                  const result = await RNPytorch.predict(response.uri);
                  // console.timeEnd('inferrece');
                  console.log(result);
                  setResults(result);
                } catch (err) {
                  console.log('err', err);
                }
              });
            }}
          />
          {results.map(result => (
            <Text>{`${result.label} - ${result.confidence}`}</Text>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
