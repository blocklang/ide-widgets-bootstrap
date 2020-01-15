const { describe, it } = intern.getInterface("bdd");

import assertionTemplate from "@dojo/framework/testing/assertionTemplate";
import harness from "@dojo/framework/testing/harness";
import { tsx } from "@dojo/framework/core/vdom";
import TextInput from "../../../src/text-input";
import ide from "designer-core/middleware/ide";
import createMockIde from "designer-core/testing/mocks/middleware/ide";
import Overlay from "designer-core/widgets/overlay";
import * as css from "../../../src/text-input/index.m.css";
import * as c from "bootstrap-classes";

describe("text-input", () => {
	const baseAssertion = assertionTemplate(() => (
		<virtual>
			<input key="root" classes={[css.root, c.form_control]} value="" oninput={() => {}} />
			<Overlay
				top={1}
				left={2}
				height={3}
				width={4}
				onmouseout={() => {}}
				onmouseover={() => {}}
				onmouseup={() => {}}
			/>
		</virtual>
	));

	it("default properties", () => {
		const mockIde = createMockIde();
		mockIde("root", {
			position: { top: 1, left: 2, right: 10, bottom: 11 },
			offset: { top: 1, left: 2, height: 3, width: 4 },
			size: { height: 3, width: 4 },
			scroll: { top: 1, left: 2, height: 3, width: 4 },
			client: { top: 1, left: 2, height: 3, width: 4 }
		});
		const h = harness(() => <TextInput widget={{ id: "1" }} extendProperties={{}} />, {
			middleware: [[ide, mockIde]]
		});

		h.expect(baseAssertion);
	});
});
