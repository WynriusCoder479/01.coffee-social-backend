import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map, Observable } from 'rxjs'

import { SuccessCode } from '@/constraints/code.constraint'
import {
	IResponseBody,
	ResponseBodyKey
} from '@/decorators/response-body.decorator'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const responseBody = this.reflector.get<IResponseBody>(
			ResponseBodyKey,
			context.getHandler()
		) ?? {
			statusCode: SuccessCode.OK,
			message: 'Response Successfully'
		}

		return next.handle().pipe(
			map(data => ({
				statusCode: responseBody.statusCode,
				message: responseBody.message,
				data
			}))
		)
	}
}
