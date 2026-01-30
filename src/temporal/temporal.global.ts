import "./interval/interval.global";
import "./plainDate/plainDate.global";
import "./zonedDateTime/zonedDateTime.global";

declare module "temporal-polyfill" {
  namespace Temporal {
    type BusinessDayOptions = {
      businessDays?: number[];
      // ISO 8601 Date format
      exceptions?: Record<string, boolean>;
    };

    interface WeekOptions {
      /** Which day the week starts on. */
      weekStartsOn?: number;
    }
  }
}
