import {testing_} from "../../../testing/module.ts";
import {stringify} from "./stringify.ts";
import {type ArkErrors, type} from "arktype";
import {expect} from "expect";
import {describe, it} from "node:test";
await describe(`stringify`, async function executeTests(): Promise<void> {
	await it(`stringifies a single error`, async function stringifiesASingleError(): Promise<void> {
		const errors = testing_.core_.features_.parsingErrors_.parseErrors(
			type(`string`)(123),
		) satisfies ArkErrors;
		expect(stringify(errors)).toBe(`must be a string (was a number)`);
		return;
	});
	await it(`stringifies multiple errors`, async function stringifiesMultipleErrors(): Promise<void> {
		const errors = testing_.core_.features_.parsingErrors_.parseErrors(
			type({a: `string`, b: `number`})({a: 1, b: `x`}),
		) satisfies ArkErrors;
		expect(stringify(errors)).toBe(
			`a must be a string (was a number)\nb must be a number (was a string)`,
		);
		return;
	});
	return;
});
