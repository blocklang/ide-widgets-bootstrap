import { tsx, create } from "@dojo/framework/core/vdom";
import * as css from "./index.m.css";
import * as c from "bootstrap-classes";
import store from "designer-core/store";
import { convertDataIdToJsonPath, getValue } from "designer-core/pageData";
import ide from "designer-core/middleware/ide";
import { isObject } from "util";
import { PageDataProperties } from "../preview";

const factory = create({ store, ide }).properties<PageDataProperties>();

export default factory(function PageDataIde({ properties, middleware: { store, ide } }) {
	const { dataId = "" } = properties();

	ide.config("root");
	ide.tryFocus();
	const activeWidgetEvents = ide.activeWidgetEvents();

	if (dataId.trim() === "") {
		return (
			<span key="root" classes={[css.root]} {...activeWidgetEvents}>
				<span classes={[c.text_secondary]}>未绑定变量</span>
			</span>
		);
	}

	const { get, path } = store;
	const pageData = get(path("pageModel", "data"));

	const jsonPath = convertDataIdToJsonPath(pageData, dataId);
	let value = getValue(pageData, dataId);
	if (!value) {
		return (
			<span key="root" classes={[css.root]} {...activeWidgetEvents}>
				<span classes={[c.text_secondary]}>绑定的变量已不存在</span>
			</span>
		);
	}

	if (Array.isArray(value) || isObject(value)) {
		value = JSON.stringify(value);
	}

	// 支持在 ide 中编辑：
	// 1. 绑定 onmouseup 事件，让当前部件获取焦点
	// 2. 绑定 onmouseover 事件，以添加高亮效果
	// 3. 绑定 onmouseout 事件，在离开设计器时移除高亮效果
	// 4. 绑定 oninput 事件，以支持在部件中编辑指定的属性
	return (
		<span key="root" classes={[css.root]} {...activeWidgetEvents}>
			<span classes={[c.badge, c.badge_secondary]}>{jsonPath}</span>
			{value}
		</span>
	);
});
