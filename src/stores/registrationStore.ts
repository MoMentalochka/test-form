import {defineStore} from "pinia";
import {TRegistrationForm} from "../components/TestForm/types.ts";
import axios from "axios";

interface IState {
    isResultModalOpen: boolean;
    isPasswordHide: boolean;
    resultModalContent: TRegistrationForm | null,
    listOfAddresses: [] | null
}

export const useRegistrationStore = defineStore("Registration", {
    state: (): IState => ({
        isResultModalOpen: false,
        isPasswordHide: false,
        resultModalContent: null,
        listOfAddresses: []
    }),
    actions: {
        openModal(){
            this.isResultModalOpen = true
        },
        async search(str: string){
            try {
                const res = await axios(`http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=${str}&languageCode=ru`)
                this.listOfAddresses = res.data.data.map((address: any) => {
                    return {value: address.country + ', ' + address.name}
                })
            } catch (e) {
                console.log('Ошибка загрузки',e)
            }
        }
    }
});
