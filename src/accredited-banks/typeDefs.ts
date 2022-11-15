const typeDef = `
    extend type Query {
        revenueDistrictOffices: [RevenueDistrictOffice!]!
        accreditedBanksByRdo(rdo: Int!): [AccreditedBanks!]
        bankAddresses(query: String!): [String!]
        accreditedBanksByAddress(address: String!): [AccreditedBanks!]
    }

    type AccreditedBanks {
        bank_no: Int!
        rr_no: Int!
        rdo_no: Int!
        bank_code: String!
        bank_abbr: String!
        bank_branch: String!
        bldg_no: String
        street: String!
        district: String!
        city: String!
        bank_details: BankDetails
        rdo_details: RevenueDistrictOffice
    }

    type RevenueDistrictOffice {
        rdo_no: Int!
        rdo_name: String!
        accredited_banks: [AccreditedBanks!]
    }

    type BankDetails {
        bank_abbr: String!
        bank_name: String!
        bank_logo: String
        bank_locations: [AccreditedBanks!]
    }
`;

export default typeDef;