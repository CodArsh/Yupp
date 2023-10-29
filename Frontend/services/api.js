import axios from 'axios';
const URL = 'http://192.168.109.45:8080';

export const makeNewAccount_API_CALL = async dataBundle => {
  try {
    return await axios.post(`${URL}/signup`, dataBundle);
  } catch (error) {
    console.log('ERROR WHILE REGISTER NEW ACCOUNT => ', error);
  }
};

export const signinAccount_API_CALL = async dataBundle => {
  try {
    return await axios.post(`${URL}/signin`, dataBundle);
  } catch (error) {
    console.log('ERROR WHILE SIGNIN ACCOUNT => ', error);
  }
};

export const getProfession_API_CALL = async () => {
  try {
    return await axios.get(`${URL}/professions`);
  } catch (error) {
    console.log('ERROR WHILE GET PROFESSIONS => ', error);
  }
};

export const getcountries_API_CALL = async () => {
  try {
    return await axios.get(`${URL}/countries`);
  } catch (error) {
    console.log('ERROR WHILE GET COUNTRIES => ', error);
  }
};

export const getcities_API_CALL = async () => {
  try {
    return await axios.get(`${URL}/cities`);
  } catch (error) {
    console.log('ERROR WHILE GET CITIES => ', error);
  }
};

export const completeProfile_API_CALL = async dataBundle => {
  try {
    return await axios.post(`${URL}/complete-profile`, dataBundle);
  } catch (error) {
    return {message: 'Username already exist', status: false};
  }
};

export const profileDetails_API_CALL = async dataBundle => {
  try {
    return await axios.get(`${URL}/profile-details/${dataBundle}`);
  } catch (error) {
    console.log('ERROR WHILE GET PROFILE DETAILS => ', error);
  }
};

export const updateProfile_API_CALL = async (email, dataBundle) => {
  try {
    return await axios.put(`${URL}/update-profile/${email}`, dataBundle);
  } catch (error) {
    console.log('ERROR WHILE GET UPDATE PROFILE => ', error);
  }
};
export const getAllProfiles_API_CALL = async () => {
  try {
    return await axios.get(`${URL}/profile-details`);
  } catch (error) {
    console.log('ERROR WHILE GET ALL PROFILE DETAILS => ', error);
  }
};

export const follow_API_CALL = async dataBundle => {
  try {
    return await axios.post(`${URL}/follow`, dataBundle);
  } catch (error) {
    return {message: 'ERROR WHILE FOLLOW API', status: false};
  }
};

export const checkFollow_API_CALL = async email => {
  try {
    return await axios.get(`${URL}/check-follow/${email}`);
  } catch (error) {
    console.log('ERROR WHILE GET FOLLOWING DETAILS => ', error);
  }
};

export const post_API_CALL = async dataBundle => {
  try {
    return await axios.post(`${URL}/create-post`, dataBundle);
  } catch (error) {
    return {message: 'ERROR WHILE CREATE POST API', status: false};
  }
};

export const getPost_API_CALL = async () => {
  try {
    return await axios.get(`${URL}/post-list`);
  } catch (error) {
    console.log('ERROR WHILE GET POST LIST => ', error);
  }
};

export const delete_API_CALL = async email => {
  try {
    return await axios.delete(`${URL}/delete/${email}`);
  } catch (error) {
    console.log('ERROR WHILE GET UPDATE PROFILE => ', error);
  }
};
