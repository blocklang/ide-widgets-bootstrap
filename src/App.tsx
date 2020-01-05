import { create, tsx, invalidator } from "@dojo/framework/core/vdom";
import theme from "@dojo/framework/core/middleware/theme";
import dojo from "@dojo/themes/dojo";
import TextInput from "./text-input";
import PlainText from "./plain-text";
import { AttachedWidget, ChangedPropertyValue } from "designer-core/interfaces";

import "bootstrap/dist/css/bootstrap.min.css";
import * as css from "./App.m.css";

const factory = create({ theme, invalidator });

const plainTextWidget1: AttachedWidget = {
	id: "plain-text-1",
	parentId: "1",
	apiRepoId: 1,
	widgetId: 1,
	widgetName: "PlainText",
	widgetCode: "0001",
	canHasChildren: false,
	properties: [
		{
			id: "1",
			isExpr: false,
			code: "0001",
			name: "value",
			valueType: "string",
			value: "Hello World!"
		}
	]
};

const plainTextWidget2: AttachedWidget = {
	id: "plain-text-2",
	parentId: "1",
	apiRepoId: 1,
	widgetId: 1,
	widgetName: "PlainText",
	widgetCode: "0001",
	canHasChildren: false,
	properties: [
		{
			id: "1",
			isExpr: false,
			code: "0001",
			name: "value",
			valueType: "string",
			value: ""
		}
	]
};

const textInputWidget: AttachedWidget = {
	id: "text-input-1",
	parentId: "1",
	apiRepoId: 1,
	widgetId: 2,
	widgetName: "TextInput",
	widgetCode: "0002",
	canHasChildren: false,
	properties: [
		{
			id: "2",
			isExpr: false,
			code: "0002",
			name: "value",
			valueType: "string",
			value: "Text Input"
		}
	]
};

export default factory(function App({ middleware: { theme, invalidator } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	return (
		<div classes={[css.root]}>
			<fieldset>
				<legend>PlainText</legend>
				<PlainText
					widget={plainTextWidget1}
					extendProperties={{
						onFocused: () => {},
						onFocusing: () => {},
						onHighlight: () => {},
						onUnhighlight: () => {},
						onPropertyChanged: (changedProperty: ChangedPropertyValue) => {
							plainTextWidget1.properties[0].value = changedProperty.newValue;
							invalidator();
						}
					}}
					value={plainTextWidget1.properties[0].value}
				/>

				<PlainText
					widget={plainTextWidget2}
					extendProperties={{
						onFocused: () => {},
						onFocusing: () => {},
						onHighlight: () => {},
						onUnhighlight: () => {},
						onPropertyChanged: (changedProperty: ChangedPropertyValue) => {
							plainTextWidget2.properties[0].value = changedProperty.newValue;
							invalidator();
						}
					}}
					value={plainTextWidget2.properties[0].value}
				/>
			</fieldset>

			<fieldset>
				<legend>TextInput</legend>
				<TextInput
					widget={textInputWidget}
					extendProperties={{
						onFocused: () => {},
						onFocusing: () => {},
						onHighlight: () => {},
						onUnhighlight: () => {}
					}}
					value="Text Input"
				/>
			</fieldset>
		</div>
	);
});
