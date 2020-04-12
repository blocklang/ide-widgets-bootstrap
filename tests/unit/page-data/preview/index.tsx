const { describe, it } = intern.getInterface("bdd");

import assertionTemplate from "@dojo/framework/testing/assertionTemplate";
import harness from "@dojo/framework/testing/harness";
import { tsx } from "@dojo/framework/core/vdom";
import createMockStoreMiddleware from "@dojo/framework/testing/mocks/middleware/store";
import store from "designer-core/store";

import PageData from "../../../../src/page-data/preview";
import { State } from "designer-core/interfaces";
import { add } from "@dojo/framework/stores/state/operations";

describe("page-data/preview", () => {
	const baseAssertion = assertionTemplate(() => <virtual key="root"></virtual>);

	it("dataItemId is undefined", () => {
		const h = harness(() => <PageData />);
		h.expect(baseAssertion);
	});

	it("dataItemId is defined but not exist in page data", () => {
		const mockStore = createMockStoreMiddleware<State>();
		mockStore((path) => [add(path("pageModel", "data"), [])]);
		const h = harness(() => <PageData dataItemId="1" />, { middleware: [[store, mockStore]] });
		h.expect(baseAssertion);
	});

	it("dataItemId is defined and defaultValue is String type", () => {
		const stringValueAssertion = baseAssertion.replaceChildren("@root", () => ["Hello"]);
		const mockStore = createMockStoreMiddleware<State>();
		mockStore((path) => [
			add(path("pageModel", "data"), [
				{ id: "1", parentId: "-1", name: "$", type: "Object", open: true },
				{ id: "2", parentId: "1", name: "str", defaultValue: "Hello", type: "String", open: true },
			]),
		]);
		const h = harness(() => <PageData dataItemId="2" />, { middleware: [[store, mockStore]] });
		h.expect(stringValueAssertion);
	});

	it("dataItemId is defined and defaultValue is Object type", () => {
		const objectValueAssertion = baseAssertion.replaceChildren("@root", () => ['{"str":"Hello"}']);
		const mockStore = createMockStoreMiddleware<State>();
		mockStore((path) => [
			add(path("pageModel", "data"), [
				{ id: "1", parentId: "-1", name: "$", type: "Object", open: true },
				{ id: "2", parentId: "1", name: "obj1", type: "Object", open: true },
				{ id: "3", parentId: "2", name: "str", defaultValue: "Hello", type: "String", open: true },
			]),
		]);
		const h = harness(() => <PageData dataItemId="2" />, { middleware: [[store, mockStore]] });
		h.expect(objectValueAssertion);
	});
});
