import {StyleSheet} from 'react-native';
import AppColors from '../themes/AppColors';

const styles = StyleSheet.create({
  linearGradient: {
    height: '55%',
    borderBottomWidth:1,
    borderBottomColor:'#74B4D5'
  },

  RootContainer: {
    flex: 1,
  },

  callSvg: {marginTop: 75, alignItems: 'center', marginBottom: 50},

  messageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 12,
    width: '80%',
  },

  message: {
    fontSize: 16,
    color: AppColors.white,
  },

  PhoneInputContainer: {
    height: '23%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 50,
    justifyContent: 'flex-start',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
    borderColor: AppColors.white,
    borderWidth: 1.8,
    borderRadius: 6,
  },

  flagCodeContainer: {
    borderRightWidth: 2,
    borderColor: AppColors.white,
    height: '100%',
    alignItems: 'center',
  },

  inputStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: AppColors.white,
    padding: 4,
    marginLeft: 8,
    marginTop: 0.2,
  },

  listStyle: {
    height: 0.3,
    width: '90%',
    backgroundColor: '#080808',
  },

  closeBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },

  InviteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  InviteButton: {
    width: '75%',
    height: 45,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 8,
    alignContent:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  InviteText: {
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
    color: AppColors.btnTextColor,
  },

  FormContainer: {
    width: '100%',
    height: 190,
    flexDirection: 'column',
  },
  FormInput: {
    marginBottom: -15,
    margin: 10,
    width: '55%',
  },

  flagIcon: {fontSize: 23, marginLeft: 15},

  iconStyle: {
    color: '#ffff',
    fontSize: 28,
    marginLeft: 15,
  },

  itemStyle: {
    width: '100%',
    margin: 20,
    marginBottom: 10,
  },

  inputflag: {
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
    color: AppColors.white,
  },

  textStyle: {
    padding: 5,
    fontSize: 20,
    color: AppColors.btnTextColor,
    fontWeight: 'bold',
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 10,
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#999',
  },

  linearGradientBottom: {
    height: '100%',
    alignItems:'center'
  },

  BottomRootContainer: {flex: 1},

  calendarSvg: {marginTop: 70, alignItems: 'center', marginBottom: 40},
});

export default styles;
