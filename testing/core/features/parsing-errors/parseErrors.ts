import {ArkErrors} from "arktype";
export function parseErrors(result: unknown): ArkErrors {
	if (result instanceof ArkErrors) {
		return result;
	} else {
		const error = new Error(`Expected the parsing to fail.`);
		throw error;
	}
}
