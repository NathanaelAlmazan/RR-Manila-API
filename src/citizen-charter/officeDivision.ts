import prismaClient from "../prisma-client";
import { 
    OfficeDivision 
} from "@prisma/client";

// Create
export const createOfficeDivision = async (
    parent: unknown,
    args: {
        office: OfficeDivision
    }
) => {
    return await prismaClient.officeDivision.create({
        data: {
            code: args.office.code,
            name: args.office.name
        }
    })
}

// Fetch
export const getOfficeDivisionById = async (
    parent: unknown,
    args: {
        code: string
    }
) => {
    return await prismaClient.officeDivision.findUnique({
        where: {
            code: args.code
        }
    })
}

export const getOfficeDivisionByCharter = async (uid: string) => {
    const offices = await prismaClient.charterOfficeDivision.findMany({
        where: {
            charter_uid: uid
        },
        select: {
            OfficeDivision: true
        }
    })

    return offices.map(o => o.OfficeDivision)
}

export const getAllOfficeDivisions = async () => {
    return await prismaClient.officeDivision.findMany();
}