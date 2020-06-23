import React, { useEffect, useState } from "react";
import Avatar from './assets/avatar.jpg';




import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import api from "./services/api";


export default function App() {


  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepo() {
    const response = await api.post('repositories', {
      title: `Created at ${Date.now()}`,
      url: 'alansiqueira.com',
      techs: ['React', 'Gatsby']
    })

    const newRepo = response.data;
    setRepositories([...repositories, newRepo])
  }

  async function handleLikeRepository(id) {

    const response = await api.post(`repositories/${id}/like`);

    if (response.status === 200) {
      const repositoryIndex = repositories.findIndex(repo => repo.id === id);

      repositories[repositoryIndex].likes = response.data.likes

      setRepositories([...repositories])

    }

  }

  async function handleRemoveRepo(id) {
    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if (repoIndex >= 0) {
      
      const updatedRepositories = repositories;
      updatedRepositories.splice(repoIndex, 1);


      await api.delete(`repositories/${id}`);
      setRepositories([...updatedRepositories]);

    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#1F2233'} />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#1F2233', '#303550']}
        style={styles.linearGradient}>
        <SafeAreaView style={styles.container}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#1F2233', '#303550']}
            style={styles.intro}>
            <Image
              style={styles.avatarImage}
              source={Avatar}
            />
            <Text style={styles.title}>Alan Siqueira</Text>
            <Text style={styles.subtitle}>https://github.com/alansiq</Text>

          </LinearGradient>
          <FlatList
            data={repositories}
            keyExtractor={repository => repository.id}
            renderItem={({ item: repository }) => {



              return (
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#1F2233', '#303550']}
                  style={styles.listCard}>

                  <View style={styles.cardContent}>
                    <Text style={styles.title}> {repository.title} </Text>
                    <View style={styles.techWrapper}>
                      {repository.techs.map(tech => (
                        <LinearGradient
                          key={tech}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          colors={['#1F2233', '#303550']}
                          style={styles.techPills}
                        >
                          <Text style={styles.techs}> {tech} </Text>
                        </LinearGradient>
                      ))}

                    </View>

                    <TouchableOpacity testID={`like-button-${repository.id}`} onPress={() => handleLikeRepository(repository.id)}>

                      <Text style={styles.likes} testID={`repository-likes-${repository.id}`}>
                        {repository.likes > 1 ? `${repository.likes} curtidas` : `${repository.likes} curtida`}</Text>
                    </TouchableOpacity>


                  </View>
                  <TouchableOpacity style={styles.deleteWrapper} onPress={() => handleRemoveRepo(repository.id)} style={styles.cardDelete} >
                    <Text style={styles.delete}>X</Text>
                  </TouchableOpacity>

                </LinearGradient>


              )
            }}
          />

          <TouchableOpacity onPress={handleAddRepo} style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>


        </SafeAreaView>
      </LinearGradient>
    </>
  );
}


const whiteText = '#F7F1EF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  linearGradient: {
    flex: 1,
    alignSelf: 'stretch',
  },

  intro: {
    height: 240,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',

  },
  avatarImage: {
    height: 115,
    width: 115,
    borderRadius: 100,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: whiteText,
  },

  subtitle: {
    fontSize: 12,
    color: whiteText,
  },

  listCard: {
    shadowOffset: {
      width: 1,
      height: 12
    },
    shadowOpacity: 0.3,
    shadowRadius: 19.9,
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 8,
    borderRadius: 4,
    flexDirection: 'row',

  },

  cardDelete: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },

  techWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  techPills: {
    padding: 4,
    marginRight: 8,
    marginVertical: 4,
    borderRadius: 16,
  },

  techs: {
    color: '#ffffff',
    marginHorizontal: 4,
  },

  likes: {
    color: '#ffffff',
  },

  deleteWrapper: {
    height: 20,
    width: 20,
    backgroundColor: '#333',
  },

  delete: {
    height: 20,
    width: 20,
    color: '#fff',
  },

  addWrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 72,
    backgroundColor: '#EE233C',
    borderRadius: 100,
  },

  addText: {
    color: whiteText,
    fontSize: 30,
    fontWeight: 'bold',
    
  }




});





{/*
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>

            +++++++++++++++++++++++++++++++++++++++++++++
            +++++++++++++++++++++++++++++++++++++++++++++


            <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
            
            >
              <Text style={styles.buttonText}>
                Curtir
              </Text>
            </TouchableOpacity>



*/}