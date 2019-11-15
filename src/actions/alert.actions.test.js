import {alertError, alertSuccess} from "../../src/actions/alert.actions";
import {ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS} from "./actionTypes";
import {alertClear} from "./alert.actions";

describe('Given alert actions', () => {
    it('should return action of type ALERT_SUCCESS with given message', () => {
        expect(alertSuccess("hello")).toEqual({
            type: ALERT_SUCCESS,
            message: "hello"
        })
    });
    it('should return action of type ALERT_ERROR with given message', () => {
        expect(alertError("hello")).toEqual({
            type: ALERT_ERROR,
            message: "hello"
        })
    });
    it('should return action of type ALERT_CLEAR', () => {
        expect(alertClear()).toEqual({
            type: ALERT_CLEAR,
        })
    });
});