/**
 * ErrorMessage class represents error messages.
 *
 * @export
 * @class ErrorMessage
 */
export abstract class ErrorMessage extends Error{
    public static functions(name: string): Error {
        let message = `Undefined heuristic functions '${name}' do you mean to use 'overwrites'?`;
        return new Error(message);
    }
}
