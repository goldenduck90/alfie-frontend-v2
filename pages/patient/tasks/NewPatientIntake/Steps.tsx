/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import * as Sentry from "@sentry/react";
import { FormikProps, FormikValues, useField } from "formik";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Checkbox } from "../../../../src/components/inputs/Checkbox";
import { CheckboxGroup } from "../../../../src/components/inputs/CheckBoxGroup";
import { SelectInput } from "../../../../src/components/inputs/SelectInput";
import { StringFieldArray } from "../../../../src/components/inputs/StringFieldArray";
import { TextArea } from "../../../../src/components/inputs/TextArea";
import { TextInput } from "../../../../src/components/inputs/TextInput";
import { Loading } from "../../../../src/components/Loading";
import { parseCachedVal } from "../../helpers";
import { Question } from "../../Question";

const MapMarker = (props: any) => {
  return (
    <div className="w-8 h-8 rounded-full  flex justify-center items-center">
      <LocationMarkerIcon
        onClick={() => props.onSelectOfMarker()}
        className="w-8 h-8 text-red-500"
      />
    </div>
  );
};
export const initialValues = {
  weightLossAttemptTime: parseCachedVal(localStorage.weightLossAttemptTime, ""),

  weightManagementMethods: parseCachedVal(
    localStorage.weightManagementMethods,
    []
  ),
  conditions: parseCachedVal(localStorage.conditions, []),
  previousConditions: parseCachedVal(localStorage.previousConditions, []),
  medications: parseCachedVal(localStorage.medications, []),
  hasSurgicalHistory: parseCachedVal(localStorage.hasSurgicalHistory, ""),
  surgicalHistory: parseCachedVal(localStorage.surgicalHistory, ""),
  medicationAllergies: parseCachedVal(localStorage.medicationAllergies, ""),
  panicFrequency: parseCachedVal(localStorage.panicFrequency, ""),
  allergies: parseCachedVal(localStorage.allergies, [""]),
  usePillPack: parseCachedVal(localStorage.usePillPack, ""),
  preferredPharmacy: parseCachedVal(localStorage.preferredPharmacy, ""),
};

type StepProps = (
  values: FormikValues,
  formikBag: FormikProps<FormikValues>,
  currentStepIndex: number
) => Promise<unknown>;

export const beforePrev: StepProps = (_value, _params, currentStepIndex) => {
  _params.setErrors({});
  localStorage.setItem("questionnaireStep", String(currentStepIndex - 1));
  return Promise.resolve();
};
export const beforeNext: StepProps = (_values, _params, currentStepIndex) => {
  localStorage.setItem("questionnaireStep", String(currentStepIndex + 1));
  return Promise.resolve();
};
export const Step1 = () => (
  <Question
    questionText="How long have you been trying to lose weight?"
    input={
      <SelectInput
        cache
        name="weightLossAttemptTime"
        placeholder="Select an option..."
        options={[
          {
            label: "My whole life",
            value: "My whole life",
          },
          {
            label: "Several years",
            value: "Several years",
          },
          {
            label: "6-12 months",
            value: "6-12 months",
          },
          {
            label: "Less than 6 months",
            value: "Less than 6 months",
          },
          {
            label: "I've never tried to lose weight before",
            value: "I've never tried to lose weight before",
          },
        ]}
      />
    }
  />
);
Step1.validation = Yup.object().shape({
  weightLossAttemptTime: Yup.string().required("Please select a value"),
});

export const Step2 = () => (
  <Question
    questionText="Have you tried any of the following weight management methods in the past?"
    input={
      <CheckboxGroup
        cache
        name="weightManagementMethods"
        onChange={(props) => {
          if (props.id === "None of the above") {
            props.setCheckboxes(props.checked ? [props.id] : []);
          } else {
            props.setCheckboxes(
              props.values.filter((id) => id !== "None of the above")
            );
          }
        }}
        items={[
          "Calorie Counting / Restriction Diets",
          "Meal Replacements",
          "Intermittent fasting",
          "Personal Trainer",
          "Weight loss program (e.g. Noom, Weight Watchers)",
          "Weight loss surgery",
          "None of the above",
        ]}
      />
    }
  />
);
Step2.validation = Yup.object().shape({
  weightManagementMethods: Yup.array().min(1, "Please select a value"),
});

