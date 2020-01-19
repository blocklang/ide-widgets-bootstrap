import { create, tsx, invalidator } from "@dojo/framework/core/vdom";
import dimensions from "@dojo/framework/core/middleware/dimensions";
import theme from "@dojo/framework/core/middleware/theme";
import dojo from "@dojo/themes/dojo";
import { add } from "@dojo/framework/stores/state/operations";
import TextInput from "./text-input";
import PlainText from "./plain-text";
import { AttachedWidget, ChangedPropertyValue, State } from "designer-core/interfaces";
import store from "designer-core/store";
import "bootstrap/dist/css/bootstrap.min.css";
import * as css from "./App.m.css";
import PageData from "./page-data/edit";
import Store from "@dojo/framework/stores/Store";
import Value from "./property/Value";
import DataId from "./property/DataId";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

library.add(faTimes, faAngleDown, faAngleRight);

const factory = create({ theme, store, dimensions, invalidator });

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

const pageDataWidget: AttachedWidget = {
	id: "text-input-1",
	parentId: "1",
	apiRepoId: 1,
	widgetId: 2,
	widgetName: "PageData",
	widgetCode: "0002",
	canHasChildren: false,
	properties: [
		{
			id: "2",
			isExpr: false,
			code: "0002",
			name: "dataId",
			valueType: "string",
			value: "2"
		}
	]
};

const textInputWidget: AttachedWidget = {
	id: "text-input-1",
	parentId: "1",
	apiRepoId: 1,
	widgetId: 3,
	widgetName: "TextInput",
	widgetCode: "0003",
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

let dataId = "1";

export default factory(function App({ middleware: { theme, store, dimensions, invalidator } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	store.executor(((storeObject: Store<State>) => {
		storeObject.apply([
			add(storeObject.path("pageModel", "data"), [
				{
					id: "1",
					parentId: "-1",
					name: "$",
					type: "Object",
					open: true
				},
				{
					id: "2",
					parentId: "1",
					name: "a",
					type: "Object",
					open: false
				},
				{
					id: "3",
					parentId: "2",
					name: "label",
					type: "String",
					value: "value",
					open: false
				}
			])
		]);
	}) as any);

	return (
		<div classes={[css.root]}>
			<h1>部件</h1>
			<fieldset>
				<legend>PlainText</legend>
				<PlainText
					widget={plainTextWidget1}
					extendProperties={{
						onFocused: () => {
							console.log("plain-text: onfocused");
						},
						onFocusing: () => {
							console.log("plain-text: onFocusing");
						},
						onHighlight: () => {
							console.log("plain-text: onHighlight");
						},
						onUnhighlight: () => {
							console.log("plain-text: onUnhighlight");
						},
						onPropertyChanged: (changedProperty: ChangedPropertyValue) => {
							console.log("plain-text: onPropertyChanged");
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
				<legend>PageData</legend>
				<PageData
					widget={pageDataWidget}
					extendProperties={{
						onFocused: () => {
							console.log("onFocused");
						},
						onFocusing: () => {
							console.log("onFocusing");
						},
						onHighlight: () => {
							console.log("onHighlight");
						},
						onUnhighlight: () => {
							console.log("onUnhighlight");
						}
					}}
					middlewares={{ dimensions }}
					dataId="2"
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

			<hr />
			<h2>属性</h2>

			<fieldset>
				<legend>Value</legend>
				<Value index={0} onPropertyChanged={() => {}} />
			</fieldset>

			<fieldset>
				<legend>DataId</legend>
				<DataId
					index={0}
					value={dataId}
					onPropertyChanged={({ newValue }: ChangedPropertyValue) => {
						dataId = newValue;
						invalidator();
					}}
				/>
			</fieldset>
		</div>
	);
});
