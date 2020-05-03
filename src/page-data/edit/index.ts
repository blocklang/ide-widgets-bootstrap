import { create, v } from "@dojo/framework/core/vdom";
import * as css from "./index.m.css";
import * as c from "bootstrap-classes";
import pageData from "@blocklang/designer-core/middleware/pageData";
import { convertDataIdToJsonPath, getValue } from "@blocklang/designer-core/utils/pageDataUtil";
import ide from "@blocklang/designer-core/middleware/ide";
import { isObject } from "util";
import { PageDataProperties } from "../preview";

const factory = create({ pageData, ide }).properties<PageDataProperties>();

export default factory(function PageDataIde({ properties, middleware: { pageData, ide } }) {
	const { dataItemId = "" } = properties();

	ide.config("root");
	const activeWidgetEvents = ide.activeWidgetEvents();

	let children = [];

	if (dataItemId.trim() === "") {
		children.push(v("span", { classes: [c.text_secondary] }, ["未绑定变量"]));
	} else {
		const allData = pageData.get();

		let value = getValue(allData, dataItemId);
		if (value === undefined) {
			children.push(v("span", { classes: [c.text_secondary] }, ["绑定的变量已不存在"]));
		} else {
			if (Array.isArray(value) || isObject(value)) {
				value = JSON.stringify(value);
			}

			// 支持在 ide 中编辑：
			// 1. 绑定 onmouseup 事件，让当前部件获取焦点
			// 2. 绑定 onmouseover 事件，以添加高亮效果
			// 3. 绑定 onmouseout 事件，在离开设计器时移除高亮效果
			// 4. 绑定 oninput 事件，以支持在部件中编辑指定的属性
			const jsonPath = convertDataIdToJsonPath(allData, dataItemId);
			children.push(v("span", { classes: [c.badge, c.badge_secondary] }, [jsonPath]));
			children.push(value);
		}
	}

	return [
		v("span", { key: "root", classes: [css.root], ...activeWidgetEvents }, children),
		ide.alwaysRenderActiveWidget(),
	];
});
