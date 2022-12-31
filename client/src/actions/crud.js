import { COMPL, FETCH,AL,PAYMENT ,URL,VER, MESSCOMPL ,WCOMPL, AUTH, WUPDT, REVIEW, SOLV, ALLOT, EM, FETCHPAY} from '../constants/actionTypes';
import * as api from '../api';


export const comp = (formData) => async (dispatch) => {

  try {
    console.log(formData);
      const data  = await api.complaint(formData);
      console.log(data);
      dispatch({ type : COMPL, payload :data});

  }
  catch(error){
      console.log(error.message);
  }
}



export const urlss = (formData) => async (dispatch) => {

  try {
    console.log(formData);
      const data  = await api.fetchurls(formData);
      console.log(data);
      dispatch({ type : URL, payload :data});

  }
  catch(error){
      console.log(error.message);
  }
}


  export const signin = (formData, router) => async (dispatch) => {
    try {
      console.log(formData);
      const data = await api.signIn(formData);
      console.log(data);
      dispatch({ type: AUTH,payload: data.data});
      router.push('/');
    } catch (error) {
      // alert("invalid!  ");  
      console.log(error.message);
    }
  };

  export const signup = (formData, router) => async (dispatch) => {
    try {
      console.log(formData);
      const data = await api.signUp(formData);
      console.log(data);
      dispatch({ type: AUTH,payload: data.data});
      router.push('/');
  
    } catch (error) {
      // alert("invalid!  ");  
      console.log(error.message);
    }
  };