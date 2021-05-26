/**
 * @param status Eithor success or failed
 * @param message The message to the user
 * @param body The body or the response for the request
 *
 * @return Object well formated response message
 * */
export function createMessage(status ,message, body){
    return { status, message, body }
}