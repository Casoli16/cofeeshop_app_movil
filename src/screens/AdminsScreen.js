import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Contantes from '../../utilis/constantes';
import AdminCard from "../componenets/AdminCard";

const AdminsScreen = ({}) => {
    const [adminData, setAdminData] = useState([]);
    const [idAdmin, setIdAdmin] = useState(0);
    const [nombreAdmin, setNombreAdmin] = useState('');
    const [apellidoAdmin, setApellidoAdmin] = useState('');
    const [correoAdmin, setCorreoAdmin] = useState('');
    const [aliasAdmin, setAlias] = useState('');
    const [claveAdmin, setClave] = useState('');
    const ip = Contantes.IP;


// Efecto para cargar los detalles del carrito al cargar la pantalla
useEffect(() => {
    fillCards();
}, []);

// Funcion para obtener los detalles del carrito desde servidor
const fillCards = async ()=>{
    try {
        const response = await fetch(`${ip}/cofeeshop/api/services/admin/admin.php?action=readAll`, {
            method: 'GET',
        });

        const data = await response.json();

        if(data.status){
            setAdminData(data.dataset);
        }else{
          Alert.alert('Warning', data.error);
        }
    }catch (error){
        console.error(error, 'Error desde catch');
        Alert.alert('Error productos', data.error)
    }

    const renderItem = ({ item }) => (
        <AdminCard
            item={item}
            loadedCards={fillCards}
        />
    );
    }
}

export default AdminsScreen;