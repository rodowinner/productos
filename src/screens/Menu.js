import React from 'react';
import { StyleSheet, Button, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Menu = (props) => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>    
            <View style={styles.button}>
                <Button 
                    title="Press me"
                    onPress={() => Alert.alert('Simple Button pressed')}
                />    
            </View>     
            <View style={styles.button}>
                <Button
                    title="Press me"
                    color="#f194ff"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />   
            </View>
            <View style={styles.button}>
                <Button
                    title="Press me"                    
                    onPress={() => navigation.navigate('ListaProductos')}
                />     
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { 
        paddingTop:50,
        paddingBottom:50,
        marginHorizontal: 16,        
      },
    title: {
        textAlign: 'center',
        marginVertical: 8,
      },     
    button:{        
        marginBottom: 10,
        marginTop:10
      }
      
})

export default Menu