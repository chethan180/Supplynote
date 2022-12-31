import { URL } from '../constants/actionTypes';

export default (ap = [], action) => {
    switch(action.type ){
        case URL:
            {
                console.log(action.payload);
                // return {...crud ,data: action.payload};
                return action.payload;
            }
        default : 
        {
            return ap;
        }
    }
}