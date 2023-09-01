import React, { useCallback, useEffect, useState } from "react";

import debounce from "lodash/debounce";
import { gql, useLazyQuery } from "@apollo/client";

import { States } from "@src/utils/states";
import { TextInput } from "../inputs/TextInput";
import { SelectInput } from "../inputs/SelectInput";
import {
  Address,
  AddressInput,
  AddressQuery,
  AddressSuggestion,
} from "@src/graphql/generated";
import { AutoComplete, ISuggestion } from "../inputs/AutoComplete";
import { useField } from "formik";

interface AddressFormProps {
  formName: string;
  values?: AddressInput;
}

const GET_ADDRESS_SUGGESTIONS = gql`
  query GetAddressSuggestions($query: AddressQuery!) {
    addressSuggestions(query: $query) {
      placeId
      address
    }
  }
`;

const GET_ADDRESS_DETAIL = gql`
  query GetAddressDetails($place_id: String!) {
    addressDetail(placeId: $place_id) {
      line1
      line2
      country
      state
      postalCode
      city
    }
  }
`;

const formatAddress = (address: AddressInput): AddressQuery => {
  const parts: string[] = [];

  if (address.line1) {
    parts.push(address.line1);
  }

  if (address.line2) {
    parts.push(address.line2);
  }

  if (address.city) {
    parts.push(address.city);
  }

  if (address.state) {
    parts.push(address.state);
  }

  if (address.postalCode) {
    parts.push(address.postalCode);
  }

  return {
    input: parts.join(", "),
  };
};

export const AddressForm: React.FunctionComponent<AddressFormProps> = ({
  values,
  formName,
}) => {
  const [, , helpers] = useField(formName);
  const { setValue } = helpers;
  const prefix = formName ? `${formName}.` : "";
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);

  const [getAddressSuggestions, { data, loading }] = useLazyQuery<{
    addressSuggestions: AddressSuggestion[];
  }>(GET_ADDRESS_SUGGESTIONS);
  const [getAddressDetail, { data: details }] = useLazyQuery<{
    addressDetail: Address;
  }>(GET_ADDRESS_DETAIL);

  // Debounce the API call
  const debouncedGetAddressSuggestions = useCallback(
    debounce((query) => {
      getAddressSuggestions({ variables: { query } });
    }, 300),
    []
  );

  useEffect(() => {
    if (values) {
      const query = formatAddress(values);
      if (query) {
        debouncedGetAddressSuggestions(query);
      }
    }
  }, [values]);

  useEffect(() => {
    if (data && data.addressSuggestions) {
      setSuggestions(data.addressSuggestions);
    }
  }, [data]);

  const handleSelectSuggestion = (s: ISuggestion) => {
    getAddressDetail({
      variables: {
        place_id: s.key,
      },
    });
  };

  useEffect(() => {
    console.log(details);
    if (details) {
      setValue(details.addressDetail);
    }
  }, [setValue, details]);

  return (
    <div className="flex flex-col">
      <div className="relative pb-2">
        <AutoComplete
          name={`${prefix}line1`}
          placeholder="Address 1"
          suggestions={suggestions.map((as) => ({
            key: as.placeId,
            value: as.address,
          }))}
          onSelectSuggestion={handleSelectSuggestion}
          loading={loading}
        />
      </div>
      <div className="pb-2">
        <TextInput name={`${prefix}line2`} placeholder="Address 2" />
      </div>
      <div className="pb-3">
        <TextInput name={`${prefix}city`} placeholder="City" />
      </div>
      <div className="pb-2">
        <SelectInput
          name={`${prefix}state`}
          placeholder="State..."
          options={States}
        />
      </div>
      <div className="pb-2">
        <TextInput name={`${prefix}postalCode`} placeholder="Postal Code" />
      </div>
    </div>
  );
};

AddressForm.displayName = "AddressForm";
