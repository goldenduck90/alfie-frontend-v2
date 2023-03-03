import { OptionInput, SelectInput } from "@src/components/inputs/SelectInput";
import { TimeslotButton } from "@src/components/ui/TimeslotButton";
import { EaProvider, Role } from "@src/graphql/generated";
import { rawTimeZones } from "@vvo/tzdb";
import { useState } from "react";
import { DateSelector } from "../Reschedule";

const getTimezoneAbbrv = (timeZone: string): any => {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'short'
    })?.formatToParts(new Date())?.find(part => part.type == "timeZoneName")?.value;
}

const getTimezoneRaw = (tz: string) => {
    return rawTimeZones.find(timezone => timezone.name === tz)?.rawFormat
}

export const TimeslotSelection = () => {
    const [timezone, setTimezone] = useState(
        { name: getTimezoneRaw(Intl.DateTimeFormat().resolvedOptions().timeZone) || '', abbreviation: getTimezoneAbbrv(Intl.DateTimeFormat().resolvedOptions().timeZone) }
    );

    // TODO: remove; test data
    const testEaProvider: EaProvider = {
        email: "npierre@provider.com",
        id: "1",
        name: "Noah Pierre",
        numberOfPatients: 0,
        timezone: "MT",
        type: Role.Doctor,
    };
    const timeslot = {
        eaProvider: testEaProvider,
        startTimeInUtc: "2023-02-21T20:25:15.656Z",
        endTimeInUtc: "2023-02-21T23:25:15.656Z",
    };
    const timeslot2 = {
        eaProvider: testEaProvider,
        startTimeInUtc: "2023-02-22T20:25:15.656Z",
        endTimeInUtc: "2023-02-21T23:25:15.656Z",
    };
    const timeslot3 = {
        eaProvider: testEaProvider,
        startTimeInUtc: "2023-02-23T20:25:15.656Z",
        endTimeInUtc: "2023-02-21T23:25:15.656Z",
    };
    const timeslot4 = {
        eaProvider: testEaProvider,
        startTimeInUtc: "2023-02-24T20:25:15.656Z",
        endTimeInUtc: "2023-02-21T23:25:15.656Z",
    };
    const timeslot5 = {
        eaProvider: testEaProvider,
        startTimeInUtc: "2023-02-25T20:25:15.656Z",
        endTimeInUtc: "2023-02-21T23:25:15.656Z",
    };

    const timeslots = [timeslot, timeslot2, timeslot3, timeslot4, timeslot5];

    const updateTimezone = (tz: string) => {
        const timezoneAbbreviation = rawTimeZones.find(timezone => timezone.name === tz)?.abbreviation
        setTimezone({ name: tz, abbreviation: timezoneAbbreviation })
    }

    const getTimezoneOptions = () => {
        const timezoneOptions = rawTimeZones.map(
            (tz: { abbreviation: string, rawFormat: string; name: string }) => {
                let timezoneOption: OptionInput = { label: tz.rawFormat, value: tz.name }
                if (tz.rawFormat === timezone.name) {
                    timezoneOption = { ...timezoneOption, selected: true } as OptionInput
                }
                return timezoneOption
            })
        return timezoneOptions;
    }
    return (
        <div className="flex flex-col gap-y-2">
            <DateSelector />
            <div className="flex justify-between">
                <p className="font-bold text-sm text-gray-600">Choose time</p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {timeslots.map((timeslot) => (
                    <TimeslotButton
                        key={timeslot.startTimeInUtc}
                        timeslot={timeslot}
                        tz={timezone}
                    />
                ))}
            </div>
            <p className="font-bold text-sm text-gray-600">Timezone</p>
            <SelectInput
                name={timezone.name}
                placeholder="Select a timezone..."
                options={getTimezoneOptions()}
                onChange={(tz) => updateTimezone(tz)}
            />
        </div>
    );
};
