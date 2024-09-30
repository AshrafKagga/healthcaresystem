import * as sdk from 'node-appwrite'

export const{
PROJECT_ID, API_KEY,DATABASE_ID,PATIENT_COLLECTION_ID,DOCTOR_COLLECTION_ID,APPOINTMENT_COLLECTION_ID,
NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
NETX_PUBLIC_ENDPOINT: ENDPOINT
} = process.env;

const Client = new sdk.Client();

Client
    .setEndpoint(ENDPOINT!)
    .setKey(API_KEY!)
    .setProject(PROJECT_ID!)

export const Databases = new sdk.Databases(Client)
export const Storage = new sdk.Storage(Client)
export const Messaging = new sdk.Messaging(Client)
export const Users = new sdk.Users(Client)