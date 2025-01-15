import { INestApplication, Injectable } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { ApiConfigService } from '@/shared/services/api-config.service'

@Injectable()
export class ApiDocsService {
	constructor(private readonly apiConfig: ApiConfigService) {}

	setup(app: INestApplication) {
		if (!this.apiConfig.isProduction) {
			const config = new DocumentBuilder()
				.setTitle('Coffee Social backend')
				.setDescription('## Coffee social api doc for dev and testing')
				.setVersion('0.1')
				.addBearerAuth()
				.addServer(this.apiConfig.baseUrl, 'Local Server')
				.build()

			const document = SwaggerModule.createDocument(app, config)

			SwaggerModule.setup(this.apiConfig.apiDocsPrefix, app, document)

			return {
				message: `Api doc starting on: ${this.apiConfig.apiDocsUrl}`
			}
		}

		return {
			message: 'Api doc not serve for production environment'
		}
	}
}
