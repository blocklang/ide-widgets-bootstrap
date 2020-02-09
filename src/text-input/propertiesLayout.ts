import Value from "../property/Value";
import Event from "../property/Event";

export default [
	{
		propertyName: "value",
		propertyLabel: "值",
		propertyWidget: Value
	},
	{
		propertyName: "onValue",
		propertyLabel: "输入值事件",
		propertyWidget: Event
	}
];
