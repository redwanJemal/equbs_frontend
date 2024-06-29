export const USER_LIST_ALL_URL = '/api/v1/users'
export const USER_GET_BY_ID_URL = '/api/v1/users'
export const USER_CREATE_URL = '/api/v1/users/register'
export const USER_UPDATE_URL = '/api/v1/users/update'
export const USER_DELETE_URL = '/api/v1/users/delete'

export const FACILITY_CREATE_URL = '/api/v1/facilities/'
export const FACILITY_DELETE_URL = '/api/v1/facilities/delete'
export const FACILITY_GET_BY_ID_URL = '/api/v1/facilities'
export const FACILITY_LIST_ALL_URL = '/api/v1/facilities'
export const FACILITY_UPDATE_URL = '/api/v1/facilities'

export const REFERRAL_CREATE_URL = '/api/v1/referrals/'
export const REFERRAL_ACCEPT_URL = '/api/v1/referrals/{id}/accept'
export const REFERRAL_REJECT_URL = '/api/v1/referrals/{id}/reject'
export const REFERRAL_GET_ALL_URL = '/api/v1/referrals'
export const REFERRAL_GET_OUT_URL = '/api/v1/referrals/referring'
export const REFERRAL_GET_IN_URL = '/api/v1/referrals/receiving'

export const SAMPLE_FACILITY_ID = 'b1d29d0c-8a2b-42d5-a9b8-5c2cfa5dfb3e'

export const EQUB_CREATE_URL = '/api/v1/equbs'
export const EQUB_UPDATE_URL = '/api/v1/equbs/{id}'
export const EQUB_GET_ALL_URL = '/api/v1/equbs'
export const EQUB_GET_BY_ID_URL = '/api/v1/equbs/{id}'

const BASE_TRANSACTION_URL = 'api/v1/equb-transactions'

export const TRANSACTION_CREATE_URL = `${BASE_TRANSACTION_URL}`
export const TRANSACTION_UPDATE_URL = `${BASE_TRANSACTION_URL}/update`
export const TRANSACTION_APPROVE_URL = `${BASE_TRANSACTION_URL}/{id}/approve`
export const TRANSACTION_GET_ALL_URL = BASE_TRANSACTION_URL
export const TRANSACTION_GET_BY_ID_URL = `${BASE_TRANSACTION_URL}/{id}`
export const TRANSACTION_DELETE_URL = `${BASE_TRANSACTION_URL}/{id}/delete`
export const TRANSACTION_REACTIVATE_URL = `${BASE_TRANSACTION_URL}/{id}/reactivate`