export const Step3 = () => (
  <Question
    aboveQuestionText="Obesity is the number one risk factor for a wide range of conditions. Understanding your current health helps us determine which medications can be effectively tailored to you."
    questionText="Do you have any of the following conditions? "
    input={
      <CheckboxGroup
        cache
        name="conditions"
        onChange={(props) => {
          if (props.id === "None of the above") {
            props.setCheckboxes(props.checked ? [props.id] : []);
          } else {
            props.setCheckboxes(
              props.values.filter((id) => id !== "None of the above")
            );
          }
        }}
        items={[
          "High blood pressure",
          "Pre-diabetes",
          "Joint pain",
          "Fatty Liver disease",
          "Prostate disease",
          "Migraines",
          "Arthritis",
          "Cancer",
          "High Cholesterol",
          "Type II diabetes",
          "Sleep apnea",
          "Back pain",
          "Nerve pain",
          "PCOS (polycystic ovary syndrome)",
          "None of the above",
        ]}
      />
    }
  />
);
Step3.validation = Yup.object().shape({
  conditions: Yup.array().min(1, "Please select a value"),
});

export const Step4 = () => (
  <Question
    aboveQuestionText="One or more of the following conditions may put you at increased risk of health complications. Please review the list carefully and select all that apply"
    questionText="Have you ever been diagnosed with or treated for any of the following conditions?"
    input={
      <CheckboxGroup
        cache
        name="previousConditions"
        onChange={(props) => {
          if (props.id === "None of the above") {
            props.setCheckboxes(props.checked ? [props.id] : []);
          } else {
            props.setCheckboxes(
              props.values.filter((id) => id !== "None of the above")
            );
          }
        }}
        items={[
          "Kidney disease (not including kidney stones)",
          "Heart conditions such as coronary artery disease or heart failure",
          "Suicidal attempts or ideation",
          "Anorexia or bulimia",
          "Stroke",
          "Brain cancer",
          "Seizures",
          "Liver disease (not including non-alcoholic fatty liver disease)",
          "If Female: Pregnant or plan on getting pregnant up to 6 months from now",
          "If Female: Breastfeeding or plan on breastfeeding up to 6 months from now",
          "None of the above",
        ]}
      />
    }
  />
);
Step4.validation = Yup.object().shape({
  previousConditions: Yup.array().min(1, "Please select a value"),
});

export const Step5 = () => (
  <Question
    aboveQuestionText="Your doctor needs this information to select the weight loss medication(s) that is safe and effective for you. Please review the list carefully and select all that apply"
    questionText="Do you take any of the following medications?"
    input={
      <CheckboxGroup
        cache
        name="medications"
        onChange={(props) => {
          if (props.id === "None of the above") {
            props.setCheckboxes(props.checked ? [props.id] : []);
          } else {
            props.setCheckboxes(
              props.values.filter((id) => id !== "None of the above")
            );
          }
        }}
        items={[
          "Antidepressants",
          "Amphetamines",
          "Medications containing bupropion (e.g. Welbutrin, Aplenzin, Forfivo, or Zyban)",
          "Opiates",
          "Controlled Substances",
          "Seizure Medications",
          "Monoamine oxidase inhibitors (MAOIs)",
          "Dopaminergic medications",
          "Recent and abruptly discontinued alcohol, benzodiazepine, barbiturate, or anti-epilepsy medications",
          "Levoxothyrine",
          "Selective serotonin reuptake inhibitors",
          "Beta Blockers",
          "Type 1C antiarrhythmic agents",
          "Tricylic antidepressants",
          "None of the above",
        ]}
      />
    }
  />
);
Step5.validation = Yup.object().shape({
  medications: Yup.array().min(1, "Please select a value"),
});

