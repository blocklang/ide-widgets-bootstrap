import { create, tsx } from "@dojo/framework/core/vdom";
import * as c from "bootstrap-classes";
import { SingleProperty } from "@blocklang/designer-core/interfaces";

const factory = create().properties<SingleProperty>();

export default factory(function Value({ properties }) {
	const { index, value = "", onPropertyChanged } = properties();
	return (
		<div>
			<input
				key="input"
				// 需要通过 value 为属性部件设置默认值，当页面中已设置过值时，此处也要同步显示
				value={value}
				classes={[c.form_control]}
				oninput={(event: Event) => {
					const value = (event.target as HTMLInputElement).value;
					onPropertyChanged({ index, newValue: value, isChanging: false, isExpr: false });
				}}
			/>
		</div>
	);
});
