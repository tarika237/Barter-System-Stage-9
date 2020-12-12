import React, { Component } from 'react';
import {View,Text, KeyboardAvoidingView,TextInput,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends Component{
constructor(){
 super();
 this.state={
    emailId:'',
    firstName:'',
    lastName:'',
    address:'',
    contact:'',
    docId:''
 }
}

getData(){
    var user = firebase.auth().currentUser;
    var email= user.email

    db.collection('users').where('username','==',email).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
       var data = doc.data()
       this.setState({
         emailId: data.username,
         firstName:data.first_name,
         lastName:data.last_name,
         address:data.address,
         contact:data.mobile_number,
         docId:doc.id
       })
    });
  })

}

updateData(){

    db.collection('users').doc(this.state.docId)
      .update({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        address:this.state.address,
        contact:this.state.contact,
      })
  }
  
  componentDidMount(){
    this.getData()
  }
  

}