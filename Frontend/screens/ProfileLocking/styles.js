import {StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

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
export default styles;
