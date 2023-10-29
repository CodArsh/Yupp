import {StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const styles = StyleSheet.create({
  box: {
    width: '90%',
    backgroundColor: BaseColors.white,
    borderRadius: 10,
    elevation: 3,
    padding: 5,
  },
  outer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: BaseColors.black30,
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  titleUp: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: BaseColors.secondary,
  },
  img: {
    height: 25,
    width: 25,
    borderRadius: 50,
    marginRight: 5,
  },
  inside: {
    flexDirection: 'row',
    marginLeft: 20,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleIn: {
    color: BaseColors.black90,
    marginLeft: 10,
    fontSize: 15,
  },
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
