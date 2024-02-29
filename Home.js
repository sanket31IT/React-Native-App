import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert, ScrollView, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const getColor = (email) => {
  return email === 'shreyash.b@sankeysolutionscom' ? 'violet' : 'gray';
};

const getUsername = (email) => {
  return email === 'shreyash.b@sankeysolutionscom' ? 'Shreyash' : 'Ashwin';
};

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const logoName = 'movie_logo.png';

  useEffect(() => {
    const { email } = route.params;
    setUserEmail(email);
    setUserName(getUsername(email));

    axios.get('https://reactnative.dev/movies.json')
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to fetch movie data');
      });

    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const movieCardColor = getColor(userEmail);

  const handleMovieCardPress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateTime}>{currentTime}</Text>
      <Text style={styles.welcome}>Welcome {userName}</Text>
      <ScrollView contentContainerStyle={styles.movieList}>
        {movies.map(movie => (
          <Pressable key={movie.id} onPress={() => handleMovieCardPress(movie)}>
            <View style={[styles.movieCard, { backgroundColor: movieCardColor }]}>
              <ScrollView style={styles.movieCardContent}>
                <Image
                  source={require(`./${logoName}`)}
                  style={styles.movieLogo}
                />
                <View style={styles.movieInfo}>
                  <Text style={[styles.movieTitle, { color: 'red' }]}>{movie.title}</Text>
                  <Text style={[styles.movieYear, { color: 'red' }]}>{movie.releaseYear}</Text>
                </View>
              </ScrollView>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: 'lightgreen' }]}>
            <Text style={[styles.modalTitle, { color: 'white' }]}>Movie Details</Text>
            <View style={{ marginBottom: 10 }} />
            <Text style={[styles.movieDetailLabel, { color: 'black' }]}>Movie Name:</Text>
            <Text style={[styles.movieDetail, { color: 'red' }]}>{selectedMovie?.title}</Text>
            <View style={{ marginBottom: 10 }} />
            <Text style={[styles.movieDetailLabel, { color: 'black' }]}>Release Year:</Text>
            <Text style={[styles.movieDetail, { color: 'red' }]}>{selectedMovie?.releaseYear}</Text>
            <View style={{ marginBottom: 20 }} />
            <Button title="Close" color="darkgreen" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.backButtonContainer}>
        <Button title="Back" color="pink" onPress={() => navigation.goBack()} style={styles.backButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eec0c8',
  },
  dateTime: {
    fontSize: 18,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 100,
  },
  movieCard: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 350,
    height: 170,
    alignItems: 'center',
  },
  movieCardContent: {
    width: '100%',
  },
  movieLogo: {
    width: 80,
    height: 80,
    marginTop: 30,
    marginBottom: 20,
  },
  movieInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -150,
    marginBottom: 40,
    marginLeft: 80,
  },
  movieYear: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: -14,
    marginBottom: -10,
    marginLeft: 90,
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  backButton: {
    height: 60, 
    width: 450, 
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    width: '80%',
    height: '50%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  movieDetailLabel: {
    fontSize: 20,
    marginBottom: 10,
  },
  movieDetail: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default HomeScreen;
