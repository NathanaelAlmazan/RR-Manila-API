import prismaClient from "../prisma-client";
import { 
    CharterRegistry,
    CitizenCharter
} from "@prisma/client";

interface CharterInput extends CitizenCharter {
    offices: string[];
    transactions: string[];
    registries: CharterRegistry[];
}

// Create 
export const createCitizenCharter = async (
    parent: unknown, 
    args: {
        charter: CharterInput
    }
) => {
    return await prismaClient.citizenCharter.create({
        data: {
            title: args.charter.title,
            description: args.charter.description,
            classification: args.charter.classification,
            CharterOfficeDivision: {
                create: args.charter.offices.map(office => ({
                    office_code: office
                }))
            },
            CharterTransaction: {
                create: args.charter.transactions.map(type => ({
                    trans_type: type
                }))
            },
            CharterRegistry: {
                createMany: {
                    data: args.charter.registries.map(registry => ({
                        classification: registry.classification,
                        register_office: registry.register_office
                    }))
                }
            },
            total_duration: args.charter.total_duration,
            total_fee: args.charter.total_fee
        }
    })
}

// Fetch
export const getCitizenCharterByUId = async (
    parent: unknown,
    args: {
        uid: string
    }
) => {
    return await prismaClient.citizenCharter.findUnique({
        where: {
            charter_uid: args.uid
        }
    })
}

export const getCharterRegistriesByCharter = async (uid: string) => {
    return await prismaClient.charterRegistry.findMany({
        where: {
            charter_uid: uid
        }
    })
}

export const getCitizenCharterList = async () => {
    return await prismaClient.citizenCharter.findMany();
}

export const getRelatedCharters = async (
    parent: unknown,
    args: {
        uid: string
    }
) => {
    return await prismaClient.citizenCharter.findMany({
        where: {
            NOT: {
                charter_uid: args.uid
            }
        },
        orderBy: {
            title: 'desc'
        },
        take: 4
    })
}

export const searchCitizenCharter = async (
    parent: unknown,
    args: {
        query: string;
    }
) => {
    return await prismaClient.citizenCharter.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: args.query.toLowerCase(),
                        mode: 'insensitive'
                    },
                },
                {
                    description: {
                        contains: args.query.toLowerCase(),
                        mode: 'insensitive'
                    }
                }
            ]
        }
    });
}

export const charterSearchSuggestions = async (
    parent: unknown,
    args: {
        query: string;
    }
) => {
    const charters = await prismaClient.citizenCharter.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: args.query.toLowerCase(),
                        mode: 'insensitive'
                    },
                },
                {
                    description: {
                        contains: args.query.toLowerCase(),
                        mode: 'insensitive'
                    }
                }
            ]
        },
        select: {
            title: true
        }
    });

    return charters.map(charter => charter.title)
}