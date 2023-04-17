import { gql, useQuery } from "@apollo/client";
import { DocumentIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/Checkbox";
import { TextField } from "../ui/TextField";
import {
  MultiCheckboxFormQuestion,
  MultiCheckboxQuestionProps,
  MultipleTextInput,
  QuestionProps,
  RadioGroupInput,
  RadioGroupInputProps,
  TextAreaInput,
} from "./common";

const conditions = [
  "High blood pressure",
  "Pre-diabetes",
  "Joint pain",
  "Fatty Liver disease",
  "Prostate disease",
  "Migraines",
  "Arthritis",
  "Cancer",
  "High Cholesterol",
  "Type II Diabetes",
  "Sleep apnea",
  "Back pain",
  "Never pain",
  "PCOS (polycystic ovary syndrome)",
  "None of the above",
];
const previousconditions = [
  "Kidney disease (not including kidney stones)",
  "Heart conditions such as coronary artery disease or heart failure",
  "Suicidal attempts or ideation",
  "Anorexia or bulimia",
  "Stroke",
  "Brain cancer",
  "Seizures",
  "Liver disease (not including non - alcoholic fatty liver disease)",
  "If Female: Pregnant or plan on getting pregnant up to 6 months from now",
  "If Female: Breastfeeding or plan on breastfeeding up to 6 months from now",
  "None of the above",
];

export const medicalQuestions: QuestionProps<any>[] = [
  {
    id: "weightLossAttemptTime",
    question: "How long have you been trying to lose weight?",
    Component: (props: MultiCheckboxQuestionProps) => {
      return (
        <RadioGroupInput
          {...props}
          options={[
            "My whole life",
            "Several years",
            "6-12 Months",
            "Less than 6 Months",
            `I've never tried to lose weigth before`,
          ]}
        />
      );
    },
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "weightManagementMethods",
    question:
      "Have you tried any of the following weight management methods in the past?",
    Component: (props: MultiCheckboxQuestionProps) => {
      const { field } = useController({
        name: props.name,
        control: props.control,
      });
      // React.useEffect(() => {
      //   if (!field.value) return;
      //   const flattenedValues = field?.value?.map((v: any) => v).join(', ');
      //   console.log(flattenedValues);
      //   field.onChange(flattenedValues);
      // }, [field, field.value]);
      return (
        <MultiCheckboxFormQuestion
          {...props}
          multiple={true}
          options={[
            "Calorie Counting / Restriction Diets",
            "Meal Replacements",
            "Intermittent fasting",
            "Personal Trainer",
            "Weight loss program (e.g. Noom, Weight Watchers)",
            "Weight loss surgery",
            "None of the above",
          ]}
        />
      );
    },
    validation: z.string().array().nonempty("At least one option is required"),
    helperText: "Select all that apply",
  },
  {
    id: "conditions",
    question: "Do you have any of the following conditions?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <MultiCheckboxFormQuestion
        {...props}
        multiple={true}
        options={conditions}
      />
    ),
    validation: z.string().array().nonempty("At least one option is required"),
    helperText: "Select all that apply",
  },
  {
    id: "previousConditions",
    question:
      "Have you ever been diagnosed with or treated for any of the following conditions?",
    Component: (props: RadioGroupInputProps) => {
      return (
        <React.Fragment>
          <MultiCheckboxFormQuestion
            {...props}
            multiple={true}
            options={previousconditions}
          />
          {/* NOT SUPPORTED AT THIS TIME -- DOM */}
          {/* <div className='w-full'>
            <TextAreaInput
              {...props}
              validation={undefined}
              question=''
              name={`q4.text`}
            />
          </div> */}
        </React.Fragment>
      );
    },
    validation: z.string().array().nonempty("At least one option is required"),
    helperText: "Select all that apply",
  },
  {
    id: "surgeries",
    question: "Have you had any surgeries in the past?",
    Component: (props: MultiCheckboxQuestionProps) => {
      const [showSurgicalHistoryTextArea, setShowSurgicalHisotryTextArea] =
        useState(false);
      useEffect(() => {
        if (props.control._formValues.surgeries.hasSurgicalHistory === "Yes") {
          setShowSurgicalHisotryTextArea(true);
        } else {
          setShowSurgicalHisotryTextArea(false);
        }
      }, [props.control?._formValues?.surgeries?.hasSurgicalHistory]);

      return (
        <React.Fragment>
          <RadioGroupInput
            {...props}
            name={`surgeries.hasSurgicalHistory`}
            options={["Yes", "No"]}
          />
          <div className="w-full">
            <p>Please provide more details on your past surgical procedures</p>
            <TextAreaInput
              {...props}
              validation={undefined}
              question=""
              name={`surgeries.surgicalHistory`}
            />
          </div>
        </React.Fragment>
      );
    },
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Type your answer",
  },
  {
    id: "allergies",
    question: "Please list any medication allergies you are aware of:",
    Component: MultipleTextInput,
    helperText: "Type your answer",
  },
  {
    id: "usePillPack",
    question: "Would you like to use PillPack?",
    Component: (props: any) => PillPackStep(props),
    helperText: "Information",
  },
  {
    id: "requiredLabs",
    question: "Identifying Information:",
    Component: FinalSubmitMetabolic,
    helperText: "Information",
  },
];

