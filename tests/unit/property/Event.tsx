const { describe, it } = intern.getInterface("bdd");
const { assert } = intern.getPlugin("chai");

import assertionTemplate from "@dojo/framework/testing/harness/assertionTemplate";
import harness from "@dojo/framework/testing/harness/harness";
import { tsx } from "@dojo/framework/core/vdom";
import FontAwesomeIcon from "@blocklang/dojo-fontawesome/FontAwesomeIcon";
import * as c from "@blocklang/bootstrap-classes";
import * as css from "../../../src/property/Event.m.css";
import Event from "../../../src/property/Event";
import { stub } from "sinon";

describe("property/Event", () => {
	const baseAssertion = assertionTemplate(() => (
		<div key="root" classes={[c.d_flex, c.justify_content_between]}>
			<div key="label" classes={[c.text_muted]}>
				未定义
			</div>
			<div>
				<span key="icon" classes={[c.text_muted, css.icon]} title="跳转到函数定义页面" onclick={() => {}}>
					<FontAwesomeIcon icon="edit" />
				</span>
			</div>
		</div>
	));

	it("default properties", () => {
		const h = harness(() => <Event index={0} onPropertyChanged={() => {}} onChangePaneLayout={() => {}} />);
		h.expect(baseAssertion);
	});

	it("value property", () => {
		const valueAssertion = baseAssertion.replaceChildren("@label", () => ["已绑定事件处理函数"]);
		const h = harness(() => (
			<Event index={0} value="a" onPropertyChanged={() => {}} onChangePaneLayout={() => {}} />
		));
		h.expect(valueAssertion);
	});

	it("onPropertyChanged and onChangePaneLayout called once", () => {
		const onPropertyChangedStub = stub();
		const onChangePaneLayoutStub = stub();
		const h = harness(() => (
			<Event index={0} onPropertyChanged={onPropertyChangedStub} onChangePaneLayout={onChangePaneLayoutStub} />
		));
		h.trigger("@icon", "onclick");
		assert.isTrue(onPropertyChangedStub.calledOnce);
		assert.isTrue(onChangePaneLayoutStub.calledOnce);
	});
});
