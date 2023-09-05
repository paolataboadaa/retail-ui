import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ResponseGetUser {
    http_code: number
    status: string
    result: string
    status_code: number
    hash_id?: string
}
export interface PropsGetUser {
    document_number: string
    document_type: string
    nationality: string
}
export interface ResponseGetCountries {
    http_code: number
    status: string
    result: Countries[]
}
export interface Countries {
    id: number
    iso2: string
    name: string
    status: number
    phone_code: string
    iso3: string
    region: string
    subregion: string
}
export interface PropsFindUser {
    numero_documento: string
}
export interface ResponseFindUser {
    http_code: number
    status: string
    result: Client
    origin: string
    status_code: number
}
export interface Client {
    uni_id_hash?: string
    uni_nacionalidad: string
    uni_tipo_documento: string
    uni_numero_documento: string
    uni_nombres: string
    uni_apellido_paterno: string
    uni_apellido_materno: string
    tip_id: number
    tip_nombre: string
    tip_estado_televentas: number
}

const baseUrl = "https://idclientes.apuestatotal.com/api";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OWRlMjM3ZC00NGU4LTRhMmItYjc5YS0wNDZjMDYzMDMwNGEiLCJqdGkiOiI2OWY4YTI1ZTJjZWE5YmRiZDNmZDAwNTlhMzQxNDJkNjkxZGQxMjQwODM3OTZmYzljMzM0Yzg1YTE0OWY2NjVjNjQyZTM4NTBmOGM5ODkxMCIsImlhdCI6MTY5MjgyODEzOC40NjQ4MjUsIm5iZiI6MTY5MjgyODEzOC40NjQ4MjksImV4cCI6MTc4NzUyMjUzOC40NDE5ODUsInN1YiI6IjE5Iiwic2NvcGVzIjpbXX0.bq38WRZfiaEqjDs0VkER8zkIkTHNZbwMxmVtsk9Edip8bBCtzcmjRmUnxSREihaShPCV-t7lR-HBg51x_8t0c5U6nmtxH-ATa9KgtjiKl8x0nk7hhS36XEsHkDeT5CqzgyNQR1EnZAo-prD2lF2j9FsSWpRo6x3G3TwUZO0Aj4ZKUwmdzNfijMSDHHt4YV7VqtaeEkIzARm_AgLSt3CpdJXZYSKesdwpwi7UmjlkiJ90tBJ2od5ebY_lfp_k8QznR52yvDRBGyFMyMhtoCI2rf_dvu9459ZMHQO6xNOLMToYXWdVRH34hGnNqMJK4EWZ-ldJxLCOxcfQ3HiG_EIR3b-4-Kvif3Btw58pjx4eEhvWj9MVElj7FuSZUGefaAISf7nixH2eQ3FOboY48sHPVlROpinp6Udh4OO1RgeID__8oyZJl8GAyM-XzXfZkIyQTpsA0nMVNA3F0wTzm59J7WFdhVEiEkOt_ut39FfB9jD3Q1oQlUZWLuQ2mLNxBfRt6nT4iKA9bxpssYhR5CYbshiUNsLjLBrmBO6AEkXln3Y3BZP961KMY5VGAGSrLpO1oi1oiocsJqkzkNri9p8yzWdWZhTz75jAur4qHVe7DtAIb0BY5bHO9FSWF721HeMpusDxTgGH-nZFawCaW4YlB5BKSk_jwBZqRiRK6HXTomw";
// const baseUrl = "http://localhost:8090/api";
// const dev_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OWYxYTU2Ni1kZDU5LTQxZDMtODkwOC02Y2E5YzY5MzM4ZjgiLCJqdGkiOiJjMzgwZDVmZDEwZmU5ZDRmZjU1MzkxYzAzMDIyNzIxOGU0YWFhNzJiOGRjYWMzOTk0YmI5NzEzZWY2YWQ5ZGNiZDZjMTVjODI5ZTlkNTJkMSIsImlhdCI6MTY5MjYzMzA2MC40NjM1NTcsIm5iZiI6MTY5MjYzMzA2MC40NjM1NjIsImV4cCI6MTc4NzMyNzQ2MC40MzUxNzYsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.iuKt0Tx3YZSoYxZ-H9Do3V-X1JiGDmbt-AcsC6tJ-T3lF8CPYPrp0eCd7-nkWnL_SQFTSVPBOpqG4sTysNiTyffPZGmDa0iKWXmAzcZSfXewWGEiEhMAdMPwbmrLeVzNIpk47udCcwX7CMy40hKpmXi8bD8grRXtDS-qvlZQV13dXKp7a9IQI-0rtLfCP2h9djg9AlNLumT0DAgaYcnqhGCeekimluc_wuK5n-7gI93uUO3-hjhR6jcWl1FhvLXn0WPF3o8mTa1HSpwLvVYS_IjCGT3rhVisEcJTllp8DCsZJFcFJne2SG37WHFb2bLtVxEnWPcoqnodnftHjgUGx4y1UiaxKqB8ZKVMu29t9hXIXush6qxepxJRVGZdLVStM9h8UbICAn-igrZz3RxooHYQ9jjOTTz4XGO86w6YvIdLvHibLcg9YXL_CQRp17x5VErJPWhqG-24Ee_qATsn1Pl7dC164vkQ7Vo4Iq-rQYHw-f-yP6NbBxkVSssC0PzLXcPiGA1mvkjcCic4JmKANWIFvVWOCAjwBI4qbZJm6AgoDoKoIugvVEshn3raLBvrdZmBaydgRqbcRdZgeuIIiH8RJ11wGALsecQcfIwi7pqJvXBtjtj2em8TPCeEaocVL4nbtrOHEWRNR7_eMl9v5my4f9HFAsU7C8p5_VTz6ww";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getUserByDocument: builder.mutation<ResponseGetUser, PropsGetUser>({
            query: ({ document_number, document_type, nationality }) => ({
                url: '/validate_client',
                method: 'POST',
                headers: new Headers({ 'Authorization': `Bearer ${token}` }),
                body: new URLSearchParams({
                    document_number, document_type, nationality
                }),
            })
        }),
        // findClientByDocument: builder.mutation<any, PropsFindUser>({
        //     query: ({ numero_documento }) => ({
        //         url: '/find_client',
        //         method: 'POST',
        //         headers: new Headers({ 'Authorization': `Bearer ${dev_token}` }),
        //         body: new URLSearchParams({
        //             numero_documento
        //         }),
        //     }),
        //     transformResponse(responseData: any) {
		// 		return responseData
		// 	},
        // }),
        getListCountries: builder.query({
            query: () => ({
                url: '/country',
                method: 'GET',
                headers: new Headers({ 'Authorization': `Bearer ${token}` })
            }),
            transformResponse(responseData: ResponseGetCountries) {
                if (responseData?.http_code === 200) {
                    const result = responseData.result.map((item: Countries) => {
                        return { value: item.iso3, name: item.name };
                    });
                    return result
				}
			}, 
        }),
    })
})

export const { useGetUserByDocumentMutation, useGetListCountriesQuery } = userApi;