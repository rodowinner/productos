import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image
} from 'react-native';


import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const ListaProductos = (props) => {

    const [products, setProducts] = useState([]) 
  
    useEffect(() => {
        getProducts()
      }, [])
  
      const getProducts = () => {

        firestore()
        .collection('products')
        .get()
        .then(async (fProducts) => {
          let tempProducts = []
          let promiseImages = []
         
          fProducts.forEach(fProduct => {
            tempProducts.push(fProduct.data())
            promiseImages.push(storage().ref(fProduct.data().image).getDownloadURL())
            //promiseImages.push(storage().ref(fProduct.data().image) === null ? storage().ref('default.jpg').getDownloadURL():storage().ref(fProduct.data().image).getDownloadURL())
            console.log('products', fProduct.data())
          })
    
          const resultPromises = await Promise.all(promiseImages)
    
          resultPromises.forEach((url, index) => {
            tempProducts[index].image = url
          })
    
          setProducts(tempProducts)
        })  
      }

      const ItemProduct = ({ item }) => {
        return (
          <View style={styles.containerItem}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text style={styles.itemProductName}>{item.name}</Text>
            <Text style={styles.itemProductPrice}>{item.price}Bs.</Text>
          </View>
        )
      }


      return (              
          <FlatList 
            data={products}
            renderItem={ItemProduct}
          />       
      );
  }
  
  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    containerItem: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'white',
      margin: 10,
      elevation: 5,
      borderRadius: 5,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    itemProductName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000'
    },
    itemProductPrice: {
      fontWeight: 'bold',
      fontSize: 15,
      color: '#000'
    }
  });
  
  export default ListaProductos