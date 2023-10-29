import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { setUserData } from '../../redux/actions/actions'
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash'
const Test = () => {
    const userData = useSelector((state) => state.userData.userData);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isEmpty(userData)) {
            console.log("found") //dashboard
        } else {
            console.log("not found") // login
        }
    }, [userData])
    return (
        <View>
            <Text>Name: {userData}</Text>
            <Button title='Click' onPress={() => {
                dispatch(setUserData('s'));
            }} />
        </View>
    )
}

export default Test