import { gql, useQuery } from "@apollo/client";
import { DocumentIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { randomId } from "@src/utils/randomId";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
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
import { InputFileField, maxFileSize } from "../inputs/InputFileField";
import { fileToBase64 } from "../../utils/fileToBase64";
import { User, useUploadLabDocumentMutation } from "../../graphql/generated";
import dayjs from "dayjs";
import { useUserSession } from "../../hooks/useUserSession";
import { useNotificationStore } from "../../hooks/useNotificationStore";

const conditions = [
  "High blood pressure",
  "Pre-diabetes",
  "Joint pain",
  "Fatty Liver disease",
  "Prostate disease",
  "Migraines",
  "Arthritis",
  "High Cholesterol",
  "Type II Diabetes",
  "Sleep apnea",
  "Back pain",
  "Nerve pain",
  "PCOS (polycystic ovary syndrome)",
  "None of the above",
];
const previousconditions = [
  "Kidney disease (not including kidney stones)",
  "Heart conditions such as coronary artery disease or heart failure",
  "Suicidal attempts or ideation",
  "Anorexia or bulimia",
  "Stroke",
  "Cancer",
  "Seizures",
  "Liver disease (not including non-alcoholic fatty liver disease)",
  "If Female: Pregnant or plan on getting pregnant up to 6 months from now",
  "If Female: Breastfeeding or plan on breastfeeding up to 6 months from now",
  "None of the above",
];
export const medications = [
  {
    id: "antidepressants",
    name: "Tricyclic antidepressants",
    medicines: [
      "Amitriptyline",
      "Desipramine",
      "Doxepin",
      "Imipramine",
      "Nortriptyline",
      "Trazodone",
    ],
  },
  {
    id: "corticosteroids",
    name: "Corticosteroids",
    medicines: ["Cortisone", "Prednisolone", "Prednisone"],
  },
  { id: "antihistamines", name: "Antihistamines" },
  { id: "antipsychotics", name: "Antipsychotics" },
  { id: "anticonvulsants", name: "Anticonvulsants" },
  {
    id: "ssris",
    name: "SSRIs",
    medicines: [
      "Citalopram",
      "Escitalopram",
      "Fluoxetine",
      "Fluvoxamine",
      "Paroxetine",
      "Sertraline",
    ],
  },
  {
    id: "snris",
    name: "SNRIs",
    medicines: ["Desvenlafaxine", "Duloxetine", "Venlafaxine"],
  },
  {
    id: "maois",
    name: "MAOIs",
    medicines: ["Isocarboxazid", "Phenelzine", "Tranylcypromine"],
  },
  { id: "insulin", name: "Insulin" },
  { id: "sulfonylureas", name: "Sulfonylureas" },
  { id: "opiates", name: "Opiates (including Methadone or Buprenorphine)" },
  { id: "benzodiazepines", name: "Benzodiazepines" },
  { id: "barbiturates", name: "Barbiturates" },
  { id: "anticoagulants", name: "Anticoagulants / Blood Thinners" },
  {
    id: "beta-blockers",
    name: "Beta-Blockers",
    medicines: [
      "Acebutolol",
      "Atenolol",
      "Metoprolol",
      "Propranolol",
      "Timolol",
    ],
  },
  {
    id: "alpha-blockers",
    name: "Alpha-Blockers",
    medicines: ["Clonidine", "Prazosin"],
  },
  {
    id: "arbs",
    name: "ARBs",
    medicines: [
      "Irbesartan",
      "Losartan",
      "Olmesartan",
      "Telmisartan",
      "Valsartan",
    ],
  },
  {
    id: "ace-inhibitors",
    name: "ACE inhibitors",
    medicines: ["Enalapril", "Lisinopril", "Perindopril", "Ramipril"],
  },
  { id: "ccbs", name: "CCBs", medicines: ["Amlodipine", "Diltiazem"] },
  { id: "none", name: "None of the above" },
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
            "I've never tried to lose weight before",
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
      const [showSurgicalHistoryTextArea, setShowSurgicalHistoryTextArea] =
        useState(false);
      useEffect(() => {
        if (props.control._formValues.surgeries.hasSurgicalHistory === "Yes") {
          setShowSurgicalHistoryTextArea(true);
        } else {
          setShowSurgicalHistoryTextArea(false);
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
    id: "medications",
    question:
      "Are you currently taking any of the following medications on a daily basis?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <React.Fragment>
        <MultiCheckboxFormQuestion
          {...props}
          multiple={true}
          options={medications.map((m) => ({ key: m.id, value: m.name }))}
        />
      </React.Fragment>
    ),
    helperText: "Select all that apply",
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

export const medicationQuestionnairs: QuestionProps<any>[] = medications
  .filter((m) => m.medicines?.length)
  .map((m) => ({
    id: m.id,
    question: `You selected ${m.name}. Which one of these do you take?`,
    Component: (props: MultiCheckboxQuestionProps) => (
      <React.Fragment>
        <MultiCheckboxFormQuestion
          {...props}
          name={`medicines.${props.name}`}
          multiple={true}
          options={m.medicines || []}
          hasOtherOption
        />
      </React.Fragment>
    ),
    helperText: "Select all that apply",
    parent_id: "medications",
  }));

const requiredDocNames = [
  "TSH",
  "Hb1Ac",
  "Lipid Panel",
  "Comprehensive Metabolic Panel",
];

function FinalSubmitMetabolic({
  user,
  control,
}: {
  control: Control<any>;
  user?: User;
}) {
  const { addNotification } = useNotificationStore();

  const { field } = useController({
    name: "requiredLabs" as string,
    defaultValue: false,
    control,
  });

  const [error, setError] = useState<string | null>(null);
  const [uploadLabDocument] = useUploadLabDocumentMutation();

  useEffect(() => {
    if (field?.value) {
      addNotification({
        type: "success",
        description: "Uploaded your lab documents successfully.",
        id: randomId(),
        title: "Lab Documents Uploaded",
      });
    }
  }, [field?.value]);

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
            href="https://www.labcorp.com/labs-and-appointment"
            className="text-blue-500"
          >
            {` https://www.labcorp.com/labs-and-appointment `}
          </a>
        </span>
        Routine labs should be covered by your insurance.
      </p>
      <InputFileField
        field={field}
        multi
        getValue={async (file) => {
          if (file.size > maxFileSize) {
            setError("File size limit: 10 MB.");
          } else {
            setError(null);
            try {
              const base64Data = await fileToBase64(file, false);
              const { errors, data } = await uploadLabDocument({
                variables: {
                  file: base64Data,
                  fileName: `${dayjs().format("YYYY-MM-DD_HHmmss")}_${
                    file.name
                  }`,
                  patientId: user?.akutePatientId ?? "",
                },
              });
              if (errors) {
                setError(errors.map((e) => e.message).join(" "));
              } else {
                setError(null);
                const documentId = data?.uploadDocument?.id;
                console.log(`Document uploaded: ${JSON.stringify(data)}`);
                return documentId;
              }
            } catch (error) {
              console.log("Error uploading lab document.", error);
              setError("Error uploading lab document.");
            }
          }
          return null;
        }}
      >
        <div className="flex flex-col gap-y-3 items-center justify-center h-full">
          <div className="p-2 rounded-full max-w-fit">
            <DocumentIcon
              height={60}
              width={60}
              style={field.value ? { color: "#16a34a" } : undefined}
            />
          </div>
          <p className={`font-bold ${field.value ? "text-green-600" : ""}`}>
            {field.value ? "Labs uploaded" : "Upload your lab results"}
          </p>
          <p className="text-sm text-gray-500">
            Accepted file types are: png, jpg, pdf.
          </p>
          <Button>
            {field.value ? "Choose different files" : "Upload from computer"}
          </Button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </InputFileField>
    </div>
  );
}

export const MapMarker = (props: any) => {
  return (
    <div className="w-8 h-8 rounded-full  flex justify-center items-center">
      <LocationMarkerIcon
        onClick={() => props.onSelectMarker()}
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
  const getAllPharmacyLocationsByName = useQuery(pharmacyLocations, {
    variables: {
      input: {
        name: pharmacyName,
      },
    },
  });

  function generatePharmacyMapMarkers() {
    return getAllPharmacyLocationsByName?.data?.pharmacyLocations.map(
      (location: any) => {
        return (
          <MapMarker
            name="selectedPharmacy"
            onSelectMarker={() => {
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
