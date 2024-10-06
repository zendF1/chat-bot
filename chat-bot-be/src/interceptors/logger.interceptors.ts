// Import necessary modules and classes from NestJS
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // Create a Logger instance specific to this interceptor
  private readonly logger = new Logger(LoggingInterceptor.name);

  // Define the intercept method required by the NestInterceptor interface
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); // Capture the current timestamp
    const request = context.switchToHttp().getRequest(); // Get the incoming request object
    const method = request.method; // Extract the HTTP method (GET, POST, etc.)
    const url = request.url; // Extract the URL of the request
    this.logger.log(`Start Method: ${method} | URL: ${url}`); // should implement ID for each request
    // Pass the request to the next handler (controller or another interceptor)
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse(); // Get the outgoing response object
        const statusCode = response.statusCode; // Extract the HTTP status code
        const duration = Date.now() - now; // Calculate the duration of the request processing

        // Log the request and response details
        this.logger.log(
          `End Method: ${method} | URL: ${url} | Status: ${statusCode} | Duration: ${duration}ms`,
        );
      }),
    );
  }
}
