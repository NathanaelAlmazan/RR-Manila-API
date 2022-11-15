import prismaClient from "../prisma-client";
import { 
    Transaction 
} from "@prisma/client";


// create
export const createTransaction = async (
    parent: unknown,
    args: {
        transaction: Transaction
    }
) => {
    return await prismaClient.transaction.create({
        data: {
            type: args.transaction.type,
            name: args.transaction.name
        }
    })
}

// Fetch
export const getTransactionById = async (
    parent: unknown,
    args: {
        type: string
    }
) => {
    return await prismaClient.transaction.findUnique({
        where: {
            type: args.type
        }
    })
}

export const getTransactionsByCharter = async (uid: string) => {
    const transactions = await prismaClient.charterTransaction.findMany({
        where: {
            charter_uid: uid
        },
        select: {
            Transaction: true
        }
    })

    return transactions.map(t => t.Transaction);
}

export const getAllTransactionType = async () => {
    return await prismaClient.transaction.findMany();
}