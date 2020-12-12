import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyBartersScreen extends Component {
    static navigationOptions = { header: null };

    constructor(){
      super()
      this.state = {
        userId : firebase.auth().currentUser.email,
        allBarters : []
      }
      this.requestRef= null
    }

    getAllBarters =()=>{
        this.requestRef = db.collection("all_Barters").where("donor_id" ,'==', this.state.userId)
        .onSnapshot((snapshot)=>{
          var allBarters = snapshot.docs.map(document => document.data());
          this.setState({
            allBarters : allBarters,
          });
        })
      }
   
      keyExtractor = (item, index) => index.toString()
   
      renderItem = ( {item, i} ) =>(
        <ListItem
          key={i}
          title={item.item_name}
          subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button}>
                <Text style={{color:'#ffff'}}>Exchange</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )

      componentDidMount(){
        this.getAllBarters()
      }
   
      componentWillUnmount(){
        this.requestRef();
      }

      
   
}
