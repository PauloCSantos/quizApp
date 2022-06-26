import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Title = ({titleText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    color: '#030D12'
  },
  container: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
