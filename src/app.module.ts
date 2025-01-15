import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from '@/app.controller'
import { GlobalExceptionFilter } from '@/filters/global-exception.filter'
import { ResponseInterceptor } from '@/interceptors/response.interceptor'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [SharedModule],
	controllers: [AppController],
	providers: [
		{ provide: APP_FILTER, useClass: GlobalExceptionFilter },
		{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
	]
})
export class AppModule {}
