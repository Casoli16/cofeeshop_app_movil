import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import constant from 'expo-constants';
import * as Contantes from '../../utilis/constantes';

const AdminsScreen = ({}) => {
    const [adminData, setAdminData] = useState([]);
    const [idAdmin, setIdAdmin] = useState(0);
    const [nombreAdmin, setNombreAdmin] = useState('');
    const [apellidoAdmin, setApellidoAdmin] = useState('');
    const [correoAdmin, setCorreoAdmin] = useState('');
    const [aliasAdmin, setAlias] = useState('');
    const [claveAdmin, setClave] = useState('');
    const ip = Contantes.IP;
}

const fillCards = async ()=>{
    try {
        const response = await fetch(`${ip}/cofeeshop/api/services/admin/admin.php?action=readAll`, {
            method: 'GET',
        });

        const data = await response.json();

        if(data.status){
            setAdminData(data.dataset);
        }else{
            
        }
    }catch (){

    }
}

export default AdminsScreen;