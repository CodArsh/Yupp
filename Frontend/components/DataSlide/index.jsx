import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BaseColors} from '../../config/theme';
import {isNull} from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
const DataSlide = ({lable, bundle, initialValue, onSelect, iconName}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  return (
    <View style={styles.mainBox}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={[
          styles.lableTouch,
          {
            backgroundColor: selectedValue
              ? BaseColors.white40
              : 'rgba(0,0,0,0)',
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {iconName === 'earth' || iconName === 'road' ? (
            <Icon2
              name={iconName}
              size={22}
              color={selectedValue ? BaseColors.secondary : BaseColors.black90}
            />
          ) : (
            <Icon
              name={iconName}
              size={22}
              color={selectedValue ? BaseColors.secondary : BaseColors.black90}
            />
          )}

          <Text
            style={{
              color: selectedValue ? BaseColors.secondary : BaseColors.black90,
            }}>
            &nbsp;
            {isNull(selectedValue) ? lable : selectedValue}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          style={styles.modal}>
          <View style={styles.listStyle}>
            <Text style={styles.lableTag}>{lable}</Text>
            <ScrollView>
              {bundle?.map(item => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => {
                    setSelectedValue(item.value);
                    setOpen(false);
                    onSelect(item.value);
                  }}
                  style={{padding: 10}}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DataSlide;

const styles = StyleSheet.create({
  mainBox: {width: '100%', marginBottom: 25},
  lableTouch: {
    borderWidth: 1,
    paddingVertical: 15,
    borderColor: BaseColors.primaryLight,
    elevation:1,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingHorizontal: 10,
  },
  listStyle: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: BaseColors.white,
    maxHeight: 250,
  },
  lableTag: {
    color: BaseColors.secondary,
    padding: 10,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    borderColor: BaseColors.secondary,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
});
