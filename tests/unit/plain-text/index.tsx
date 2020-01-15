const { describe, it } = intern.getInterface("bdd");

import assertionTemplate from "@dojo/framework/testing/assertionTemplate";
import harness from "@dojo/framework/testing/harness";
import { tsx } from "@dojo/framework/core/vdom";
import PlainText from "../../../src/plain-text";
import ide from "designer-core/middleware/ide";
import createMockIde from "designer-core/testing/mocks/middleware/ide";
import * as css from "../../../src/plain-text/index.m.css";

describe("plain-text", () => {
	const baseAssertion = assertionTemplate(() => (
		<span
			key="root"
			classes={[css.root]}
			styles={{}}
			onmouseout={() => {}}
			onmouseover={() => {}}
			onmouseup={() => {}}
		>
			<pre key="pre" classes={[css.pre, css.divEmpty]}>
				<span></span>
				<br />
			</pre>
			<div key="readonlyDiv" classes={[css.div]} ondblclick={() => {}}></div>
		</span>
	));

	it("default properties", () => {
		const mockIde = createMockIde();
		const h = harness(
			() => (
				<PlainText
					widget={{ properties: [{ name: "value" }] }}
					extendProperties={{ onPropertyChanged: () => {}, autoFocus: () => false }}
				/>
			),
			{ middleware: [[ide, mockIde]] }
		);

		h.expect(baseAssertion);
	});

	it("switch to edit", () => {
		const editAssertion = baseAssertion
			.setProperty("@pre", "classes", [css.pre, css.textareaEmpty])
			.remove("@readonlyDiv")
			.insertAfter("@pre", [
				<textarea
					key="textarea"
					classes={[css.textarea]}
					placeholder="输入文本"
					spellcheck={false}
					focus={() => true}
					onblur={() => {}}
					oninput={() => {}}
				></textarea>
			]);
		const mockIde = createMockIde();
		const h = harness(
			() => (
				<PlainText
					widget={{ properties: [{ name: "value" }] }}
					extendProperties={{ onPropertyChanged: () => {}, autoFocus: () => false }}
				/>
			),
			{ middleware: [[ide, mockIde]] }
		);

		h.trigger("@readonlyDiv", "ondblclick");
		h.expect(editAssertion);
	});
});
