import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { InferType, object, string } from "yup";

import { satsSchema } from "@/schemas";
import { API_HOST } from "@env";

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

export const estimateFeesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://" + API_HOST, timeout: 10000 }),
  endpoints: (builder) => ({
    getEstimatedFees: builder.query<EstimatedFees, void>({
      query: () => "/estimated-fees",
    }),
    getHealth: builder.query<Health, void>({
      query: () => "/health",
    }),
  }),
});

export const { useGetEstimatedFeesQuery, useGetHealthQuery } = estimateFeesApi;
