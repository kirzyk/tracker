import { transformFromText, transformFromValue } from '../transformers/state.transformer';

export class Issue {

    get id() {
        return this._id;
    }

    set id(data) {
        this._id = data;
    }

    get title() {
        return this._title;
    }

    set title(data) {
        this._title = data;
    }

    get description() {
        return this._description;
    }

    set description(data) {
        this._description = data;
    }

    get state() {
        return this._state;
    }

    set state(data) {
        this._state = data;
    }

    get nextState() {
        let stateValue = transformFromText(this._state);
        if (!stateValue || stateValue >= 3) {
            return null;
        }
        return transformFromValue(++stateValue);
    }


    constructor(id, title, description, state) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._state = state;
    }
}