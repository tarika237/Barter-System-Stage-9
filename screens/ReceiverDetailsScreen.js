import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config.js';

export default class ReceiverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
          userId          : firebase.auth().currentUser.email,
          userName          :'',
          receiverId      : this.props.navigation.getParam('details')["username"],
          exchangeId       : this.props.navigation.getParam('details')["exchangeId"],
          itemName        : this.props.navigation.getParam('details')["item_name"],
          description  : this.props.navigation.getParam('details')["description"],
          receiverName    : '',
          receiverContact : '',
          receiverAddress : '',
          receiverRequestDocId : ''
        }
      } 

      getreceiverDetails(){
        console.log("receiver ",this.state.receiverId);
        db.collection('users').where('username','==',this.state.receiverId).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.setState({
              receiverName    : doc.data().first_name,
              receiverContact : doc.data().mobile_number,
              receiverAddress : doc.data().address,
            })
          })
        });
      
        db.collection('exchange_requests').where('exchangeId','==',this.state.exchangeId).get()
        .then(snapshot=>{
          snapshot.forEach(doc => {
            this.setState({receiverRequestDocId:doc.id})
         })
      })}
      
      updateBarterStatus=()=>{
        db.collection('all_Barters').add({
          item_name           : this.state.itemName,
          exchange_id          : this.state.exchangeId,
          requested_by        : this.state.receiverName,
          donor_id            : this.state.userId,
          request_status      :  "Donor Interested"
        })
      }

      addNotification=()=>{
        console.log("in the function ",this.state.rec)
        var message = this.state.userName + " has shown interest in exchanging the item"
        db.collection("all_notifications").add({
          "targeted_user_id"    : this.state.receiverId,
          "donor_id"            : this.state.userId,
          "exchangeId"          : this.state.exchangeId,
          "item_name"           : this.state.itemName,
          "date"                : firebase.firestore.FieldValue.serverTimestamp(),
          "notification_status" : "unread",
          "message"             : message
        })
      }
    
      
}