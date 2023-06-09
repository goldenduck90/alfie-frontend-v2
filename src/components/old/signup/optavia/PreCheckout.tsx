import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, useFormik } from "formik";

import { Wrapper, PARTNERS } from "@src/components/layouts/Wrapper";
import { Button } from "@src/components/ui/Button";

import ContactInformation from "./sections/ContactInformation";
import PatientDetails from "./sections/PatientDetails";
import InsuranceDetails from "./sections/InsuranceDetails";

const TOTAL_STEPS = 2;

const PreCheckout = () => {
  const router = useRouter();

  return (
    <Wrapper
      partner={PARTNERS.optavia}
      header={
        <h2 className="text-lg sm:text-2xl text-white font-bold">
          Achieve Lasting Results with the Power of Alfie and OPTA
          <span className="font-normal">VIA</span>
        </h2>
      }
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dateOfBirth: null,
          biologicalSex: "",
          streetAddress: "",
          city: "",
          state: "",
          zipCode: "",
          apartmentUnit: "",
          phoneNumber: "",
          email: "",
          heightFeet: "",
          heightInches: "",
          weight: "",
          pastTries: [],
          insurancePlan: "",
          insuranceType: "",
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="flex flex-col max-w-5xl bg-white rounded-xl gap-5">
              <div className="border-b px-8 py-4">
                <span className="text-primary-700 bg-primary-100 font-medium font-sm px-4 py-1 rounded-3xl">
                  1 out of {TOTAL_STEPS}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4">
                  <p>
                    This simple form helps us get you enrolled in Alfie Health’s
                    medical weight loss program.{" "}
                  </p>
                  <br />
                  <p>
                    Alfie Health is in network with various insurance plans. You
                    will be responsible for meeting any deductibles and paying
                    any copays or coinsurance, which are typically around $15-25
                    per month.
                  </p>
                  <br />
                  <p className="text-[#61656C] italic">
                    DISCLAIMER: If you are experiencing a medical emergency,
                    please call 9-1-1.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-8 p-4">
                <ContactInformation />
                <PatientDetails />
                <InsuranceDetails />
              </div>

              <div className="pt-5 md:pt-10 pb-3 px-8 flex flex-row justify-end">
                <Button type="submit" size="medium">
                  Next
                </Button>
              </div>

              <div className="flex flex-col">
                <p className="text-center text-sm font-medium text-gray-400 py-6">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-brand-berry hover:text-brand-berry-tint-1 underline"
                  >
                    Click here to login.
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default PreCheckout;
