import {StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  mainTitle: {
    marginTop: 15,
    fontSize: 35,
    color: BaseColors.secondary,
    fontWeight: 'bold',
  },
  tagline: {
    color: BaseColors.black80,
    fontSize: 20,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
export default styles;