const ConditionalSelects = () => {
  const [, { value }, { setError }] = useField("hasSurgicalHistory");
  const [
    ,
    ,
    { setValue: setSurgicalHistory, setError: setSurgicalHistoryError },
  ] = useField("surgicalHistory");
  const showSecondQuestion = value === "Yes";
  return (
    <>
      <SelectInput
        cache
        name="hasSurgicalHistory"
        placeholder="Select an option..."
        onChange={(selectVal: string) => {
          if (selectVal === "No") {
            delete localStorage.surgicalHistory;
            setSurgicalHistory(undefined);
            setError(undefined);
            setSurgicalHistoryError(undefined);
          }
        }}
        options={[
          {
            label: "Yes",
            value: "Yes",
          },
          {
            label: "No",
            value: "No",
          },
        ]}
      />
      {showSecondQuestion && (
        <div className="mt-10">
          <Question
            questionText="Please provide more details on your past surgical procedures"
            input={<TextArea cache name="surgicalHistory" />}
          />
        </div>
      )}
    </>
  );
};
export const Step6 = () => (
  <Question
    questionText="Have you had any surgeries in the past?"
    input={<ConditionalSelects />}
  />
);
Step6.validation = Yup.object().shape({
  hasSurgicalHistory: Yup.string().required("Please select a value"),
  surgicalHistory: Yup.string().when("hasSurgicalHistory", {
    is: "Yes",
    then: Yup.string()
      .required("Please enter a value")
      .min(12, "Cannot be less than 12 characters"),
  }),
});

export const Step7 = () => {
  return (
    <Question
      questionText="Please list any medication allergies you are aware of"
      input={<StringFieldArray cache name="allergies" />}
    />
  );
};

