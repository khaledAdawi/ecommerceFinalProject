import i18n from "../i18n";
import useFetch from "./useFetch";
import axiosAuthInstance from "../Api/axiosAuthInstance";

export function useProfile (){

    return useFetch(['profile', i18n.language || 'en'],'/Profile',axiosAuthInstance);
    
}