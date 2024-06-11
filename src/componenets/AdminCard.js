import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Alert, Modal} from "react-native";
import Constants from "expo-constants";
import * as API from '../../utilis/constantes';
import {TextInput} from "react-native-paper";

//Funcion que recibe como parametro el item y el loadedCards
const AdminCard = ({item, loadedCards, updateList}) => {
    //Declaracion de variables a utilizar y le pasamos la informacion traida de la api para que aparezca en los inputs.
    const [idAdmin, setIdAdmin] = useState(0);
    const [nombreAdmin, setNombreAdmin] = useState(item.nombre_administrador);
    const [apellidoAdmin, setApellidoAdmin] = useState(item.apellido_administrador);
    const [correoAdmin, setCorreoAdmin] = useState(item.correo_administrador);
    const [aliasAdmin, setAliasAdmin] = useState(item.alias_administrador);

    //Declaracion de variable para el modal
    const [modalVisible, setModalVisible] = useState(false);

    const ip = API.IP;

    //Funcion para eliminar un administrador
    const deleteAdmin = async (idAdmin) => {
        const formData = new FormData();
        //Mandamos el form con el id admin que se ha pasado.
        formData.append('idAdministrador', idAdmin);
        // Mandamos la peticion a la api
        const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=deleteRow`,{
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if(data.status) {
            Alert.alert('Administrados eliminado correctamente');
            //Actualizamos nuestra lista
            updateList(prevData=>prevData.filter(item => item.id_administrador !== idAdmin));
        } else {
            Alert.alert('Ocurrió un error al eliminar al administrador', data.error);
        }
    }

    //Funcion para actualizar un administrador
    const updateAdmin = async (idAdmin) => {
        const formData = new FormData();
        formData.append('idAdministrador', idAdmin);
        formData.append('nombreAdministrador', nombreAdmin);
        formData.append('apellidoAdministrador', apellidoAdmin);
        formData.append('correoAdministrador', correoAdmin);

        const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=updateRow`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.status){
            Alert.alert('Éxito', data.message);
            setModalVisible(false);
            updateList(prevData=>prevData.filter(item => item.id_administrador));
        } else{
            Alert.alert('Error', data.error);
        }
    }

    return (
        //Accedemos la informacion que viene de la api.
        <View style={styles.itemContainer}>
            <Text>ID: {item.id_administrador}</Text>
            <Text>Nombre: {item.nombre_administrador}</Text>
            <Text>Apellido : {item.apellido_administrador}</Text>
            <Text>Correo: {item.correo_administrador}</Text>

            <TouchableOpacity style={styles.deleteButton} onPress={()=> deleteAdmin(item.id_administrador)}>
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateButton} onPress={()=> setModalVisible(true)}>
                <Text style={styles.buttonText}>Actualizar</Text>
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
                            editable={false}
                            label='Alias'
                            value= {aliasAdmin}
                            style={styles.input}
                        />
                        <View>
                            <TouchableOpacity style={styles.addButton} onPress={()=>{updateAdmin(item.id_administrador)}}>
                                <Text style={styles.textWhite}>Actualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addButton} onPress={()=>{setModalVisible(false)}}>
                                <Text style={styles.textWhite}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}
export default AdminCard;

//Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        backgroundColor: '#f8eded',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    deleteButton: {
        marginTop: 15,
        padding:10,
        backgroundColor: '#e53232',
    },
    updateButton: {
        marginTop: 15,
        padding:10,
        backgroundColor: '#07b72b',
    },
    buttonText: {
        color: '#fff'
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
    addButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#7c08e8',
        marginBottom: 10,
        borderRadius: 10
    },
    textWhite: {
        color: '#fff'
    },
})