export const Step8 = () => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [pharmacyName, setPharmacyName] = useState<string>("");
  const [, { value }] = useField("usePillPack");
  // set the selectedMarker to localStorage under the key "labCorpLocation"

  useEffect(() => {
    if (selectedMarker) {
      localStorage.setItem("pharmacy", String(selectedMarker.id));
    }
  }, [selectedMarker]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      lat: result?.data?.reverseGeoCode[0].geometry.location.lat,
      lng: result?.data?.reverseGeoCode[0].geometry.location.lng,
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

  function generateLabLocationsMapMarkers() {
    return getAllpharmacyLocationsByName?.data?.pharmacyLocations.map(
      (location: any) => {
        return (
          <MapMarker
            onSelectOfMarker={() => {
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
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (result.error) {
      Sentry.captureException(new Error(result.error.message), {
        tags: {
          query: "reverseGeoCodeAddress",
          component: "Step8",
        },
      });
    }
  }, [result]);
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (getAllpharmacyLocationsByName.error) {
      Sentry.captureException(
        new Error(getAllpharmacyLocationsByName.error.message),
        {
          tags: {
            query: "getPharmacyLocations",
            component: "Step8",
          },
        }
      );
    }
  }, [getAllpharmacyLocationsByName]);
  return (
    <Question
      aboveQuestionText="We have partnered with PillPack to deliver medications straight to your door. If you would like to use PillPack to receive your medications, please sign up here: https://my.pillpack.com/signup. If not, please tell us your preferred pharmacy."
      questionText="Would you like to use PillPack?"
      input={
        <>
          <div>
            <SelectInput
              cache
              name="usePillPack"
              placeholder="Select an option..."
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="mt-10">
            {value === "No" && (
              <Question
                aboveQuestionText="Enter the pharmacy you would like to use"
                input={
                  <div>
                    <div className="pb-8">
                      <TextInput
                        name="pharmacy"
                        placeholder="Search for a pharmacy"
                        callbackForValue={(inputValue: string) => {
                          console.log(inputValue, "inputValue");
                          if (inputValue.length >= 3) {
                            setPharmacyName(inputValue);
                          }
                        }}
                        loading={getAllpharmacyLocationsByName.loading}
                      />
                    </div>
                    <div style={{ height: "50vh", width: "100%" }}>
                      {result?.data?.reverseGeoCode.length > 0 && (
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
                              result?.data?.reverseGeoCode[0].geometry.location
                                .lat
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
                          {generateLabLocationsMapMarkers()}
                        </GoogleMapReact>
                      )}
                      {result.loading && (
                        <div className="">
                          <Loading />
                        </div>
                      )}
                    </div>
                  </div>
                }
              />
            )}
            {selectedMarker && (
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">{selectedMarker.name}</div>
                <div className="text-lg">{selectedMarker.address_line_1}</div>
                <div className="text-lg">
                  {selectedMarker.address_city}, {selectedMarker.address_state}{" "}
                  {selectedMarker.address_zipcode}
                </div>
              </div>
            )}
          </div>
        </>
      }
    />
  );
};
Step8.validation = Yup.object().shape({
  usePillPack: Yup.string().required("Required"),
  pharmacy: Yup.string().when("usePillPack", {
    is: "No",
    then: Yup.string().required(
      "Required, Please enter a pharmacy name and select a pharmacy from the map"
    ),
  }),
  //
});

export const Step9 = () => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  // set the selectedMarker to localStorage under the key "labCorpLocation"

  useEffect(() => {
    if (selectedMarker) {
      localStorage.setItem("labCorpLocation", String(selectedMarker._id));
    }
  }, [selectedMarker]);

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

  if (!result.loading) console.log(result, "dataForReverse");

  const labcorpLocationsQuery = gql`
    query getAllLabs {
      getLabLocations {
        _id
        name
        city
        state
        streetAddress
        postalCode
        latitude
        longitude
      }
    }
  `;
  const labCorpLocations = useQuery(labcorpLocationsQuery);
  function generateLabLocationsMapMarkers() {
    return labCorpLocations?.data?.getLabLocations.map((location: any) => {
      return (
        <MapMarker
          onSelectOfMarker={() => {
            setSelectedMarker(location);
          }}
          lat={location.latitude}
          lng={location.longitude}
          text={location.name}
        />
      );
    });
  }
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (result.error) {
      Sentry.captureException(new Error(result.error.message), {
        tags: {
          query: "reverseGeoCodeAddress",
          component: "Step9",
        },
      });
    }
  }, [result]);
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    console.log(labCorpLocations, "labCorpLocations");
    if (labCorpLocations.error) {
      Sentry.captureException(new Error(labCorpLocations.error.message), {
        tags: {
          query: "getAllLabs",
          component: "Step9",
        },
      });
    }
  }, [labCorpLocations]);
  const defaultProps = {
    center: {
      lat: result?.data?.reverseGeoCode[0].geometry.location.lat,
      lng: result?.data?.reverseGeoCode[0].geometry.location.lng,
    },
    zoom: 13,
  };
  return (
    <div>
      <Question
        aboveQuestionText="As part of our metabolic profiling process, we will need to collect labs from you. Please select a lab location for us to send labs."
        input={
          <div style={{ height: "50vh", width: "100%" }}>
            {result?.data?.reverseGeoCode.length > 0 && (
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
                  if (result?.data?.reverseGeoCode[0].geometry.location.lat) {
                    map.setCenter(
                      new maps.LatLng(
                        result?.data?.reverseGeoCode[0].geometry.location.lat,
                        result?.data?.reverseGeoCode[0].geometry.location.lng
                      )
                    );
                  }
                }}
              >
                {generateLabLocationsMapMarkers()}
              </GoogleMapReact>
            )}
            {result.loading && (
              <div>
                <Loading />
              </div>
            )}
          </div>
        }
      />
      {selectedMarker && (
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">
            {selectedMarker.locationTitle}
          </div>
          <div className="text-lg">{selectedMarker.streetAddress}</div>
          <div className="text-lg">
            {selectedMarker.city}, {selectedMarker.state}{" "}
            {selectedMarker.postalCode}
          </div>
        </div>
      )}

      <p className="font-mulish text-gray-900 pt-5">
        Use this link to schedule an appointment for routine lab work at
        Labcorp:{" "}
        <a
          target="_blank"
          className="text-blue-500"
          href="https://www.labcorp.com/labs-and-appointments"
        >
          https://www.labcorp.com/labs-and-appointments
        </a>
        . Routine labs should be covered by your insurance.
      </p>
      <p className="font-mulish text-gray-900 pt-5">
        If you already have TSH, Hb1Ac, Lipid Panel, and Comprehensive Metabolic
        Panel (all required) within the past 6 months please check this box and
        email them to{" "}
        <a className="text-blue-500" href="mailto: patients@joinalfie.com">
          patients@joinalfie.com.
        </a>
      </p>
      <div className="pt-8">
        <Checkbox
          label="I have already had the required labs done"
          name="hasRequiredLabs"
        />
      </div>
    </div>
  );
};

Step9.validation = Yup.object().shape({
  hasRequiredLabs: Yup.boolean(),
});
export const list = [
  {
    component: Step1,
    validationSchema: Step1.validation,
    beforeNext,
  },
  {
    component: Step2,
    validationSchema: Step2.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step3,
    validationSchema: Step3.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step4,
    validationSchema: Step4.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step5,
    validationSchema: Step5.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step6,
    validationSchema: Step6.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step7,
    beforePrev,
    beforeNext,
  },

  {
    component: Step8,
    validationSchema: Step8.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step9,
    validationSchema: Step9.validation,
    beforePrev,
    // beforeNext,
  },
];
