import {
    ClientProcess,
    AgentProcess
} from "@prisma/client";
import prismaClient from "../prisma-client";

export const createClientProcess = async (
    parent: unknown,
    args: {
        process: ClientProcess[]
    }
) => {
    await prismaClient.clientProcess.createMany({
        data: args.process.map(p => ({
            process_step: p.process_step,
            step_desc: p.step_desc,
            notes: p.notes,
            fees: p.fees,
            duration: p.duration,
            personnel: p.personnel,
            charter_uid: p.charter_uid
        }))
    })

    return null;
}

export const createAgentProcess = async (
    parent: unknown,
    args: {
        process: AgentProcess[]
    }
) => {
    await prismaClient.agentProcess.createMany({
        data: args.process.map(p => ({
            process_step: p.process_step,
            step_desc: p.step_desc,
            charter_uid: p.charter_uid,
            duration: p.duration,
            personnel: p.personnel,
        }))
    })

    return null;
}

export const getClientProcessesByCharter = async (uid: string) => {
    return await prismaClient.clientProcess.findMany({
        where: {
            charter_uid: uid
        },
        orderBy: {
            process_step: 'asc'
        }
    })
}

export const getAgentProcessesByCharter = async (uid: string) => {
    return await prismaClient.agentProcess.findMany({
        where: {
            charter_uid: uid
        },
        orderBy: {
            process_step: 'asc'
        }
    })
}
