import { inject, Injectable } from '@angular/core';
import { LumberjackService } from '@ngworker/lumberjack';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
      private logger = inject(LumberjackService)

      debug(message: string, data?: unknown, scope?: string) {
          this.logger.logDebug(message, data, scope);
      }
      info(message: string, data?: unknown, scope?: string) {
          this.logger.logInfo(message, data, scope);
      }
      warn(message: string, data?: unknown, scope?: string) {
          this.logger.logWarning(message, data, scope);
      }
      error(message: string, data?: unknown, scope?: string) {
          this.logger.logError(message, data, scope);
      }
      critical(message: string, data?: unknown, scope?: string) {
          this.logger.logCritical(message, data, scope);
      }
      trace(message: string, data?: unknown, scope?: string) {
          this.logger.logTrace(message, data, scope);
      }
}


//NOTE: This LoggerService is a wrapper around LumberjackService to provide a simplified logging interface.
//NOTE: It can be extended in the future to include additional logging functionalities or to switch logging libraries without affecting the rest of the application.
//NOTE: provideLumberjackHttpDriver can also be added for logging to a remote server.