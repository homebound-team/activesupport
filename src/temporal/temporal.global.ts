import "./interval/interval.global";
import "./legacyDate/legacyDate.global";
import "./plainDate/plainDate.global";
import "./zonedDateTime/zonedDateTime.global";

declare module "temporal-polyfill" {
  namespace Temporal {
    type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

    type BusinessDayOptions = {
      businessDays?: DayOfWeek[];
      // ISO 8601 Date format
      exceptions?: Record<string, boolean>;
    };

    interface WeekOptions {
      /** Which day the week starts on. */
      weekStartsOn?: number;
    }
  }
}
