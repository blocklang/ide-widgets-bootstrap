const { describe, it } = intern.getInterface("bdd");
const { assert } = intern.getPlugin("chai");
import harness from "@dojo/framework/testing/harness";
import { tsx } from "@dojo/framework/core/vdom";

import { stub } from "sinon";

import Value from "../../../src/property/Value";
import * as c from "bootstrap-classes";

describe("property/Value", () => {
	const noop = () => {};

	it("default properties", () => {
		const h = harness(() => <Value index={0} onPropertyChanged={noop} />);

		h.expect(() => (
			<div>
				<input key="input" value="" classes={[c.form_control]} oninput={noop} />
			</div>
		));
	});

	it("oninput", () => {
		const onPropertyChangedStub = stub();
		const h = harness(() => <Value index={0} onPropertyChanged={onPropertyChangedStub} />);

		h.trigger("@input", "oninput", { target: { value: "1" } });

		assert.isTrue(onPropertyChangedStub.calledOnce);
	});
});

// 1. 属性部件的根节点必须是单个 div
