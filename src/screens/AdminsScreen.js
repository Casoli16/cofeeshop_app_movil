import React, {useState, useEffect} from 'react';
import {Text, Button, View, StyleSheet, FlatList, Alert, TouchableOpacity, Modal} from 'react-native';
import {TextInput} from 'react-native-paper';
import Constants from 'expo-constants';
import * as Contantes from '../../utilis/constantes';
import AdminCard from "../componenets/AdminCard";

const AdminsScreen = () => {
    //Declaracion de variables a utilizar.
    const [adminData, setAdminData] = useState([]);
    const [idAdmin, setIdAdmin] = useState(0);
    const [nombreAdmin, setNombreAdmin] = useState('');
    const [apellidoAdmin, setApellidoAdmin] = useState('');
    const [correoAdmin, setCorreoAdmin] = useState('');
    const [aliasAdmin, setAliasAdmin] = useState('');
    const [claveAdmin, setClaveAdmin] = useState('');
    const [repetirClaveAdmin, setRepetirClave] = useState('');

    //Declaracion de variable para el modal
    const [modalVisible, setModalVisible] = useState(false);

    //Declaracion de variable para la ip
    const ip = Contantes.IP;


// Efecto para cargar los detalles del carrito al cargar la pantalla
useEffect(() => {
    fillCards();
}, []);

// Funcion para obtener los detalles del carrito desde servidor
const fillCards = async ()=>{
    // Mandamos la peticion al servidor
    try {
        const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=readAll`, {
            method: 'GET',
        });

        // Obtenemos la respuesta de la api y la convertimos a json.
        const data = await response.json();

        // Revisamos si la respuesta fue exitosa, de ser asi entonces le pasamos nuestra data a la variable setAadminData, pero si no solo mostrara
        // un mensaje de error.
        if(data.status){
            setAdminData(data.dataset);
        }else{
          Alert.alert('Warning', data.error);
        }
    }catch (error){
        console.error(error, 'Error desde catch');
        Alert.alert('Error productos', data.error)
    }
}

//Funcion para renderizar cala elemento del carrito
    const renderItem = ({ item }) => (
        // Le pasamos nuestro componente de AdminCard que recibe como parametros
        // el item y loadCard(Funcion para mandar la peticion a la api)
        <AdminCard
            item={item}
            loadedCards={fillCards}
            updateList={setAdminData}
        />
    );

//Funcion para limpiar los campos de los input
    const clearInput = () => {
        setNombreAdmin(' ');
        setApellidoAdmin(' ');
        setCorreoAdmin(' ');
        setAliasAdmin(' ');
        setClaveAdmin(' ');
        setRepetirClave(' ');
    }

    const createAdmin = async () => {
        const formData = new FormData();
        formData.append('nombreAdministrador', nombreAdmin);
        formData.append('apellidoAdministrador', apellidoAdmin);
        formData.append('correoAdministrador', correoAdmin);
        formData.append('aliasAdministrador', aliasAdmin);
        formData.append('claveAdministrador', claveAdmin);
        formData.append('confirmarClave', repetirClaveAdmin);

        const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=createRow`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.status){
            Alert.alert('Éxito', data.message);
            setModalVisible(false);
            await clearInput();
            await fillCards();

        } else{
            Alert.alert('Error', data.error);
        }
    }


// Mostramos las cards con la informacion de los admin en nuestra pantalla
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Haz clic en el siguiente botón para poder agregar un administrador</Text>

            <TouchableOpacity style={styles.createButton} onPress={()=> {setModalVisible(true)}}>
                <Text style={styles.textWhite}>Agregar administrador</Text>
            </TouchableOpacity>

            {/*MODAL*/}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible)}}>

                <View style={styles.modalCenter}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Agregar Administrador</Text>
                        <TextInput
                            label='Nombre'
                            value= {nombreAdmin}
                            onChangeText={setNombreAdmin}
                            style={styles.input}
                        />
                        <TextInput
                            label='Apellido'
                            value= {apellidoAdmin}
                            onChangeText={setApellidoAdmin}
                            style={styles.input}
                        />
                        <TextInput
                            label='Correo'
                            value= {correoAdmin}
                            onChangeText={setCorreoAdmin}
                            style={styles.input}
                            keyboardType={"email-address"}
                        />
                        <TextInput
                            label='Alias'
                            value= {aliasAdmin}
                            onChangeText={setAliasAdmin}
                            style={styles.input}
                        />
                        <TextInput
                            label='Clave'
                            value= {claveAdmin}
                            onChangeText={setClaveAdmin}
                            style={styles.input}
                            secureTextEntry={true}
                        />
                        <TextInput
                            label='Repetir clave'
                            value= {repetirClaveAdmin}
                            onChangeText={setRepetirClave}
                            style={styles.input}
                            secureTextEntry = {true}
                        />

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.addButton} onPress={()=>{createAdmin()}}>
                                <Text style={styles.textWhite}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={()=>{setModalVisible(false)}}>
                                <Text style={styles.textWhite}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/*Revisamos si el adminData(Donde se guarda la informacion que viene de la api) viene con informacion*/}
            {adminData.length > 0 ? (
                <FlatList style={styles.listStyle}
                    // Pasamos la informacion que se trajo de la api
                    data={adminData}
                    //Le pasamos nuestro componente personalizado de card.
                    renderItem={renderItem}
                    // Permitira identificar de forma unica cada elemento de la lista
                    keyExtractor={(item) => item.id_administrador.toString()} />
            ) : (
                <Text>Ocurrió un error al obtener los datos</Text>
            )}
        </View>
    );

}

export default AdminsScreen;

//Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E',
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    addButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#7c08e8',
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 120
    },
    createButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#7c08e8',
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 10,

    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e53232',
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 120
    },
    textWhite: {
        color: '#fff',
        textAlign: "center"
    },
    modalContainer: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalCenter: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 15
    },
    textTitle: {
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 5
    },
    listStyle: {
        marginVertical: 20
    }
});