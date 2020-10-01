/**
 * Authentication API
 * 
 * Select the right authentication API according to authentication backend
 * provided in __richie_frontend_context
 *
 */
import { handle } from 'utils/errors/handle';
import { AuthenticationBackend } from 'types/commonDataProps';
import { ApiImplementation } from './lms';
import Base from './lms/base';
import EDX from './lms/edx';

const AuthenticationAPIHandler = (): ApiImplementation => {
  const AUTHENTICATION: AuthenticationBackend = (window as any).__richie_frontend_context__?.context
    ?.authentication;
  if (!AUTHENTICATION) {
    const error = new Error('"authentication" is missing in frontend context.');
    handle(error);
    throw error;
  }

  switch (AUTHENTICATION.backend) {
    case 'richie.apps.courses.lms.base.BaseLMSBackend':
      return Base(AUTHENTICATION);
    case 'richie.apps.courses.lms.edx.TokenEdXLMSBackend':
      return EDX(AUTHENTICATION);
    default:
      throw new Error(`No Authentication Backend found for ${AUTHENTICATION.backend}.`);
  }
};

export const AuthenticationApi = AuthenticationAPIHandler().user;
