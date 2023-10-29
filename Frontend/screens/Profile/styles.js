import {StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';
const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: 'rgb(231, 200, 254)'},
  viewAngel: {
    backgroundColor: 'rgb(231, 200, 254)',
    height: 80,
    borderBottomRightRadius: 100,
  },
  sideView: {
    backgroundColor: BaseColors.white,
    minHeight: 900,
    borderTopLeftRadius: 100,
    zIndex: 5,
  },
  upper: {
    zIndex: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: -55,
  },
  img: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
  },
  afterImg: {width: '100%', marginTop: 15, alignItems: 'center'},
  name: {
    fontSize: 25,
    color: BaseColors.secondary,
    fontWeight: 'bold',
  },
  work: {
    fontSize: 15,
    marginTop: 5,
    color: BaseColors.black,
    fontWeight: '500',
  },
  edit: {
    backgroundColor: BaseColors.primaryLight,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 100,
    marginTop: 15,
  },
  connect: {
    height: 40,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColors.secondary,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  favorite: {
    height: 40,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: BaseColors.secondary,
  },
});

export default styles;
