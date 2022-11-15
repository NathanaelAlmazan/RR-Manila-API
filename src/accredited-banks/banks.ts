import { AccreditedBank, RevenueDistrictOffice } from "@prisma/client";
import prismaClient from "../prisma-client";

export const getBankAddresses = async (parent: unknown, args: { query: string }) => {
    const address = args.query.split(' ').filter(a => !a.includes('.'));

    const streets = await prismaClient.accreditedBank.findMany({
        where: {
            OR: address.map(a => ({
                    street: {
                        contains: a,
                        mode: 'insensitive'
                    }
                }))
        },
        select: {
            street: true,
            district: true
        }
    })

    const districts = await prismaClient.accreditedBank.findMany({
        where: {
            OR: address.map(a => ({
                    district: {
                        contains: a,
                        mode: 'insensitive'
                    }
                }))
        },
        select: {
            district: true
        }
    })

    const addresses: string[] = []

    districts.forEach(b => {
        if (!addresses.find(a => a === b.district)) {
            addresses.push(b.district)
        }
    })

    streets.forEach(b => {
        const address = [b.street, b.district].join(', ')

        if (!addresses.find(a => a === address)) {
            addresses.push(address)
        }
    })

    return addresses;
}

export const getAccreditedBanksByAddress = async (parent: unknown, args: { address: string }) => {
    const address = args.address.split(', ');

    if (address.length > 1) return await prismaClient.accreditedBank.findMany({
        where: {
            AND: [
                {
                    street: {
                        contains: address[0],
                        mode: 'insensitive'
                    }
                },
                {
                    district: {
                        contains: address[1],
                        mode: 'insensitive'
                    }
                }
            ]
        }
    })

    let banks = await prismaClient.accreditedBank.findMany({
        where: {
            district: {
                contains: address[0],
                mode: 'insensitive'
            } 
        }
    })

    if (banks.length === 0) {
        banks = await prismaClient.accreditedBank.findMany({
            where: {
                street: {
                    contains: address[0],
                    mode: 'insensitive'
                } 
            }
        })
    }

    return banks
}

export const getAccreditedBanksByRdo = async (parent: unknown, args: { rdo: number }) => {
    return await prismaClient.accreditedBank.findMany({
        where: {
            rdo_no: args.rdo
        }
    })
}

export const getBankDetails = async (parent: AccreditedBank) => {
    return await prismaClient.bankDetails.findUnique({
        where: {
            bank_abbr: parent.bank_abbr
        }
    })
}

export const getDistrictOfficeBanks = async (parent: RevenueDistrictOffice) => {
    return await prismaClient.accreditedBank.findMany({
        where: {
            rdo_no: parent.rdo_no
        }
    })
}

export const convertBigIntToInt = (parent: AccreditedBank): number => {
    return parseInt(parent.bank_no.toString())
}