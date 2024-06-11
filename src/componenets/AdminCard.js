import React, {useEffect} from "react";
import {Text, View, StyleSheet} from "react-native";
import Constants from "expo-constants";
import * as API from '../../utilis/constantes';

const AdminCard = ({item}) => {

    const api = API.IP;

    useEffect(() => {

    }, []);
    return (
        <View style={styles.itemContainer}>
            <Text>ID: {item.id_administrador}</Text>
            <Text>Nombre: {item.nombre_administrador}</Text>
            <Text>Apellido : {item.apellido_administrador}</Text>
            <Text>Correo: {item.correo_administrador}</Text>
        </View>
    );
}
export default AdminCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E',
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    }
})