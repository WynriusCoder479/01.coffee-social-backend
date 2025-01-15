import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

import { ApiConfigService } from '@/shared/services/api-config.service'
import { ResponseType } from '@/types/common.type'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(private readonly apiConfig: ApiConfigService) {}

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()

		const response = ctx.getResponse<Response<ResponseType>>()

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		const message =
			exception instanceof HttpException
				? exception.message
				: 'Internal server error'

		response.status(status).json({
			statusCode: exception.response.statusCode,
			message,
			error: this.apiConfig.isDevelopment
				? {
						stack: exception.stack
					}
				: null
		})
	}
}
