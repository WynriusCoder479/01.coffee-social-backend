import { SetMetadata } from '@nestjs/common'

import { SuccessCode } from '@/constraints/code.constraint'

export interface IResponseBody {
	statusCode: SuccessCode
	message: string
}

export const ResponseBodyKey = 'ResponseBody'

export const Response = (responseBody: IResponseBody) =>
	SetMetadata(ResponseBodyKey, responseBody)
