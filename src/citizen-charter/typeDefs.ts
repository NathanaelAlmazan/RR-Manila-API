const typeDefs=`
    extend type Query {
        citizenCharter(uid: String!): CitizenCharter
        citizenCharterList: [CitizenCharter]
        transactions: [Transaction]
        officesDivision: [OfficeDivision]
        relatedCitizenCharters(uid: String!): [CitizenCharter]
        searchCitizenCharter(query: String!): [CitizenCharter]
        charterSearchSuggestions(query: String!): [String]
    }
    
    extend type Mutation {
        createCitizenCharter(charter: CitizenCharterInput!): CitizenCharter
        createOfficeDivision(office: OfficeDivisionInput!): OfficeDivision
        createTransaction(transaction: TransactionInput!): Transaction
        createTaxpayerRequirements(taxpayer: TaxpayerInput!): TaxpayerRequirements
        createAdditionalRequirements(req: AdditionalRequirementInput!): AdditionalRequirement
        createClientProcess(process: [ClientProcessInput!]!): [ClientProcess]
        createAgentProcess(process: [AgentProcessInput!]!): [AgentProcess]
    }

    input TransactionInput {
        type: String!
        name: String!
    }

    type Transaction {
        type: String!
        name: String!
    }

    input OfficeDivisionInput {
        code: String!
        name: String!
    }

    type OfficeDivision {
        code: String!
        name: String!
    }

    input CitizenCharterInput {
        title: String!
        description: String!
        classification: String!
        total_duration: String
        total_fee: Float
        offices: [String!]!
        transactions: [String!]!
        registries: [CharterRegistryInput!]!
    }

    type CitizenCharter {
        charter_uid: String!
        title: String!
        description: String!
        classification: String!
        total_duration: String
        total_fee: Float
        office_division: [OfficeDivision]
        transactions: [Transaction]
        registries: [CharterRegistry]
        client_process: [ClientProcess]
        agent_process: [AgentProcess]
        taxpayer_requirements: [TaxpayerRequirements]
        additional_requirements: [AdditionalRequirement]
    }

    input CharterRegistryInput {
        classification: String!
        register_office: String!
    }

    type CharterRegistry {
        registry_id: Int! 
        classification: String !
        register_office: String! 
        charter_uid: String! 
    }

    input TaxpayerInput {
        taxpayer_name: String!
        charter_uid: String!
        requirements: [RequirementsInput!]!
    }

    type TaxpayerRequirements {
        taxpayer_id: Int!
        taxpayer_name: String!
        charter_uid: String!
        requirements: [Requirements]
    }

    input RequirementsInput {
        req_name: String!
        req_desc: String!  
        notes: String 
        type: String
        additional: Boolean
        sources: [SourcesInput!]!
    }

    input AdditionalRequirementInput {
        condition: String!
        charter_uid: String!
        requirements: [RequirementsInput!]!
    }

    type AdditionalRequirement {
        add_req_id: Int!
        condition: String!
        charter_uid: String!
        requirements: [Requirements]
    }

    type Requirements {
        req_id: Int!
        req_name: String!
        req_desc: String!  
        notes: String
        type: String
        additional: Boolean
        taxpayer_id: Int
        add_req_id: Int
        sources: [Sources]
    }

    input SourcesInput {
        src_name: String!
        src_desc: String
    }

    type Sources {
        src_id: Int!
        src_name: String!
        src_desc: String
    }

    type ClientProcess {
        process_step: Float!
        charter_uid: String!
        step_desc: String!
        notes: String
        fees: Float
        duration: String
        personnel: String
    }

    input ClientProcessInput {
        process_step: Float!
        charter_uid: String!
        step_desc: String!
        notes: String
        fees: Float
        duration: String
        personnel: String
    }

    type ClientProcess {
        process_step: Float!
        charter_uid: String!
        step_desc: String!
        notes: String
        fees: Float
        duration: String
        personnel: String
    }

    input AgentProcessInput {
        process_step: Float!
        charter_uid: String!
        step_desc: String!
        duration: String
        personnel: String
    }
      
    type AgentProcess {
        process_step: Float!
        charter_uid: String!
        step_desc: String!
        duration: String
        personnel: String
    }
`;

export default typeDefs;