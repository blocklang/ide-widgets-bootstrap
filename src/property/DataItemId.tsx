import { create, tsx } from "@dojo/framework/core/vdom";
import { SingleProperty } from "@blocklang/designer-core/interfaces";
import FontAwesomeIcon from "dojo-fontawesome/FontAwesomeIcon";
import * as c from "bootstrap-classes";
import * as css from "./DataItemId.m.css";
import pageData from "@blocklang/designer-core/middleware/pageData";
import { convertDataIdToJsonPath } from "@blocklang/designer-core/utils/pageDataUtil";
import DataTree from "./support/DataTree";

const factory = create({ pageData }).properties<SingleProperty>();

export default factory(function DataId({ properties, middleware: { pageData } }) {
	// 传进来的 value 是 dataId
	const { index, value = "", onPropertyChanged } = properties();

	const allData = pageData.get();
	const jsonPath = convertDataIdToJsonPath(allData, value);

	return (
		<div classes={[css.root]}>
			<div classes={[css.inputBorder]}>
				{jsonPath}
				<span
					classes={[c.float_right, css.clear]}
					onclick={() => {
						onPropertyChanged({ index, newValue: "", isChanging: false, isExpr: true });
					}}
				>
					<FontAwesomeIcon icon="times" />
				</span>
			</div>
			<DataTree
				data={allData}
				selectedDataItemId={value}
				onSelectDataItem={(dataId: string) => {
					onPropertyChanged({ index, newValue: dataId, isChanging: false, isExpr: true });
				}}
				onUnselectDataItem={() => {
					onPropertyChanged({ index, newValue: "", isChanging: false, isExpr: true });
				}}
			/>
		</div>
	);
});
