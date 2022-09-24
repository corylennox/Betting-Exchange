import { useQuery } from "@apollo/client";
import { UNIVERSAL_DATA_QUERY } from "./GraphQL/Queries";
import { translateUniversalData } from "./GraphQL/Translate";

export const {
  loading,
  data: universalDataResponse,
  error,
} = useQuery(UNIVERSAL_DATA_QUERY);

export const universalData = translateUniversalData(universalDataResponse);
