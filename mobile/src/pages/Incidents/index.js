import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function Incidents () {
    const [incidents, setIncidents] = useState([]);
    const navigation = useNavigation();

    function navigateToDetail() {
        navigation.navigate('Detail');
    }

    async function loadIncidents() {
        const response = await api.get('incidents');
        console.log(response);
        setIncidents(response.data);
    }

    useEffect(() => {
        loadIncidents()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Seja bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor</Text>
                        <Text style={styles.incidentValue}>{incident.value}</Text>
                        
                        <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetail}>
                            <Text>
                                Ver Mais Detalhes
                            </Text>
                            <Feather name="arrow-right" size={16} color='#E02041'/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}