import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {BaseColors} from '../../config/theme';
import {Button} from 'react-native-paper';

const CModal = ({
  title,
  description,
  isModalVisible,
  setModalVisible,
  transferData,
  feedSpecial,
}) => {
  const sendToParent = () => {
    transferData(true);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        toggleModal();
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modal}
        onPress={() => toggleModal()}>
        <View style={styles.modalCard}>
          {!feedSpecial ? (
            <>
              <Text style={styles.titleM}>{title}</Text>
              <Text style={styles.descM}>{description}</Text>
            </>
          ) : (
            <View style={{width: '90%'}}>
              <Text style={[styles.titleM, {marginVertical: 10}]}>
                Feedback
              </Text>
              <TextInput
                multiline
                style={{
                  height: 100,
                  textAlignVertical: 'top',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: BaseColors.secondary,
                }}
              />
            </View>
          )}
          {!feedSpecial ? (
            <View style={styles.btnM}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Button
                  style={{width: 100, paddingVertical: 5, borderRadius: 50}}
                  mode="outlined">
                  No
                </Button>
              </TouchableOpacity>

              <TouchableOpacity onPress={sendToParent}>
                <Button
                  style={{width: 100, paddingVertical: 5, borderRadius: 50}}
                  mode="contained">
                  Yes
                </Button>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{width: '90%', marginVertical: 15}}
              onPress={sendToParent}>
              <Button
                style={{width: '100%', paddingVertical: 5, borderRadius: 5}}
                mode="contained">
                Submit
              </Button>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    alignItems: 'center',
    borderTopRightRadius: 20,
    padding: 16,
  },
  titleM: {
    fontSize: 23,
    color: BaseColors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descM: {
    fontSize: 18,
    marginTop: 12,
    color: BaseColors.black90,
    textAlign: 'center',
    marginBottom: 20,
  },
  btnM: {
    flexDirection: 'row',
    width: '55%',
    marginVertical: 15,
    justifyContent: 'space-between',
  },
});
