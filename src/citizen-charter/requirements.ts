import prismaClient from "../prisma-client";
import { 
    AdditionalRequirement,
    Requirements, 
    Sources, 
    TaxpayerRequirements
} from "@prisma/client";

interface RequirementsByTaxpayer extends TaxpayerRequirements {
    requirements: RequirementsWithSources[]
}

interface AddRequirements extends AdditionalRequirement {
    requirements: RequirementsWithSources[]
}

interface RequirementsWithSources extends Requirements {
    sources: Sources[]
}

export const createTaxpayerRequirements = async (
    parent: unknown,
    args: {
        taxpayer: RequirementsByTaxpayer
    }
) => {
    const taxpayer = await prismaClient.taxpayerRequirements.create({
        data: {
            taxpayer_name: args.taxpayer.taxpayer_name,
            charter_uid: args.taxpayer.charter_uid
        }
    })

    for (let x = 0; x < args.taxpayer.requirements.length; x++) {
        const requirement = args.taxpayer.requirements[x]
        await prismaClient.requirements.create({
            data: {
                taxpayer_id: taxpayer.taxpayer_id,
                req_name: requirement.req_name,
                req_desc: requirement.req_desc,
                notes: requirement.notes ? requirement.notes : undefined,
                type: requirement.type ? requirement.type : undefined,
                additional: requirement.additional ? requirement.additional : undefined,
                sources: {
                    createMany: {
                        data: requirement.sources.map(source => ({
                            src_name: source.src_name,
                            src_desc: source.src_desc
                        }))
                    }
                }
            }
        })
    }

    args.taxpayer.taxpayer_id = taxpayer.taxpayer_id
    return args.taxpayer
}

export const createAdditionalRequirements = async (
    parent: unknown,
    args: {
        req: AddRequirements
    }
) => {
    const addon = await prismaClient.additionalRequirement.create({
        data: {
            condition: args.req.condition,
            charter_uid: args.req.charter_uid
        }
    })

    for (let x = 0; x < args.req.requirements.length; x++) {
        const requirement = args.req.requirements[x]
        await prismaClient.requirements.create({
            data: {
                add_req_id: addon.add_req_id,
                req_name: requirement.req_name,
                req_desc: requirement.req_desc,
                notes: requirement.notes ? requirement.notes : undefined,
                type: requirement.type ? requirement.type : undefined,
                additional: true,
                sources: {
                    createMany: {
                        data: requirement.sources.map(source => ({
                            src_name: source.src_name,
                            src_desc: source.src_desc
                        }))
                    }
                }
            }
        })
    }

    args.req.add_req_id = addon.add_req_id
    return args.req
}

// Fetch
export const getTaxpayerRequirementsByCharter = async (uid: string) => {
    return await prismaClient.taxpayerRequirements.findMany({
        where: {
            charter_uid: uid
        }
    })
}

export const getAdditionalRequirementsByCharter = async (uid: string) => {
    return await prismaClient.additionalRequirement.findMany({
        where: {
            charter_uid: uid
        }
    })
}

export const getRequirementsByTaxpayer = async (id: number) => {
    return await prismaClient.requirements.findMany({
        where: {
            taxpayer_id: id
        },
        orderBy: {
            req_name: 'asc'
        }
    })
}

export const getRequirementsByAdditional = async (id: number) => {
    return await prismaClient.requirements.findMany({
        where: {
            add_req_id: id
        },
        orderBy: {
            req_name: 'asc'
        }
    })
}

export const getRequirementSources = async (id: number) => {
    return await prismaClient.sources.findMany({
        where: {
            req_id: id
        }
    })
}