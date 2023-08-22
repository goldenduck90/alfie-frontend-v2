import React, { FC } from "react";

type Props = {
  firstName: string;
  weightLossValue: string;
};

const InsuranceCovered: FC<Props> = ({ firstName, weightLossValue }) => {
  return (
    <>
      <p className="p-4 font-md font-bold text-lg text-brand-berry">
        {`${firstName}, sign up today to gain access to Alfie’s precision weight
        management program and lose ${weightLossValue} pounds within the next 6
        months.`}
        <br />
        <br />
        {"These results will having you feeling healthier than ever!"}
      </p>

      <div className="p-4 italic text-secondary-500">
        <p>
          {
            "Provider visits will be billed to insurance. Patient responsible for any co-pays or deductible and cost of labs or medications not covered by insurance."
          }
        </p>
        <br />
        <p>{"There are no monthly fees."}</p>
        <br />
        <p>
          {
            "We require that you are under the care of a primary care provider (PCP) so we have an updated medical history. If you haven't seen your PCP in the last year, you will need to complete a visit before your first Alfie Health doctor appointment."
          }
        </p>
      </div>
    </>
  );
};

export default InsuranceCovered;
