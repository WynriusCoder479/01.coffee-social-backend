import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ApiConfigService } from '@/shared/services/api-config.service'
import { ApiDocsService } from '@/shared/services/api-docs.service'
import { LoggerService } from '@/shared/services/logger.service'
import { PrismaService } from '@/shared/services/prisma.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			envFilePath:
				process.env.NODE_ENV === 'production'
					? '.env'
					: ['.env.development', '.env.test']
		})
	],
	providers: [ApiConfigService, PrismaService, LoggerService, ApiDocsService],
	exports: [ApiConfigService, PrismaService, LoggerService]
})
export class SharedModule {}
