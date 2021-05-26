/**
 * @param status Either success or failed
 * @param message The message to the user
 * @param body The body or the response for the request
 *
 * @return Object well formatted response message
 * */
export function createMessage(status: string ,message: string, body: string){
    return { status, message, body }
}