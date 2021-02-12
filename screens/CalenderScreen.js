import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import db from '../firebaseConfig';
import firebase from 'firebase';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: '',
      isDatePressedAndIsModalVisible:false,
      enteredTask:"",
      userEmailId:firebase.auth().currentUser.email,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  sendAddedTasksToFirebase = () =>{
    db.collection('tasks_to_do').add({
        "task_to_be_done":this.state.enteredTask,
        "date":this.state.selectedStartDate.toString(),
        "email_id":this.state.userEmailId,
    }).then(()=>{
        return(
            Alert.alert('Your task has been added to your schedule!')
        );
    }).catch((error)=>{
        var message = error.message;
        return(
            Alert.alert(message)
        );
    })
}
  showModalWhenADateIsPressed = () =>{
    console.log("This function is working");
  return(
    <Modal
      animationType = "fade"
      transparent = {true}
      visible = {this.state.isDatePressedAndIsModalVisible}
    >
      <View style = {{    flex:1,
                          borderRadius:20,
                          justifyContent:'center',
                          alignItems:'center',
                          backgroundColor:"#ffff",
                          marginRight:30,
                          marginLeft : 30,
                          marginTop:80,
                          marginBottom:80,
                          width:'45%',
                          borderWidth:2,
                          borderRadius:10,
                          height:'40%',
                      }}>
         <Text style = {{textAlign:'center'}}> This is some text. </Text>
         <View>
         <TextInput
           onChangeText = {(text)=>{
           this.setState({
             enteredTask:text,
           });
           }}
           placeholder = {"Enter your task here"}
           value = {this.state.enteredTask}
         />
         </View>

           <TouchableOpacity onPress = {()=>{this.sendAddedTasksToFirebase(); this.setState({
             isDatePressedAndIsModalVisible:false,
             enteredTask:'',
           })}} style = {{borderRadius:4, backgroundColor:'white', width:50, height:20, textAlign:'center'}}>
              <Text style = {{color:'blue'}}> Add </Text>
           </TouchableOpacity>
      </View>
    </Modal>
    )
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      isDatePressedAndIsModalVisible:true,
    });
  }
  render() {
    const { selectedStartDate } = this.state.selectedStartDate;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>

          {console.log(startDate)}

        {this.state.isDatePressedAndIsModalVisible ? (this.showModalWhenADateIsPressed()) : (console.log("Modal is not visible"))}

      <View>



        <CalendarPicker
          onDateChange={this.onDateChange}
          minDate = {new Date(2017, 0, 13)}
          selectedDayColor = 'blue'
          selectedDayTextColor = 'white'
          scrollable = {true}
          todayBackgroundColor = "green"
          allowRangeSelection = {true}
        />

      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});