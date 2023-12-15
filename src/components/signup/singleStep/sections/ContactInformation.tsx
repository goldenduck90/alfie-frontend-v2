import { useField } from "formik";
import { TextInput } from "@src/components/inputs/TextInput";
import { IconInput } from "@src/components/inputs/IconInput";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { CalendarIcon } from "@heroicons/react/solid";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { States } from "@src/utils/states";
import { DateInput } from "@src/components/inputs/DateInput";
import dayjs from "dayjs";

const ContactInformation = () => {
  const [, , { setValue: setBiologicalSexValue }] = useField("biologicalSex");

  return (
    <div>
      <h3 className="text-xl text-brand-berry font-bold mb-4 mx-4">
        Contact Information
      </h3>
      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              First Name<span className="text-[red]">*</span>
            </p>
            <TextInput
              name="firstName"
              placeholder="Legal First Name"
              type="text"
            />
          </div>
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              Last Name<span className="text-[red]">*</span>
            </p>
            <TextInput
              name="lastName"
              placeholder="Legal Last Name"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              Date of Birth<span className="text-[red]">*</span>
            </p>
            <DateInput
              name="dateOfBirth"
              placeholder="MM/DD/YYYY"
              icon={<CalendarIcon className="h-5 w-5 text-brand-berry" />}
              maxDate={new Date()}
              minDate={dayjs(new Date()).subtract(90, "years").toDate()}
            />
          </div>
          <div className="flex flex-col  w-64">
            <p className="text-primary-700 font-bold">
              Assigned Sex at Birth<span className="text-[red]">*</span>
            </p>
            <div className="py-2 flex items-center">
              <RadioGroup.Root
                className="flex gap-8"
                defaultValue="male"
                onValueChange={(val: string) => setBiologicalSexValue(val)}
              >
                {["Male", "Female"].map((option, index) => (
                  <div key={index} className="flex items-center">
                    <RadioGroup.Item
                      className="relative w-[18px] h-[18px] min-w-[18px] bg-white border border-[#CBD5E1] rounded-md cursor-pointer"
                      value={option.toLowerCase()}
                      id={`biological-sex-${index}`}
                    >
                      <RadioGroup.Indicator className="absolute bg-primary-700 w-[8px] h-[8px] rounded-full top-[4px] left-[4px]" />
                    </RadioGroup.Item>
                    <label
                      className="pl-[16px] text-[16px] text-secondary-500 cursor-pointer select-none"
                      htmlFor={`biological-sex-${index}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              State<span className="text-[red]">*</span>
            </p>
            <SelectInput name="state" placeholder="State" options={States} />
          </div>
        </div>
        <div className="flex gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              Phone Number<span className="text-[red]">*</span>
            </p>
            <TextInput name="phone" placeholder="(000)000-0000" type="tel" />
          </div>
        </div>
        <div className="flex gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              Email<span className="text-[red]">*</span>
            </p>
            <TextInput name="email" placeholder="" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactInformation;
