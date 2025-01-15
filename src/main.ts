import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app.module'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { ApiDocsService } from '@/shared/services/api-docs.service'
import { LoggerService } from '@/shared/services/logger.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: ['http://localhost:3000'],
			credentials: true
		}
	})

	const apiConfig = app.get(ApiConfigService)
	const logger = app.get(LoggerService)
	const apiDoc = app.get(ApiDocsService)

	app.setGlobalPrefix(apiConfig.apiPrefix)
	app.useGlobalPipes(new ValidationPipe())

	const initialApiDoc = apiDoc.setup(app)

	await app.listen(apiConfig.port)

	logger.info('Server starting at: ', apiConfig.apiUrl)
	logger.info(initialApiDoc.message)
}
bootstrap()
