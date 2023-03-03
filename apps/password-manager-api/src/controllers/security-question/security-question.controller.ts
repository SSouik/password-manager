import { Controller } from '@nestjs/common';

/**
 * This controller should contain three methods. One method to
 * create a security question, one to get the quesiton and answer
 * and the last to update it.
 *
 * It is up to you to determine the following:
 * 1. The dependencies that need to be injected into the controller
 * 2. The HTTP methods that should be used for each endpoint (EX: GET, POST, PATCH, etc)
 * 3. The HTTP status code that each endpoint should return (EX: 200, 201, 202, etc)
 * 4. Additions to endpoint routes that may or may not be needed
 * 5. Which endpoints should be protected and which ones should be public
 * 6. The data needed in each request
 * 7. The response data of each endpoint
 * 8. The implementation of each endpoint
 */
@Controller('clients/:clientId/security-question')
export class SecurityQuestionController {}
