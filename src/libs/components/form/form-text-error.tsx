import { ReactNode } from "react"
import { Message } from "semantic-ui-react"

export interface FormTextError {
    children?: ReactNode,
    className?: string;
    header?: string;
    isShow?: boolean;
}
export const FormTextError = ({ children, className = "", header = "", isShow = false }: FormTextError) => {
    return <>
        {isShow && <Message negative className={className}>
            {header != "" && <>
                {/* @ts-expect-error Message header */}
                <Message.Header>{header}</Message.Header>
            </>}
            {children}
        </Message>}
    </>
}