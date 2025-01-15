import { Controller, Get } from '@nestjs/common'

import { SuccessCode } from '@/constraints/code.constraint'
import { Response } from '@/decorators/response-body.decorator'

@Controller()
export class AppController {
	@Get('/heath-check')
	@Response({
		statusCode: SuccessCode.OK,
		message: 'Heathcheck'
	})
	getHello() {
		return {
			hello: 'World'
		}
	}
}
