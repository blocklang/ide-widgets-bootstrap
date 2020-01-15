const { describe, it } = intern.getInterface("bdd");

import assertionTemplate from "@dojo/framework/testing/assertionTemplate";
import harness from "@dojo/framework/testing/harness";
import { tsx } from "@dojo/framework/core/vdom";
import { add } from "@dojo/framework/stores/state/operations";
import createMockStoreMiddleware from "@dojo/framework/testing/mocks/middleware/store";
import * as c from "bootstrap-classes";
import store from "designer-core/store";
import { State } from "designer-core/interfaces";
import ide from "designer-core/middleware/ide";
import createMockIde from "designer-core/testing/mocks/middleware/ide";
import PageData from "../../../../src/page-data/edit";
import * as css from "../../../../src/page-data/edit/index.m.css";

describe("page-data/edit", () => {
	const baseAssertion = assertionTemplate(() => (
		<span key="root" classes={[css.root]} onmouseout={() => {}} onmouseover={() => {}} onmouseup={() => {}}>
			<span classes={[c.text_secondary]}>未绑定变量</span>
		</span>
	));

	it("dataId is undefined", () => {
		const mockIde = createMockIde();
		const h = harness(() => <PageData widget={{ id: "1" }} extendProperties={{}} />, {
			middleware: [[ide, mockIde]]
		});

		h.expect(baseAssertion);
	});

	it("dataId is defined but not exist in page data", () => {
		const dataIdNotFoundAssertion = baseAssertion.replaceChildren("@root", () => [
			<span classes={[c.text_secondary]}>绑定的变量已不存在</span>
		]);
		const mockStore = createMockStoreMiddleware<State>();
		mockStore((path) => [add(path("pageModel", "data"), [])]);

		const mockIde = createMockIde();

		const h = harness(() => <PageData dataId="1" widget={{ id: "1" }} extendProperties={{}} />, {
			middleware: [
				[ide, mockIde],
				[store, mockStore]
			]
		});

		h.expect(dataIdNotFoundAssertion);
	});

	it("dataId is defined and value is String type", () => {
		const stringValueAssertion = baseAssertion.replaceChildren("@root", () => [
			<span classes={[c.badge, c.badge_secondary]}>$.str</span>,
			"Hello"
		]);
		const mockStore = createMockStoreMiddleware<State>();
		mockStore((path) => [
			add(path("pageModel", "data"), [
				{ id: "1", parentId: "-1", name: "$", type: "Object", open: true },
				{ id: "2", parentId: "1", name: "str", value: "Hello", type: "String", open: true }
			])
		]);

		const mockIde = createMockIde();

		const h = harness(() => <PageData dataId="2" widget={{ id: "1" }} extendProperties={{}} />, {
			middleware: [
				[ide, mockIde],
				[store, mockStore]
			]
		});

		h.expect(stringValueAssertion);
	});

	it("dataId is defined and value is Object type", () => {
		const objectValueAssertion = baseAssertion.replaceChildren("@root", () => [
			<span classes={[c.badge, c.badge_secondary]}>$.obj1</span>,
			'{"str":"Hello"}'
		]);
		const mockStore = createMockStoreMiddleware<State>();
		mockStore((path) => [
			add(path("pageModel", "data"), [
				{ id: "1", parentId: "-1", name: "$", type: "Object", open: true },
				{ id: "2", parentId: "1", name: "obj1", type: "Object", open: true },
				{ id: "3", parentId: "2", name: "str", value: "Hello", type: "String", open: true }
			])
		]);

		const mockIde = createMockIde();

		const h = harness(() => <PageData dataId="2" widget={{ id: "1" }} extendProperties={{}} />, {
			middleware: [
				[ide, mockIde],
				[store, mockStore]
			]
		});

		h.expect(objectValueAssertion);
	});
});
