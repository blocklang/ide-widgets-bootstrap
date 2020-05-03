const { describe, it } = intern.getInterface("bdd");

import assertionTemplate from "@dojo/framework/testing/assertionTemplate";
import harness from "@dojo/framework/testing/harness";
import { v, w } from "@dojo/framework/core/vdom";
import TextInput from "../../../src/text-input";
import ide from "@blocklang/designer-core/middleware/ide";
import createMockIde from "@blocklang/designer-core/testing/mocks/middleware/ide";
import Overlay from "@blocklang/designer-core/widgets/overlay";
import * as css from "../../../src/text-input/index.m.css";
import * as c from "bootstrap-classes";

describe("text-input", () => {
	const baseAssertion = assertionTemplate(() => [
		v("input", { key: "root", classes: [css.root, c.form_control], value: "", oninput: () => {} }),
		w(Overlay, {
			top: 1,
			left: 2,
			height: 3,
			width: 4,
			onmouseout: () => {},
			onmouseover: () => {},
			onmouseup: () => {},
		}),
	]);

	it("default properties", () => {
		const mockIde = createMockIde();
		mockIde("root", {
			position: { top: 1, left: 2, right: 10, bottom: 11 },
			offset: { top: 1, left: 2, height: 3, width: 4 },
			size: { height: 3, width: 4 },
			scroll: { top: 1, left: 2, height: 3, width: 4 },
			client: { top: 1, left: 2, height: 3, width: 4 },
		});
		const h = harness(() => w(TextInput, { widget: { id: 1 }, extendProperties: {} }), {
			middleware: [[ide, mockIde]],
		});

		h.expect(baseAssertion);
	});
});
