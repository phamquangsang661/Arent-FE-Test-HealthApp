import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"
import { getError } from "@utils/utils"

type CustomTRPC<T> = {
    success: boolean
    code?: TRPC_ERROR_CODE_KEY,
    message: string,
    data?: T
}

export const errorCatchTRPC = async <T>(fc: () => Promise<CustomTRPC<T>>): Promise<CustomTRPC<T>> => {
    try {
        return await fc()
    } catch (err: any) {
        if (err?.type) {
            let temp = err
            return {
                success: false,
                code: temp.code,
                message: temp.message
            }
        } else {
            let error = getError(err);
            return {
                success: false,
                code: "BAD_REQUEST",
                message: error
            }
        }
    }
}

export const throwErrorTRPC = (code: TRPC_ERROR_CODE_KEY, message: string, log: string = "") => {
    if (log != "") {
        console.log("Error in ", log)
    }
    throw {
        type: "TRPC",
        code,
        message
    }
}

export const returnTRPC = <T>({
    message,
    data
}: {
    message: string,
    data: T
}): CustomTRPC<T> => {
    return {
        success: true,
        message,
        data
    }
}