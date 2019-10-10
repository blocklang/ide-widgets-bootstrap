import { create, tsx } from "@dojo/framework/core/vdom";
import * as c from "bootstrap-classes";

// FIXME: 确认可否使用 page-designer 项目中的 ChangedPropertyValue 接口
export interface ValueProperties {
	propertyIndex: number; // 部件的属性是按照数组存储的，一个属性对应一条记录，该属性指当前属性在数组中的索引
	onPropertyChanged: (changedProperty: { index: number; newValue: string }) => void;
}

const factory = create().properties<ValueProperties>();

export default factory(function Value({ properties }) {
	const { propertyIndex, onPropertyChanged } = properties();
	return (
		<div>
			<input
				key="input"
				classes={[c.form_control]}
				oninput={(event: Event) => {
					const value = (event.target as HTMLInputElement).value;
					onPropertyChanged({ index: propertyIndex, newValue: value });
				}}
			/>
		</div>
	);
});
