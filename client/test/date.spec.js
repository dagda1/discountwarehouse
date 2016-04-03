import { toReadableFormat, dateToString } from '../app/utils/date';

describe("DateUtil", () => {
  describe('#toReadableFormat', () => {
    it("should format date", () => {

      const dateDaysFromNow = (days) => {
        return new Date(new Date().setDate(new Date().getDate() -  days));
      };

      const fourDaysAgo = dateDaysFromNow(4);
      expect(toReadableFormat(fourDaysAgo)).toEqual("4 days ago");

      const today = new Date();
      expect(toReadableFormat(today)).toEqual("today");

      const oneDayAgo = dateDaysFromNow(1);
      expect(toReadableFormat(oneDayAgo)).toEqual("1 day ago");

      const oneWeekAgo = dateDaysFromNow(7);
      expect(toReadableFormat(oneWeekAgo)).toEqual("7 days ago");

      const overAWeekAgo = dateDaysFromNow(8);
      expect(toReadableFormat(overAWeekAgo)).toEqual(dateToString(overAWeekAgo));
    });
  });
});
