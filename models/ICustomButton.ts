export interface ICustomButton {
    eventClick: () => void,
    customClass: string | null,
    variant: string,
    colorScheme: string,
    text: string
}