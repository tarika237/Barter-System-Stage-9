import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class Exchange extends Component {

    constructor(){
      super()
      this.state = {
        userName : firebase.auth().currentUser.email,
        itemName : "",
        description : "",
        requestedItemName:"",
        exchangeId:"",
        itemStatus:"",
        docId: "",
        itemValue:"",
        currencyCode:""
  
      }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
    
      addItem= async(itemName, description)=>{
    
        var userName = this.state.userName
        var exchangeId = this.createUniqueId()
        console.log("im called",exchangeId);
        db.collection("exchange_requests").add({
          "username"    : userName,
          "item_name"   : itemName,
          "description" : description,
          "exchangeId"  : exchangeId,
          "item_status" : "requested",
          "item_value"  : this.state.itemValue,
            "date"       : firebase.firestore.FieldValue.serverTimestamp()
    
         })
}

}