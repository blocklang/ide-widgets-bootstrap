import { create, tsx } from "@dojo/framework/core/vdom";
import { SingleProperty } from "designer-core/interfaces";
import FontAwesomeIcon from "dojo-fontawesome/FontAwesomeIcon";
import * as c from "bootstrap-classes";
import * as css from "./DataId.m.css";
import DataTree from "./support/DataTree";

const factory = create().properties<SingleProperty>();

export default factory(function DataId({ properties }) {
	// 此处的 value 值是已经准备好的 jsonPath
	const { index, value = "", onPropertyChanged } = properties();

	return (
		<div classes={[css.root]}>
			<div classes={[css.inputBorder]}>
				{value}
				<span
					classes={[c.float_right, css.clear]}
					onclick={() => {
						onPropertyChanged({ index, newValue: "", isChanging: false, isExpr: true });
					}}
				>
					<FontAwesomeIcon icon="times" />
				</span>
			</div>
			<DataTree />
		</div>
	);
});
