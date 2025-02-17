import type { DiplomaticStatus } from "@solaris-common";
import { makeCastFunc } from "@solaris-common";
import type { EventBusEventName } from "./eventBusEventName";

export type DiplomacyEventBusEventType = { diplomacyEventBusEventType: 'diplomacyEventBusEventType' };
export type DiplomacyEventBusEventName<TData> = EventBusEventName<DiplomacyEventBusEventType, TData> & { diplomacyEventBusEventName: 'diplomacyEventBusEventName' }

const toEventName: <TData>(value: string) => DiplomacyEventBusEventName<TData> = makeCastFunc();

export default class DiplomacyEventBusEventNames {
  private constructor() { };

  public static readonly PlayerDiplomaticStatusChanged: DiplomacyEventBusEventName<{ diplomaticStatus: DiplomaticStatus<string> }> = toEventName('playerDiplomaticStatusChanged');
}
