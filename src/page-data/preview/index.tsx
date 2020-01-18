import { tsx, create } from "@dojo/framework/core/vdom";
import store from "designer-core/store";
import { getValue } from "designer-core/utils/pageDataUtil";
import { isObject } from "util";

export interface PageDataProperties {
	dataId?: string;
}

const factory = create({ store }).properties<PageDataProperties>();

export default factory(function PageDataIde({ properties, middleware: { store } }) {
	const { dataId = "" } = properties();

	if (dataId.trim() === "") {
		return <virtual key="root"></virtual>;
	}

	const { get, path } = store;
	const pageData = get(path("pageModel", "data"));

	let value = getValue(pageData, dataId);
	if (!value) {
		return <virtual key="root"></virtual>;
	}

	if (Array.isArray(value) || isObject(value)) {
		value = JSON.stringify(value);
	}

	return <virtual key="root">{value}</virtual>;
});
