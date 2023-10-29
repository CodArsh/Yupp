import {StyleSheet} from 'react-native';
import { BaseColors } from '../../config/theme';

const styles = StyleSheet.create({
  list: {
    height: 80,
    width:"100%",
    borderBottomWidth:1,
    borderBottomColor:BaseColors.black20,
    alignItems:'center',
    // justifyContent:'center',
    paddingHorizontal:15,
    flexDirection:'row'
  },
});
export default styles;
