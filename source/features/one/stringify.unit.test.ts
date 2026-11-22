import {testing_} from "../../../testing/module.ts";
import {stringify} from "./stringify.ts";
import {type ArkError, type ArkErrors, type} from "arktype";
import {expect} from "expect";
import {describe, it} from "node:test";
await describe(`stringify`, async function executeTests(): Promise<void> {
	await it(`stringifies an error`, async function stringifiesAnError(): Promise<void> {
		const errors = testing_.core_.features_.parsingErrors_.parseErrors(
			type(`string`)(123),
		) satisfies ArkErrors;
		const error = testing_.core_.features_.parsingError_.parseError(
			errors,
		) satisfies ArkError;
		expect(stringify(error)).toBe(`must be a string (was a number)`);
		return;
	});
	await it(`stringifies a union error`, async function stringifiesAUnionError(): Promise<void> {
		const errors = testing_.core_.features_.parsingErrors_.parseErrors(
			type({a: `string`}).or({b: `number`})({a: 5, b: `x`}),
		) satisfies ArkErrors;
		const error = testing_.core_.features_.parsingError_.parseError(
			errors,
		) satisfies ArkError;
		expect(stringify(error)).toBe(
			`one of:\n\t\ta must be a string (was a number)\n\tor:\n\t\tb must be a number (was a string)`,
		);
		return;
	});
	await it(`stringifies an intersection error`, async function stringifiesAnIntersectionError(): Promise<void> {
		const firstErrors = testing_.core_.features_.parsingErrors_.parseErrors(
			type({a: `string`})({a: 1}),
		) satisfies ArkErrors;
		const secondErrors = testing_.core_.features_.parsingErrors_.parseErrors(
			type({a: `number`})({a: `x`}),
		) satisfies ArkErrors;
		const secondError = testing_.core_.features_.parsingError_.parseError(
			secondErrors,
		) satisfies ArkError;
		firstErrors.add(secondError);
		const error = testing_.core_.features_.parsingError_.parseError(
			firstErrors,
		) satisfies ArkError;
		expect(stringify(error)).toBe(
			`a must be a string (was a number)\na must be a number (was a string)`,
		);
		return;
	});
});
