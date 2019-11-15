/*
 * Jeżeli będą błedy z emitowaniem danych trzeba wrócić do jednego pliku (locationEventsEmitter,backgroundTask => RecordRoute)
 */
import { EventEmitter, EventSubscription } from "fbemitter";

export const taskEventName = "task-update2";
export const locationEventsEmitter = new EventEmitter();
