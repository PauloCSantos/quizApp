import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Title from '../components/Title';

const Result = ({navigation, route}) => {
  const {score} = route.params;
  const {questions} = route.params;
  const {userAwns} = route.params;
  const resultaBanner = score > 3;
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {!show ? (
          <>
            <Title titleText="Results" />
            <Text style={styles.scoreText}>Total correct answers</Text>
            <Text style={styles.scoreValue}>{score} out of 10 Questions</Text>
            <View style={styles.bannerContainer}>
              <Text>{resultaBanner}</Text>
              <Image
                source={
                  resultaBanner
                    ? require('../assets/imgs/trophy.png')
                    : require('../assets/imgs/loser.png')
                }
                style={styles.banner}
                resizeMode="contain"
              />
            </View>
          </>
        ) : (
          <ScrollView style={styles.scrollView}>
            {questions.map((ques, index) => (
              <View key={index}>
                <Text style={styles.question}>
                  Q{index + 1}. {decodeURIComponent(ques.question)}
                </Text>
                <Text style={styles.correct}>
                  {decodeURIComponent(ques.correct_answer)}
                </Text>
                {decodeURIComponent(userAwns[index]) !== 'ACERTOU' && (
                  <Text style={styles.userOption}>
                    {decodeURIComponent(userAwns[index])}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => setShow(!show)} style={styles.button}>
          <Text style={styles.buttonText}>Show Awnsers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    height: '100%',
    backgroundColor: '#1A759F',
  },
  scoreText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    color: '#030D12',
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  banner: {
    height: 300,
    width: 300,
  },
  scrollView: {
    marginVertical: '3%',
    paddingRight: '5%'
  },
  question: {
    color: 'white',
    marginBottom: 5,
    fontFamily: 'OpenSans-Regular',
  },
  correct: {
    color: 'blue',
    fontFamily: 'OpenSans-Regular',
  },
  userOption: {
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    marginBottom: 4,
  },
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 1,
  },
  button: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#0E3344',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
    color: 'white',
  },
});
