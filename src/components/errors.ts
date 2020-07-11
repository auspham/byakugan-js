/**
 * ErrorMessage class represents error messages.
 *
 * @export
 * @class ErrorMessage
 */
export abstract class ErrorMessage extends Error{
    public static functions(name: string): Error {
        let message = `Undefined heuristic functions '${name}' do you mean to use 'override'?`;
        return new Error(message);
    }

    public static invalidSettings(): Error {
        let message = `Missing key 'grid' in settings object.`;
        return new Error(message);
    }
}
