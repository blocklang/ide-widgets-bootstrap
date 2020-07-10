import Value from "../property/Value";
import Event from "../property/Event";
import { PropertyLayout } from "@blocklang/designer-core/interfaces";

const propertiesLayout: PropertyLayout[] = [
	{
		propertyName: "value",
		propertyLabel: "值",
		propertyWidget: Value,
	},
	{
		propertyName: "onValue",
		propertyLabel: "输入值事件",
		propertyWidget: Event,
	},
];

export default propertiesLayout;
