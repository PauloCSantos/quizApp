import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Title from '../components/Title';

const bg_img = require('../assets/imgs/subtle_prism.png');
const icon_img = require('../assets/imgs/ideia_criativa.png')

const Home = ({navigation}) => {
  return (
    <View style={styles.appContainer}>
      <ImageBackground source={bg_img} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.introContainer}>
          <Image
            source={icon_img}
            resizeMode="contain"
            style={styles.quizIcon}
          />
          <Title titleText="Quizzler" />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.subTitleText}>Your quiz game</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Quiz')}
            style={styles.button}>
            <Text style={styles.buttonText}>Play Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  introContainer: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  quizIcon: {
    height: 190,
    width: 190,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subTitleText: {
    fontSize: 38,
    fontFamily: 'OpenSans-Regular',
    color: '#0E3344',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#0E3344',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
    color: 'white',
  },
});
