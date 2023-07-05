import { useFormikContext } from 'formik'
import { useEffect } from 'react'

export interface FormErrorSubscribe {
    set: (value: boolean) => void
}
// Using with useFormikError
export const FormErrorSubscribe = ({
    set
}: FormErrorSubscribe) => {
    const { isValid, isValidating, isSubmitting } = useFormikContext()
    useEffect(() => {

        if (!isValid && !isValidating && isSubmitting) {
            set(true)
        } else {
            set(false)
        }
    }, [isValid, isValidating, isSubmitting])

    return null
}