import {StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 25,
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
  button: {
    backgroundColor: 'white', // Google Blue
    width:"90%",
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    borderWidth: 1,
    marginBottom:35,
    borderColor: 'rgba(0,0,0,0)',
    elevation:1
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  logo: {
    width: 24, // Set the width and height as per your design
    height: 24,
    marginRight: 10, // Adjust the margin as needed
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default styles;
