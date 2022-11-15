import {
    getBankAddresses,
    getAccreditedBanksByRdo,
    getBankDetails,
    getDistrictOfficeBanks,
    convertBigIntToInt,
    getAccreditedBanksByAddress
} from "./banks";
import { 
    getBankDistrictOffice, 
    getRevenueDistrictOffices 
} from "./districtOffice";


export const resolvers = {
    Query: {
        revenueDistrictOffices: getRevenueDistrictOffices,
        accreditedBanksByRdo: getAccreditedBanksByRdo,
        bankAddresses: getBankAddresses,
        accreditedBanksByAddress: getAccreditedBanksByAddress
    },
    AccreditedBanks: {
        bank_no: convertBigIntToInt,
        bank_details: getBankDetails,
        rdo_details: getBankDistrictOffice
    },
    RevenueDistrictOffice: {
        accredited_banks: getDistrictOfficeBanks
    }
}

export { default as typeDefs } from "./typeDefs";