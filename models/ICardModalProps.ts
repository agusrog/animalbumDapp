import { IToken } from './IToken';

export interface ICardModalProps {
    token: IToken | undefined,
    isOpen: boolean,
    transactionPending: boolean,
    onOpen: () => void,
    onClose: () => void,
    transfer: (value: string) => void
}