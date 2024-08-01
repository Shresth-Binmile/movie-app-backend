import { mfInputs } from "../interfaces/mf_Interface";

export function mf({success, message, error, data}: mfInputs){
    return {
        success: success,
        message: message,
        error: {} || error,
        data: {} || data
    }
}