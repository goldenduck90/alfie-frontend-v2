export enum TZ_FORMAT {
  SHORT, // ex: EST, PST
  LONG, // ex: Eastern Time Zone, Pacific Time Zone
  OFFSET, // GMT-4, GMT-8
  FULL, // ex: America/New_York, America/Los_Angeles
}

export const getTimeZone = (format: TZ_FORMAT) => {
  switch (format) {
    case TZ_FORMAT.SHORT:
      return new Date()
        .toLocaleTimeString("en-us", { timeZoneName: "short" })
        .replace(/()/g, "")
        .split(" ")
        .slice(2);
    case TZ_FORMAT.LONG:
      return new Date()
        .toLocaleTimeString("en-us", {
          timeZoneName: "long",
        })
        .replace(/()/g, "")
        .split(" ")
        .slice(2)
        .join(" ");
    case TZ_FORMAT.OFFSET:
      return new Date()
        .toLocaleTimeString("en-us", {
          timeZoneName: "longOffset",
        })
        .replace(/()/g, "")
        .split(" ")[2];
    case TZ_FORMAT.FULL:
    default:
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
};
