import { COMPL } from '../constants/actionTypes';

export default (compl = [], action) => {
    switch(action.type ){
        case COMPL:
            {
                console.log(action.payload);
                // return {...crud ,data: action.payload};
                return action.payload;
            }
        default : 
        {
            return compl;
        }
    }
}