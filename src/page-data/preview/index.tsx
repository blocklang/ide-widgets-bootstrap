import { tsx, create } from "@dojo/framework/core/vdom";
import { getValue } from "designer-core/utils/pageDataUtil";
import * as blocklang from "designer-core/blocklang";
import { isObject } from "util";

export interface PageDataProperties {
	dataItemId?: string;
}

const store = blocklang.getStoreMiddleware();
const factory = create({ store }).properties<PageDataProperties>();

// TODO: 目前实现的逻辑是获取页面数据的默认值，需要支持获取在预览时设置的值
export default factory(function PageDataIde({ properties, middleware: { store } }) {
	const { dataItemId = "" } = properties();

	if (dataItemId.trim() === "") {
		return <virtual key="root"></virtual>;
	}

	const { get, path } = store;
	const pageData = get(path("pageModel", "data"));

	let value = getValue(pageData, dataItemId);
	if (!value) {
		return <virtual key="root"></virtual>;
	}

	if (Array.isArray(value) || isObject(value)) {
		value = JSON.stringify(value);
	}

	return <virtual key="root">{value}</virtual>;
});
