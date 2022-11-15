import { 
    AdditionalRequirement, 
    CitizenCharter, 
    Requirements, 
    TaxpayerRequirements 
} from "@prisma/client";
import { 
    charterSearchSuggestions,
    createCitizenCharter, 
    getCharterRegistriesByCharter, 
    getCitizenCharterByUId, 
    getCitizenCharterList,
    getRelatedCharters,
    searchCitizenCharter
} from "./charter";
import { 
    createOfficeDivision, 
    getAllOfficeDivisions, 
    getOfficeDivisionByCharter 
} from "./officeDivision";
import { 
    createAgentProcess, 
    createClientProcess, 
    getAgentProcessesByCharter, 
    getClientProcessesByCharter 
} from "./process";
import { 
    createAdditionalRequirements, 
    createTaxpayerRequirements, 
    getAdditionalRequirementsByCharter, 
    getRequirementsByAdditional, 
    getRequirementsByTaxpayer, 
    getRequirementSources, 
    getTaxpayerRequirementsByCharter 
} from "./requirements";
import {
    createTransaction, 
    getAllTransactionType, 
    getTransactionsByCharter 
} from "./transactions";


export const resolvers = {
    Query: {
        citizenCharter: getCitizenCharterByUId,
        citizenCharterList: getCitizenCharterList,
        officesDivision: getAllOfficeDivisions,
        transactions: getAllTransactionType,
        relatedCitizenCharters: getRelatedCharters,
        searchCitizenCharter: searchCitizenCharter,
        charterSearchSuggestions: charterSearchSuggestions
    },
    Mutation: {
        createCitizenCharter: createCitizenCharter,
        createOfficeDivision: createOfficeDivision,
        createTransaction: createTransaction,
        createTaxpayerRequirements: createTaxpayerRequirements,
        createAdditionalRequirements: createAdditionalRequirements,
        createClientProcess: createClientProcess,
        createAgentProcess: createAgentProcess
    },
    CitizenCharter: {
        transactions: async (parent: CitizenCharter) => {
            return await getTransactionsByCharter(parent.charter_uid)
        },
        office_division: async (parent: CitizenCharter) => {
            return await getOfficeDivisionByCharter(parent.charter_uid)
        },
        registries: async (parent: CitizenCharter) => {
            return await getCharterRegistriesByCharter(parent.charter_uid)
        },
        client_process: async (parent: CitizenCharter) => {
            return await getClientProcessesByCharter(parent.charter_uid)
        },
        agent_process: async (parent: CitizenCharter) => {
            return await getAgentProcessesByCharter(parent.charter_uid)
        },
        taxpayer_requirements: async (parent: CitizenCharter) => {
            return await getTaxpayerRequirementsByCharter(parent.charter_uid)
        },
        additional_requirements: async (parent: CitizenCharter) => {
            return await getAdditionalRequirementsByCharter(parent.charter_uid)
        },
    },
    TaxpayerRequirements: {
        requirements: async (parent: TaxpayerRequirements) => {
            return await getRequirementsByTaxpayer(parent.taxpayer_id)
        },
    },
    AdditionalRequirement: {
        requirements: async (parent: AdditionalRequirement) => {
            return await getRequirementsByAdditional(parent.add_req_id)
        },
    },
    Requirements: {
        sources: async (parent: Requirements) => {
            return await getRequirementSources(parent.req_id)
        },
    }
}

export { default as typeDefs } from "./typeDefs";