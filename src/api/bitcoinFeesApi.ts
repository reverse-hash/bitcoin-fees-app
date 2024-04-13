import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { InferType, object, string } from "yup";

import { satsSchema } from "@/schemas";
import { API_HOST, API_PORT } from "@env";

const estimateFeesSchema = object().shape({
  level: string().oneOf(["low", "medium", "high"]).required(),
  lessThan20min: satsSchema,
  lessThan1hour: satsSchema,
  lessThan6hours: satsSchema,
  lessThan24hours: satsSchema,
});

const healthSchema = object().shape({
  status: string().oneOf(["ok", "error"]).required(),
  message: string().optional(),
});

export type EstimatedFees = InferType<typeof estimateFeesSchema>;

export type Health = InferType<typeof healthSchema>;

export const bitcoinFeesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://" + API_HOST + ":" + API_PORT + "/", mode: "cors", timeout: 10000 }),
  endpoints: (builder) => ({
    getEstimatedFees: builder.query<EstimatedFees, void>({
      query: () => "estimated-fees",
    }),
    getHealth: builder.query<Health, void>({
      query: () => "health",
      transformErrorResponse: (baseQueryReturnValue: any, meta: any, arg: any) => {
        console.log({ baseQueryReturnValue, meta, arg });
      },
    }),
  }),
});

export const { useGetEstimatedFeesQuery, useGetHealthQuery } = bitcoinFeesApi;
