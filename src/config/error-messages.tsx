interface ErrorMessagesInterface {
    [key: number]: string
}

export const errorMessages: ErrorMessagesInterface = {
    404: "Country not found",
    500: "There was an error searching the Countries"
}