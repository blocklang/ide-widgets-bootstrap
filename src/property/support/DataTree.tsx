import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";
import pageData from "designer-core/middleware/ide";
import { PageDataItem } from "designer-core/interfaces";
import FontAwesomeIcon from "dojo-fontawesome/FontAwesomeIcon";
import * as c from "bootstrap-classes";
import * as css from "./DataTree.m.css";
import { getChildrenIndex } from "designer-core/utils/treeUtil";

const ROOT_PARENT_ID = "-1";

export interface DataTreeProperties {
	selectedDataItemId: string;
	data: PageDataItem[];
	onSelectDataItem: (dataId: string) => void;
	onUnselectDataItem: () => void;
}

const factory = create({ pageData, icache }).properties<DataTreeProperties>();

export default factory(function DataTree({ properties, middleware: { icache } }) {
	const { selectedDataItemId, data = [], onSelectDataItem, onUnselectDataItem } = properties();

	function _renderChildren(
		pageData: PageDataItem[],
		currentData: PageDataItem,
		firstChildIndex: number,
		selectedDataItemId: string
	) {
		const children = getChildrenIndex(pageData, currentData.id, firstChildIndex);
		return children.map((eachDataIndex, index) => {
			const eachData = pageData[eachDataIndex];
			return (
				<virtual>
					{_renderDataItem(eachData, index, currentData, selectedDataItemId)}
					{icache.getOrSet(`open-${eachData.id}`, true) && (
						<div key={`${currentData.id}-${index}-children`} classes={[c.pl_4, c.border_left]}>
							{_renderChildren(pageData, eachData, eachDataIndex + 1, selectedDataItemId)}
						</div>
					)}
				</virtual>
			);
		});
	}

	function _renderDataItem(
		dataItem: PageDataItem,
		index: number,
		parentDataItem: PageDataItem,
		selectedDataItemId: string
	) {
		return (
			<div
				key={`${dataItem.id}-${index}`}
				classes={[
					c.position_relative,
					c.border,
					selectedDataItemId === dataItem.id ? c.border_primary : c.border_white
				]}
				onclick={(event: MouseEvent) => {
					event.stopPropagation();
					// 当单机时，如果之前未选中，则选中；如果之前已选中，则撤销选中。
					if (selectedDataItemId === dataItem.id) {
						// 撤销选中
						onUnselectDataItem();
					} else {
						onSelectDataItem(dataItem.id);
					}
				}}
			>
				{_renderIcon(dataItem)}
				{_renderVariableName(dataItem, index, parentDataItem)}
			</div>
		);
	}

	function _renderIcon(dataItem: PageDataItem) {
		if (dataItem.type === "Object" || dataItem.type === "Array") {
			return (
				<span
					key="icon"
					classes={[c.position_absolute, css.icon, c.text_muted]}
					onclick={(event: MouseEvent) => {
						event.stopPropagation();
						const opened = icache.getOrSet(`open-${dataItem.id}`, true);
						icache.set(`open-${dataItem.id}`, !opened);
					}}
				>
					{icache.getOrSet(`open-${dataItem.id}`, true) ? (
						<FontAwesomeIcon icon="angle-down" />
					) : (
						<FontAwesomeIcon icon="angle-right" />
					)}
				</span>
			);
		}
	}

	/**
	 * 渲染变量名
	 *
	 * @param data       数据项
	 * @param executor   store 执行器
	 */
	function _renderVariableName(dataItem: PageDataItem, index: number, parentDataItem: PageDataItem) {
		return (
			<span key="variable" classes={[c.mr_1]}>
				{parentDataItem.type === "Array" ? `${index}` : dataItem.name}
			</span>
		);
	}

	if (data.length === 0) {
		return (
			<div key="root">
				<div key="alert-has-no-root" classes={[c.alert, c.alert_danger, c.text_center]} role="alert">
					共发现 0 个数据节点，至少要存在一个根节点！
				</div>
			</div>
		);
	}

	if (data[0].parentId !== ROOT_PARENT_ID) {
		return (
			<div key="root">
				<div key="alert-has-no-root" classes={[c.alert, c.alert_danger, c.text_center]} role="alert">
					第一个节点必须是根节点！
				</div>
			</div>
		);
	}

	return (
		<div key="root" classes={[c.ml_4]}>
			<div
				key={`${data[0].id}-0`}
				classes={[
					c.position_relative,
					c.border,
					selectedDataItemId === data[0].id ? c.border_primary : c.border_white
				]}
				onclick={(event: MouseEvent) => {
					event.stopPropagation();
					// 当单机时，如果之前未选中，则选中；如果之前已选中，则撤销选中。
					if (selectedDataItemId === data[0].id) {
						// 撤销选中
						onUnselectDataItem();
					} else {
						onSelectDataItem(data[0].id);
					}
				}}
			>
				<span
					classes={[c.position_absolute, c.text_muted, css.icon]}
					onclick={() => {
						const opened = icache.getOrSet(`open-${data[0].id}`, true);
						icache.set(`open-${data[0].id}`, !opened);
					}}
				>
					{icache.getOrSet(`open-${data[0].id}`, true) ? (
						<FontAwesomeIcon icon="angle-down" />
					) : (
						<FontAwesomeIcon icon="angle-right" />
					)}
				</span>
				<span classes={[c.ml_1]}>data（页面数据）</span>
			</div>
			{data.length > 0 && icache.getOrSet(`open-${data[0].id}`, true) && (
				<div key={`${data[0].id}-0-children`} classes={[c.pl_4, c.border_left]}>
					{_renderChildren(data, data[0], 1, selectedDataItemId)}
				</div>
			)}
		</div>
	);
});