const requiredDocNames = [
  "TSH",
  "Hb1Ac",
  "Lipid Panel",
  "Comprehensive Metabolic Panel",
];
function FinalSubmitMetabolic({ control }: { control: Control<any> }) {
  const { field } = useController({
    name: "requiredLabs",
    defaultValue: false,
    control,
  });

  return (
    <div className="mx-auto max-w-[500px]">
      <p className="text font-bold text-center">
        In order to properly determine the right medication for you, we need the
        following labs:
      </p>
      <div className="flex flex-col px-2 mt-6">
        {requiredDocNames.map((name) => {
          return (
            <div
              key={name}
              className=" bg-gray-100 py-4 px-2 flex gap-x-2 items-center text-gray-700 first:rounded-t-md last:rounded-b-md"
            >
              <DocumentIcon className="w-6 h-6 stroke-gray-500" />
              {name}
            </div>
          );
        })}
      </div>
      <div></div>
      <p className="py-6 px-2">
        Use this link to schedule an appointment for routine lab work at
        Labcorp:
        <span>
          <a
            href={`https://www.labcorp.com/labs-and-appointment`}
            className="text-blue-500"
          >
            {` https://www.labcorp.com/labs-and-appointment `}
          </a>
        </span>
        Routine labs should be covered by your insurance.
      </p>
      <div className="px-2 ">
        <Checkbox
          {...field}
          ref={field.ref}
          checked={field?.value}
          label="I have already had the required labs done"
        />
      </div>
    </div>
  );
}
export const MapMarker = (props: any) => {
  return (
    <div className="w-8 h-8 rounded-full  flex justify-center items-center">
      <LocationMarkerIcon
        onClick={() => props.onSelectOfMarker()}
        className="w-8 h-8 text-red-500"
      />
    </div>
  );
};
function PillPackStep(props: any) {
  const [selectedMarker, setSelectedMarker] = React.useState<any>(null);
  const [pharmacyName, setPharmacyName] = React.useState<string>("");
  const { field } = useController({
    name: "pillpack.select",
    defaultValue: false,
    control: props.control,
  });
  // pharmacy name useController
  const { field: pharmacy } = useController({
    name: "pillpack.pharmacy",
    defaultValue: "",
    control: props.control,
  });

  console.log(pharmacy, "pharmacyNameField");
  // set the selectedMarker to localStorage under the key "labCorpLocation"
  React.useEffect(() => {
    if (selectedMarker) {
      // set the selectedMarker to localStorage under the key "pharmacyLocation"
      pharmacy.onChange(selectedMarker.id);
    }
  }, [pharmacy, selectedMarker]);

  const googleReverseGeoCode = gql`
    query reverseGeoCodeAddress {
      reverseGeoCode {
        formatted_address
        geometry {
          location {
            lat
            lng
          }
        }
      }
    }
  `;
  const result = useQuery(googleReverseGeoCode, {});

  const defaultProps = {
    center: {
      lat: result?.data?.reverseGeoCode[0]?.geometry?.location?.lat,
      lng: result?.data?.reverseGeoCode[0]?.geometry?.location?.lng,
    },
    zoom: 13,
  };
  const pharmacyLocations = gql`
    query getPharmacyLocations($input: PharmacyLocationInput!) {
      pharmacyLocations(input: $input) {
        id
        name
        lat
        lng
        address_line_1
        address_line_2
        address_city
        address_state
        address_zipcode
        primary_phone_number
      }
    }
  `;
  const getAllpharmacyLocationsByName = useQuery(pharmacyLocations, {
    variables: {
      input: {
        name: pharmacyName,
      },
    },
  });

  function generatePharmacyMapMarkers() {
    return getAllpharmacyLocationsByName?.data?.pharmacyLocations.map(
      (location: any) => {
        return (
          <MapMarker
            name="selectedPharmacy"
            onSelectOfMarker={() => {
              console.log(location, "location");
              setSelectedMarker(location);
            }}
            lat={location.lat}
            lng={location.lng}
            text={location.name}
          />
        );
      }
    );
  }
  return (
    <React.Fragment>
      <RadioGroupInput
        {...props}
        name={`pillpack.select`}
        options={["Yes", "No"]}
      />
      <div className="">
        {selectedMarker && (
          <div className="w-full">
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-700 font-bold text-lg">
                {selectedMarker.name}
              </p>
              <p className="text-gray-700">{selectedMarker.address_line_1}</p>
              <p className="text-gray-700">{selectedMarker.address_line_2}</p>
              <p className="text-gray-700">
                {selectedMarker.address_city}, {selectedMarker.address_state}{" "}
                {selectedMarker.address_zipcode}
              </p>
              <p className="text-gray-700">
                {selectedMarker.primary_phone_number}
              </p>
            </div>
          </div>
        )}
        {field.value === "No" && (
          <div>
            {result?.data?.reverseGeoCode.length > 0 && (
              <>
                <div className="py-8 ">
                  <TextField
                    inputSize="medium"
                    name="pillpack.pharmacy"
                    placeholder="Enter Pharmacy Name"
                    onChange={(e) => {
                      if (e.target.value.length >= 3) {
                        setPharmacyName(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="relative w-[410px] h-96">
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCKnplb2bqReqMwCuz4fFm5YcD7S-lq3wg",
                    }}
                    defaultCenter={defaultProps.center}
                    yesIWantToUseGoogleMapApiInternals
                    defaultZoom={defaultProps.zoom}
                    debounced={false}
                    onGoogleApiLoaded={({ map, maps }) => {
                      console.log(map, maps);
                      // refresh the map once the lat and long are loaded from the graphql query
                      if (
                        result?.data?.reverseGeoCode[0].geometry.location.lat
                      ) {
                        map.setCenter(
                          new maps.LatLng(
                            result?.data?.reverseGeoCode[0].geometry.location.lat,
                            result?.data?.reverseGeoCode[0].geometry.location.lng
                          )
                        );
                      }
                    }}
                  >
                    {generatePharmacyMapMarkers()}
                  </GoogleMapReact>
                </div>
              </>
            )}
            {result.loading && <div className="">Loading...</div>}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
