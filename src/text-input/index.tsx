import TextInputBase from "widgets-bootstrap/text-input";
import { WidgetDesignableMixin } from "designer-core/mixins/WidgetDesignable";

export default class TextInput extends WidgetDesignableMixin(TextInputBase) {
	protected needOverlay(): boolean {
		return true;
	}
}
