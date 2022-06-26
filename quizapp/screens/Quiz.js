import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const bg_img = require('../assets/imgs/subtle_prism.png');

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [select, setSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changeColor, setChangeColor] = useState(5);
  const [userAwns, setUserAwns] = useState([]);
  const [endGame, setEndGame] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    const url =
      'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };

  const generateOptionsAndShuffle = _questions => {
    const options = [..._questions.incorrect_answers];
    options.push(_questions.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleSelected = i => {
    setSelect(true);
    setChangeColor(i);
  };

  const handleNextPress = () => {
    setSelect(false);
    handleSelectedOption(options[changeColor]);
    setChangeColor(5);
  };

  const handleSelectedOption = _option => {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 1);
      let newUser = 'ACERTOU';
      setUserAwns(userAwns => [...userAwns, newUser]);
    } else {
      let newUser = options[changeColor];
      setUserAwns(userAwns => [...userAwns, newUser]);
    }
    if (ques !== 9) {
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
      setQues(ques + 1);
    }
    if (ques === 9) {
      setEndGame(true);
    }
  };

  const handleSkip = () => {
    if (ques !== 9) {
      let newUser = 'SKIPPED';
      setUserAwns(userAwns => [...userAwns, newUser]);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
      setQues(ques + 1);
    } else {
      let newUser = 'SKIPPED';
      setUserAwns(userAwns => [...userAwns, newUser]);
      setEndGame(true);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    if (endGame === true) {
      navigation.navigate('Result', {
        score: score,
        questions: questions,
        userAwns: userAwns,
      });
    }
  }, [endGame]);

  return (
    <View style={styles.appContainer}>
      <ImageBackground
        source={bg_img}
        resizeMode="cover"
        style={styles.bgImage}>
        <View style={styles.mainContainer}>
          {isLoading ? (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Is Loading...</Text>
            </View>
          ) : (
            questions && (
              <>
                <View style={styles.top}>
                  <Text style={styles.question}>
                    Q{ques + 1}. {decodeURIComponent(questions[ques].question)}
                  </Text>
                </View>
                <View style={styles.options}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      changeColor === 0
                        ? {borderColor: 'white', borderWidth: 2}
                        : null,
                    ]}
                    onPress={() => handleSelected(0)}>
                    <Text style={styles.option}>
                      {decodeURIComponent(options[0])}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      changeColor === 1
                        ? {borderColor: 'white', borderWidth: 2}
                        : null,
                    ]}
                    onPress={() => handleSelected(1)}>
                    <Text style={styles.option}>
                      {decodeURIComponent(options[1])}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      changeColor === 2
                        ? {borderColor: 'white', borderWidth: 2}
                        : null,
                    ]}
                    onPress={() => handleSelected(2)}>
                    <Text style={styles.option}>
                      {decodeURIComponent(options[2])}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      changeColor === 3
                        ? {borderColor: 'white', borderWidth: 2}
                        : null,
                    ]}
                    onPress={() => handleSelected(3)}>
                    <Text style={styles.option}>
                      {decodeURIComponent(options[3])}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                  <TouchableOpacity style={styles.button} onPress={handleSkip}>
                    <Text style={styles.buttonText}>SKIP</Text>
                  </TouchableOpacity>
                  {ques !== 9 && (
                    <TouchableOpacity
                      disabled={!select}
                      style={styles.button}
                      onPress={handleNextPress}>
                      <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                  )}
                  {ques === 9 && (
                    <TouchableOpacity
                      disabled={!select}
                      style={styles.button}
                      onPress={handleNextPress}>
                      <Text style={styles.buttonText}>SHOW RESULTS</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    margin: '2%',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loadingText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
  },
  top: {
    marginBottom: 30,
  },
  question: {
    fontSize: 28,
    color: '#030D12',
    fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
  },
  options: {
    marginVertical: '25%',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  optionButton: {
    paddingVertical: 12,
    backgroundColor: '#0E3344',
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 30,
  },
  option: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    color: 'white',
  },
  bottom: {
    marginBottom: '5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#0E3344',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
    color: 'white',
  },
});
