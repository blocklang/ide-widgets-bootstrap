const { describe, it } = intern.getInterface("bdd");

import assertionTemplate from "@dojo/framework/testing/assertionTemplate";
import harness from "@dojo/framework/testing/harness";
import { v, w } from "@dojo/framework/core/vdom";
import PlainText from "../../../src/plain-text";
import ide from "@blocklang/designer-core/middleware/ide";
import createMockIde from "@blocklang/designer-core/testing/mocks/middleware/ide";
import * as css from "../../../src/plain-text/index.m.css";

describe("plain-text", () => {
	const baseAssertion = assertionTemplate(() => [
		v(
			"span",
			{
				key: "root",
				classes: [css.root],
				styles: {},
				onmouseout: () => {},
				onmouseover: () => {},
				onmouseup: () => {},
			},
			[
				v("pre", { key: "pre", classes: [css.pre, css.divEmpty] }, [v("span"), v("br")]),
				v("div", { key: "readonlyDiv", classes: [css.div], ondblclick: () => {} }),
			]
		),
	]);

	it("default properties", () => {
		const mockIde = createMockIde();
		const h = harness(
			() =>
				w(PlainText, {
					widget: { properties: [{ name: "value" }] },
					extendProperties: { onPropertyChanged: () => {}, autoFocus: () => false },
				}),
			{ middleware: [[ide, mockIde]] }
		);

		h.expect(baseAssertion);
	});

	it("switch to edit", () => {
		const editAssertion = baseAssertion
			.setProperty("@pre", "classes", [css.pre, css.textareaEmpty])
			.remove("@readonlyDiv")
			.insertAfter("@pre", () => [
				v("textarea", {
					key: "textarea",
					classes: [css.textarea],
					placeholder: "输入文本",
					spellcheck: false,
					focus: () => true,
					onblur: () => {},
					oninput: () => {},
				}),
			]);
		const mockIde = createMockIde();

		const h = harness(
			() =>
				w(PlainText, {
					widget: { properties: [{ name: "value" }] },
					extendProperties: { onPropertyChanged: () => {}, autoFocus: () => false },
				}),
			{ middleware: [[ide, mockIde]] }
		);

		h.trigger("@readonlyDiv", "ondblclick");

		h.expect(editAssertion);
	});
});
