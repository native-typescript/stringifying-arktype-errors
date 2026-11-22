import type {ArkError, ArkErrors} from "arktype";
export function parseError(errors: ArkErrors): ArkError {
	const firstError = errors[0];
	if (firstError === undefined) {
		const error = new Error(`Expected an error.`);
		throw error;
	} else {
		return firstError;
	}
}
