import {StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const styles = StyleSheet.create({
  main: {
    height: 80,
    marginTop: 5,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#caa9fc',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  round: {
    backgroundColor: BaseColors.white,
    borderRadius: 50,
    elevation: 2,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: BaseColors.secondary,
  },
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    backgroundColor: BaseColors.secondary,
    position: 'absolute',
  },
});
export default styles;
