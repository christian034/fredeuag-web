import { c as __rest } from "./tslib.es6-COL127aV.js";
import { t as _asyncToGenerator } from "./asyncToGenerator-B0cJ8fiL.js";
import { $ as querystring, B as getUA, C as Logger, D as FirebaseError, E as ErrorFactory, F as getDefaultEmulatorHost, G as isIE, H as isCloudWorkstation, J as isReactNative, L as getExperimentalSetting, M as createSubscribe, N as deepEqual, P as extractQuerystring, Q as pingServer, S as LogLevel, U as isCloudflareWorker, V as isBrowserExtension, W as isEmpty, b as registerVersion, c as _getProvider, d as _registerComponent, et as querystringDecode, h as getApp, k as base64Decode, n as SDK_VERSION, q as isMobileCordova, tt as updateEmulatorBanner, u as _isFirebaseServerApp, w as Component, z as getModularInstance } from "./index.esm2017-DghwDOiZ.js";
//#region node_modules/@firebase/auth/dist/esm2017/index-35c79a8a.js
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* An enum of factors that may be used for multifactor authentication.
*
* @public
*/
var FactorId = {
	/** Phone as second factor */
	PHONE: "phone",
	TOTP: "totp"
};
/**
* Enumeration of supported providers.
*
* @public
*/
var ProviderId = {
	/** Facebook provider ID */
	FACEBOOK: "facebook.com",
	/** GitHub provider ID */
	GITHUB: "github.com",
	/** Google provider ID */
	GOOGLE: "google.com",
	/** Password provider */
	PASSWORD: "password",
	/** Phone provider */
	PHONE: "phone",
	/** Twitter provider ID */
	TWITTER: "twitter.com"
};
/**
* Enumeration of supported sign-in methods.
*
* @public
*/
var SignInMethod = {
	/** Email link sign in method */
	EMAIL_LINK: "emailLink",
	/** Email/password sign in method */
	EMAIL_PASSWORD: "password",
	/** Facebook sign in method */
	FACEBOOK: "facebook.com",
	/** GitHub sign in method */
	GITHUB: "github.com",
	/** Google sign in method */
	GOOGLE: "google.com",
	/** Phone sign in method */
	PHONE: "phone",
	/** Twitter sign in method */
	TWITTER: "twitter.com"
};
/**
* Enumeration of supported operation types.
*
* @public
*/
var OperationType = {
	/** Operation involving linking an additional provider to an already signed-in user. */
	LINK: "link",
	/** Operation involving using a provider to reauthenticate an already signed-in user. */
	REAUTHENTICATE: "reauthenticate",
	/** Operation involving signing in a user. */
	SIGN_IN: "signIn"
};
/**
* An enumeration of the possible email action types.
*
* @public
*/
var ActionCodeOperation = {
	/** The email link sign-in action. */
	EMAIL_SIGNIN: "EMAIL_SIGNIN",
	/** The password reset action. */
	PASSWORD_RESET: "PASSWORD_RESET",
	/** The email revocation action. */
	RECOVER_EMAIL: "RECOVER_EMAIL",
	/** The revert second factor addition email action. */
	REVERT_SECOND_FACTOR_ADDITION: "REVERT_SECOND_FACTOR_ADDITION",
	/** The revert second factor addition email action. */
	VERIFY_AND_CHANGE_EMAIL: "VERIFY_AND_CHANGE_EMAIL",
	/** The email verification action. */
	VERIFY_EMAIL: "VERIFY_EMAIL"
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _debugErrorMap() {
	return {
		["admin-restricted-operation"]: "This operation is restricted to administrators only.",
		["argument-error"]: "",
		["app-not-authorized"]: "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
		["app-not-installed"]: "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
		["captcha-check-failed"]: "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
		["code-expired"]: "The SMS code has expired. Please re-send the verification code to try again.",
		["cordova-not-ready"]: "Cordova framework is not ready.",
		["cors-unsupported"]: "This browser is not supported.",
		["credential-already-in-use"]: "This credential is already associated with a different user account.",
		["custom-token-mismatch"]: "The custom token corresponds to a different audience.",
		["requires-recent-login"]: "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
		["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
		["dynamic-link-not-activated"]: "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
		["email-change-needs-verification"]: "Multi-factor users must always have a verified email.",
		["email-already-in-use"]: "The email address is already in use by another account.",
		["emulator-config-failed"]: "Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling \"connectAuthEmulator()\" sooner.",
		["expired-action-code"]: "The action code has expired.",
		["cancelled-popup-request"]: "This operation has been cancelled due to another conflicting popup being opened.",
		["internal-error"]: "An internal AuthError has occurred.",
		["invalid-app-credential"]: "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
		["invalid-app-id"]: "The mobile app identifier is not registered for the current project.",
		["invalid-user-token"]: "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
		["invalid-auth-event"]: "An internal AuthError has occurred.",
		["invalid-verification-code"]: "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
		["invalid-continue-uri"]: "The continue URL provided in the request is invalid.",
		["invalid-cordova-configuration"]: "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
		["invalid-custom-token"]: "The custom token format is incorrect. Please check the documentation.",
		["invalid-dynamic-link-domain"]: "The provided dynamic link domain is not configured or authorized for the current project.",
		["invalid-email"]: "The email address is badly formatted.",
		["invalid-emulator-scheme"]: "Emulator URL must start with a valid scheme (http:// or https://).",
		["invalid-api-key"]: "Your API key is invalid, please check you have copied it correctly.",
		["invalid-cert-hash"]: "The SHA-1 certificate hash provided is invalid.",
		["invalid-credential"]: "The supplied auth credential is incorrect, malformed or has expired.",
		["invalid-message-payload"]: "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
		["invalid-multi-factor-session"]: "The request does not contain a valid proof of first factor successful sign-in.",
		["invalid-oauth-provider"]: "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
		["invalid-oauth-client-id"]: "The OAuth client ID provided is either invalid or does not match the specified API key.",
		["unauthorized-domain"]: "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
		["invalid-action-code"]: "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
		["wrong-password"]: "The password is invalid or the user does not have a password.",
		["invalid-persistence-type"]: "The specified persistence type is invalid. It can only be local, session or none.",
		["invalid-phone-number"]: "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
		["invalid-provider-id"]: "The specified provider ID is invalid.",
		["invalid-recipient-email"]: "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
		["invalid-sender"]: "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
		["invalid-verification-id"]: "The verification ID used to create the phone auth credential is invalid.",
		["invalid-tenant-id"]: "The Auth instance's tenant ID is invalid.",
		["login-blocked"]: "Login blocked by user-provided method: {$originalMessage}",
		["missing-android-pkg-name"]: "An Android Package Name must be provided if the Android App is required to be installed.",
		["auth-domain-config-required"]: "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
		["missing-app-credential"]: "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
		["missing-verification-code"]: "The phone auth credential was created with an empty SMS verification code.",
		["missing-continue-uri"]: "A continue URL must be provided in the request.",
		["missing-iframe-start"]: "An internal AuthError has occurred.",
		["missing-ios-bundle-id"]: "An iOS Bundle ID must be provided if an App Store ID is provided.",
		["missing-or-invalid-nonce"]: "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
		["missing-password"]: "A non-empty password must be provided",
		["missing-multi-factor-info"]: "No second factor identifier is provided.",
		["missing-multi-factor-session"]: "The request is missing proof of first factor successful sign-in.",
		["missing-phone-number"]: "To send verification codes, provide a phone number for the recipient.",
		["missing-verification-id"]: "The phone auth credential was created with an empty verification ID.",
		["app-deleted"]: "This instance of FirebaseApp has been deleted.",
		["multi-factor-info-not-found"]: "The user does not have a second factor matching the identifier provided.",
		["multi-factor-auth-required"]: "Proof of ownership of a second factor is required to complete sign-in.",
		["account-exists-with-different-credential"]: "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
		["network-request-failed"]: "A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
		["no-auth-event"]: "An internal AuthError has occurred.",
		["no-such-provider"]: "User was not linked to an account with the given provider.",
		["null-user"]: "A null user object was provided as the argument for an operation which requires a non-null user object.",
		["operation-not-allowed"]: "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
		["operation-not-supported-in-this-environment"]: "This operation is not supported in the environment this application is running on. \"location.protocol\" must be http, https or chrome-extension and web storage must be enabled.",
		["popup-blocked"]: "Unable to establish a connection with the popup. It may have been blocked by the browser.",
		["popup-closed-by-user"]: "The popup has been closed by the user before finalizing the operation.",
		["provider-already-linked"]: "User can only be linked to one identity for the given provider.",
		["quota-exceeded"]: "The project's quota for this operation has been exceeded.",
		["redirect-cancelled-by-user"]: "The redirect operation has been cancelled by the user before finalizing.",
		["redirect-operation-pending"]: "A redirect sign-in operation is already pending.",
		["rejected-credential"]: "The request contains malformed or mismatching credentials.",
		["second-factor-already-in-use"]: "The second factor is already enrolled on this account.",
		["maximum-second-factor-count-exceeded"]: "The maximum allowed number of second factors on a user has been exceeded.",
		["tenant-id-mismatch"]: "The provided tenant ID does not match the Auth instance's tenant ID",
		["timeout"]: "The operation has timed out.",
		["user-token-expired"]: "The user's credential is no longer valid. The user must sign in again.",
		["too-many-requests"]: "We have blocked all requests from this device due to unusual activity. Try again later.",
		["unauthorized-continue-uri"]: "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
		["unsupported-first-factor"]: "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
		["unsupported-persistence-type"]: "The current environment does not support the specified persistence type.",
		["unsupported-tenant-operation"]: "This operation is not supported in a multi-tenant context.",
		["unverified-email"]: "The operation requires a verified email.",
		["user-cancelled"]: "The user did not grant your application the permissions it requested.",
		["user-not-found"]: "There is no user record corresponding to this identifier. The user may have been deleted.",
		["user-disabled"]: "The user account has been disabled by an administrator.",
		["user-mismatch"]: "The supplied credentials do not correspond to the previously signed in user.",
		["user-signed-out"]: "",
		["weak-password"]: "The password must be 6 characters long or more.",
		["web-storage-unsupported"]: "This browser is not supported or 3rd party cookies and data may be disabled.",
		["already-initialized"]: "initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.",
		["missing-recaptcha-token"]: "The reCAPTCHA token is missing when sending request to the backend.",
		["invalid-recaptcha-token"]: "The reCAPTCHA token is invalid when sending request to the backend.",
		["invalid-recaptcha-action"]: "The reCAPTCHA action is invalid when sending request to the backend.",
		["recaptcha-not-enabled"]: "reCAPTCHA Enterprise integration is not enabled for this project.",
		["missing-client-type"]: "The reCAPTCHA client type is missing when sending request to the backend.",
		["missing-recaptcha-version"]: "The reCAPTCHA version is missing when sending request to the backend.",
		["invalid-req-type"]: "Invalid request parameters.",
		["invalid-recaptcha-version"]: "The reCAPTCHA version is invalid when sending request to the backend.",
		["unsupported-password-policy-schema-version"]: "The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.",
		["password-does-not-meet-requirements"]: "The password does not meet the requirements.",
		["invalid-hosting-link-domain"]: "The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."
	};
}
function _prodErrorMap() {
	return { ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK." };
}
/**
* A verbose error map with detailed descriptions for most error codes.
*
* See discussion at {@link AuthErrorMap}
*
* @public
*/
var debugErrorMap = _debugErrorMap;
/**
* A minimal error map with all verbose error messages stripped.
*
* See discussion at {@link AuthErrorMap}
*
* @public
*/
var prodErrorMap = _prodErrorMap;
var _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory("auth", "Firebase", _prodErrorMap());
/**
* A map of potential `Auth` error codes, for easier comparison with errors
* thrown by the SDK.
*
* @remarks
* Note that you can't tree-shake individual keys
* in the map, so by using the map you might substantially increase your
* bundle size.
*
* @public
*/
var AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = {
	ADMIN_ONLY_OPERATION: "auth/admin-restricted-operation",
	ARGUMENT_ERROR: "auth/argument-error",
	APP_NOT_AUTHORIZED: "auth/app-not-authorized",
	APP_NOT_INSTALLED: "auth/app-not-installed",
	CAPTCHA_CHECK_FAILED: "auth/captcha-check-failed",
	CODE_EXPIRED: "auth/code-expired",
	CORDOVA_NOT_READY: "auth/cordova-not-ready",
	CORS_UNSUPPORTED: "auth/cors-unsupported",
	CREDENTIAL_ALREADY_IN_USE: "auth/credential-already-in-use",
	CREDENTIAL_MISMATCH: "auth/custom-token-mismatch",
	CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "auth/requires-recent-login",
	DEPENDENT_SDK_INIT_BEFORE_AUTH: "auth/dependent-sdk-initialized-before-auth",
	DYNAMIC_LINK_NOT_ACTIVATED: "auth/dynamic-link-not-activated",
	EMAIL_CHANGE_NEEDS_VERIFICATION: "auth/email-change-needs-verification",
	EMAIL_EXISTS: "auth/email-already-in-use",
	EMULATOR_CONFIG_FAILED: "auth/emulator-config-failed",
	EXPIRED_OOB_CODE: "auth/expired-action-code",
	EXPIRED_POPUP_REQUEST: "auth/cancelled-popup-request",
	INTERNAL_ERROR: "auth/internal-error",
	INVALID_API_KEY: "auth/invalid-api-key",
	INVALID_APP_CREDENTIAL: "auth/invalid-app-credential",
	INVALID_APP_ID: "auth/invalid-app-id",
	INVALID_AUTH: "auth/invalid-user-token",
	INVALID_AUTH_EVENT: "auth/invalid-auth-event",
	INVALID_CERT_HASH: "auth/invalid-cert-hash",
	INVALID_CODE: "auth/invalid-verification-code",
	INVALID_CONTINUE_URI: "auth/invalid-continue-uri",
	INVALID_CORDOVA_CONFIGURATION: "auth/invalid-cordova-configuration",
	INVALID_CUSTOM_TOKEN: "auth/invalid-custom-token",
	INVALID_DYNAMIC_LINK_DOMAIN: "auth/invalid-dynamic-link-domain",
	INVALID_EMAIL: "auth/invalid-email",
	INVALID_EMULATOR_SCHEME: "auth/invalid-emulator-scheme",
	INVALID_IDP_RESPONSE: "auth/invalid-credential",
	INVALID_LOGIN_CREDENTIALS: "auth/invalid-credential",
	INVALID_MESSAGE_PAYLOAD: "auth/invalid-message-payload",
	INVALID_MFA_SESSION: "auth/invalid-multi-factor-session",
	INVALID_OAUTH_CLIENT_ID: "auth/invalid-oauth-client-id",
	INVALID_OAUTH_PROVIDER: "auth/invalid-oauth-provider",
	INVALID_OOB_CODE: "auth/invalid-action-code",
	INVALID_ORIGIN: "auth/unauthorized-domain",
	INVALID_PASSWORD: "auth/wrong-password",
	INVALID_PERSISTENCE: "auth/invalid-persistence-type",
	INVALID_PHONE_NUMBER: "auth/invalid-phone-number",
	INVALID_PROVIDER_ID: "auth/invalid-provider-id",
	INVALID_RECIPIENT_EMAIL: "auth/invalid-recipient-email",
	INVALID_SENDER: "auth/invalid-sender",
	INVALID_SESSION_INFO: "auth/invalid-verification-id",
	INVALID_TENANT_ID: "auth/invalid-tenant-id",
	MFA_INFO_NOT_FOUND: "auth/multi-factor-info-not-found",
	MFA_REQUIRED: "auth/multi-factor-auth-required",
	MISSING_ANDROID_PACKAGE_NAME: "auth/missing-android-pkg-name",
	MISSING_APP_CREDENTIAL: "auth/missing-app-credential",
	MISSING_AUTH_DOMAIN: "auth/auth-domain-config-required",
	MISSING_CODE: "auth/missing-verification-code",
	MISSING_CONTINUE_URI: "auth/missing-continue-uri",
	MISSING_IFRAME_START: "auth/missing-iframe-start",
	MISSING_IOS_BUNDLE_ID: "auth/missing-ios-bundle-id",
	MISSING_OR_INVALID_NONCE: "auth/missing-or-invalid-nonce",
	MISSING_MFA_INFO: "auth/missing-multi-factor-info",
	MISSING_MFA_SESSION: "auth/missing-multi-factor-session",
	MISSING_PHONE_NUMBER: "auth/missing-phone-number",
	MISSING_SESSION_INFO: "auth/missing-verification-id",
	MODULE_DESTROYED: "auth/app-deleted",
	NEED_CONFIRMATION: "auth/account-exists-with-different-credential",
	NETWORK_REQUEST_FAILED: "auth/network-request-failed",
	NULL_USER: "auth/null-user",
	NO_AUTH_EVENT: "auth/no-auth-event",
	NO_SUCH_PROVIDER: "auth/no-such-provider",
	OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
	OPERATION_NOT_SUPPORTED: "auth/operation-not-supported-in-this-environment",
	POPUP_BLOCKED: "auth/popup-blocked",
	POPUP_CLOSED_BY_USER: "auth/popup-closed-by-user",
	PROVIDER_ALREADY_LINKED: "auth/provider-already-linked",
	QUOTA_EXCEEDED: "auth/quota-exceeded",
	REDIRECT_CANCELLED_BY_USER: "auth/redirect-cancelled-by-user",
	REDIRECT_OPERATION_PENDING: "auth/redirect-operation-pending",
	REJECTED_CREDENTIAL: "auth/rejected-credential",
	SECOND_FACTOR_ALREADY_ENROLLED: "auth/second-factor-already-in-use",
	SECOND_FACTOR_LIMIT_EXCEEDED: "auth/maximum-second-factor-count-exceeded",
	TENANT_ID_MISMATCH: "auth/tenant-id-mismatch",
	TIMEOUT: "auth/timeout",
	TOKEN_EXPIRED: "auth/user-token-expired",
	TOO_MANY_ATTEMPTS_TRY_LATER: "auth/too-many-requests",
	UNAUTHORIZED_DOMAIN: "auth/unauthorized-continue-uri",
	UNSUPPORTED_FIRST_FACTOR: "auth/unsupported-first-factor",
	UNSUPPORTED_PERSISTENCE: "auth/unsupported-persistence-type",
	UNSUPPORTED_TENANT_OPERATION: "auth/unsupported-tenant-operation",
	UNVERIFIED_EMAIL: "auth/unverified-email",
	USER_CANCELLED: "auth/user-cancelled",
	USER_DELETED: "auth/user-not-found",
	USER_DISABLED: "auth/user-disabled",
	USER_MISMATCH: "auth/user-mismatch",
	USER_SIGNED_OUT: "auth/user-signed-out",
	WEAK_PASSWORD: "auth/weak-password",
	WEB_STORAGE_UNSUPPORTED: "auth/web-storage-unsupported",
	ALREADY_INITIALIZED: "auth/already-initialized",
	RECAPTCHA_NOT_ENABLED: "auth/recaptcha-not-enabled",
	MISSING_RECAPTCHA_TOKEN: "auth/missing-recaptcha-token",
	INVALID_RECAPTCHA_TOKEN: "auth/invalid-recaptcha-token",
	INVALID_RECAPTCHA_ACTION: "auth/invalid-recaptcha-action",
	MISSING_CLIENT_TYPE: "auth/missing-client-type",
	MISSING_RECAPTCHA_VERSION: "auth/missing-recaptcha-version",
	INVALID_RECAPTCHA_VERSION: "auth/invalid-recaptcha-version",
	INVALID_REQ_TYPE: "auth/invalid-req-type",
	INVALID_HOSTING_LINK_DOMAIN: "auth/invalid-hosting-link-domain"
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logClient = new Logger("@firebase/auth");
function _logWarn(msg, ...args) {
	if (logClient.logLevel <= LogLevel.WARN) logClient.warn(`Auth (${SDK_VERSION}): ${msg}`, ...args);
}
function _logError(msg, ...args) {
	if (logClient.logLevel <= LogLevel.ERROR) logClient.error(`Auth (${SDK_VERSION}): ${msg}`, ...args);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _fail(authOrCode, ...rest) {
	throw createErrorInternal(authOrCode, ...rest);
}
function _createError(authOrCode, ...rest) {
	return createErrorInternal(authOrCode, ...rest);
}
function _errorWithCustomMessage(auth, code, message) {
	return new ErrorFactory("auth", "Firebase", Object.assign(Object.assign({}, prodErrorMap()), { [code]: message })).create(code, { appName: auth.name });
}
function _serverAppCurrentUserOperationNotSupportedError(auth) {
	return _errorWithCustomMessage(auth, "operation-not-supported-in-this-environment", "Operations that alter the current user are not supported in conjunction with FirebaseServerApp");
}
function _assertInstanceOf(auth, object, instance) {
	const constructorInstance = instance;
	if (!(object instanceof constructorInstance)) {
		if (constructorInstance.name !== object.constructor.name) _fail(auth, "argument-error");
		throw _errorWithCustomMessage(auth, "argument-error", `Type of ${object.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`);
	}
}
function createErrorInternal(authOrCode, ...rest) {
	if (typeof authOrCode !== "string") {
		const code = rest[0];
		const fullParams = [...rest.slice(1)];
		if (fullParams[0]) fullParams[0].appName = authOrCode.name;
		return authOrCode._errorFactory.create(code, ...fullParams);
	}
	return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
}
function _assert(assertion, authOrCode, ...rest) {
	if (!assertion) throw createErrorInternal(authOrCode, ...rest);
}
/**
* Unconditionally fails, throwing an internal error with the given message.
*
* @param failure type of failure encountered
* @throws Error
*/
function debugFail(failure) {
	const message = `INTERNAL ASSERTION FAILED: ` + failure;
	_logError(message);
	throw new Error(message);
}
/**
* Fails if the given assertion condition is false, throwing an Error with the
* given message if it did.
*
* @param assertion
* @param message
*/
function debugAssert(assertion, message) {
	if (!assertion) debugFail(message);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getCurrentUrl() {
	var _a;
	return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || "";
}
function _isHttpOrHttps() {
	return _getCurrentScheme() === "http:" || _getCurrentScheme() === "https:";
}
function _getCurrentScheme() {
	var _a;
	return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Determine whether the browser is working online
*/
function _isOnline() {
	if (typeof navigator !== "undefined" && navigator && "onLine" in navigator && typeof navigator.onLine === "boolean" && (_isHttpOrHttps() || isBrowserExtension() || "connection" in navigator)) return navigator.onLine;
	return true;
}
function _getUserLanguage() {
	if (typeof navigator === "undefined") return null;
	const navigatorLanguage = navigator;
	return navigatorLanguage.languages && navigatorLanguage.languages[0] || navigatorLanguage.language || null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* A structure to help pick between a range of long and short delay durations
* depending on the current environment. In general, the long delay is used for
* mobile environments whereas short delays are used for desktop environments.
*/
var Delay = class {
	constructor(shortDelay, longDelay) {
		this.shortDelay = shortDelay;
		this.longDelay = longDelay;
		debugAssert(longDelay > shortDelay, "Short delay should be less than long delay!");
		this.isMobile = isMobileCordova() || isReactNative();
	}
	get() {
		if (!_isOnline()) return Math.min(5e3, this.shortDelay);
		return this.isMobile ? this.longDelay : this.shortDelay;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _emulatorUrl(config, path) {
	debugAssert(config.emulator, "Emulator should always be set here");
	const { url } = config.emulator;
	if (!path) return url;
	return `${url}${path.startsWith("/") ? path.slice(1) : path}`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FetchProvider = class {
	static initialize(fetchImpl, headersImpl, responseImpl) {
		this.fetchImpl = fetchImpl;
		if (headersImpl) this.headersImpl = headersImpl;
		if (responseImpl) this.responseImpl = responseImpl;
	}
	static fetch() {
		if (this.fetchImpl) return this.fetchImpl;
		if (typeof self !== "undefined" && "fetch" in self) return self.fetch;
		if (typeof globalThis !== "undefined" && globalThis.fetch) return globalThis.fetch;
		if (typeof fetch !== "undefined") return fetch;
		debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static headers() {
		if (this.headersImpl) return this.headersImpl;
		if (typeof self !== "undefined" && "Headers" in self) return self.Headers;
		if (typeof globalThis !== "undefined" && globalThis.Headers) return globalThis.Headers;
		if (typeof Headers !== "undefined") return Headers;
		debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static response() {
		if (this.responseImpl) return this.responseImpl;
		if (typeof self !== "undefined" && "Response" in self) return self.Response;
		if (typeof globalThis !== "undefined" && globalThis.Response) return globalThis.Response;
		if (typeof Response !== "undefined") return Response;
		debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Map from errors returned by the server to errors to developer visible errors
*/
var SERVER_ERROR_MAP = {
	["CREDENTIAL_MISMATCH"]: "custom-token-mismatch",
	["MISSING_CUSTOM_TOKEN"]: "internal-error",
	["INVALID_IDENTIFIER"]: "invalid-email",
	["MISSING_CONTINUE_URI"]: "internal-error",
	["INVALID_PASSWORD"]: "wrong-password",
	["MISSING_PASSWORD"]: "missing-password",
	["INVALID_LOGIN_CREDENTIALS"]: "invalid-credential",
	["EMAIL_EXISTS"]: "email-already-in-use",
	["PASSWORD_LOGIN_DISABLED"]: "operation-not-allowed",
	["INVALID_IDP_RESPONSE"]: "invalid-credential",
	["INVALID_PENDING_TOKEN"]: "invalid-credential",
	["FEDERATED_USER_ID_ALREADY_LINKED"]: "credential-already-in-use",
	["MISSING_REQ_TYPE"]: "internal-error",
	["EMAIL_NOT_FOUND"]: "user-not-found",
	["RESET_PASSWORD_EXCEED_LIMIT"]: "too-many-requests",
	["EXPIRED_OOB_CODE"]: "expired-action-code",
	["INVALID_OOB_CODE"]: "invalid-action-code",
	["MISSING_OOB_CODE"]: "internal-error",
	["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]: "requires-recent-login",
	["INVALID_ID_TOKEN"]: "invalid-user-token",
	["TOKEN_EXPIRED"]: "user-token-expired",
	["USER_NOT_FOUND"]: "user-token-expired",
	["TOO_MANY_ATTEMPTS_TRY_LATER"]: "too-many-requests",
	["PASSWORD_DOES_NOT_MEET_REQUIREMENTS"]: "password-does-not-meet-requirements",
	["INVALID_CODE"]: "invalid-verification-code",
	["INVALID_SESSION_INFO"]: "invalid-verification-id",
	["INVALID_TEMPORARY_PROOF"]: "invalid-credential",
	["MISSING_SESSION_INFO"]: "missing-verification-id",
	["SESSION_EXPIRED"]: "code-expired",
	["MISSING_ANDROID_PACKAGE_NAME"]: "missing-android-pkg-name",
	["UNAUTHORIZED_DOMAIN"]: "unauthorized-continue-uri",
	["INVALID_OAUTH_CLIENT_ID"]: "invalid-oauth-client-id",
	["ADMIN_ONLY_OPERATION"]: "admin-restricted-operation",
	["INVALID_MFA_PENDING_CREDENTIAL"]: "invalid-multi-factor-session",
	["MFA_ENROLLMENT_NOT_FOUND"]: "multi-factor-info-not-found",
	["MISSING_MFA_ENROLLMENT_ID"]: "missing-multi-factor-info",
	["MISSING_MFA_PENDING_CREDENTIAL"]: "missing-multi-factor-session",
	["SECOND_FACTOR_EXISTS"]: "second-factor-already-in-use",
	["SECOND_FACTOR_LIMIT_EXCEEDED"]: "maximum-second-factor-count-exceeded",
	["BLOCKING_FUNCTION_ERROR_RESPONSE"]: "internal-error",
	["RECAPTCHA_NOT_ENABLED"]: "recaptcha-not-enabled",
	["MISSING_RECAPTCHA_TOKEN"]: "missing-recaptcha-token",
	["INVALID_RECAPTCHA_TOKEN"]: "invalid-recaptcha-token",
	["INVALID_RECAPTCHA_ACTION"]: "invalid-recaptcha-action",
	["MISSING_CLIENT_TYPE"]: "missing-client-type",
	["MISSING_RECAPTCHA_VERSION"]: "missing-recaptcha-version",
	["INVALID_RECAPTCHA_VERSION"]: "invalid-recaptcha-version",
	["INVALID_REQ_TYPE"]: "invalid-req-type"
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var CookieAuthProxiedEndpoints = [
	"/v1/accounts:signInWithCustomToken",
	"/v1/accounts:signInWithEmailLink",
	"/v1/accounts:signInWithIdp",
	"/v1/accounts:signInWithPassword",
	"/v1/accounts:signInWithPhoneNumber",
	"/v1/token"
];
var DEFAULT_API_TIMEOUT_MS = new Delay(3e4, 6e4);
function _addTidIfNecessary(auth, request) {
	if (auth.tenantId && !request.tenantId) return Object.assign(Object.assign({}, request), { tenantId: auth.tenantId });
	return request;
}
function _performApiRequest(_x, _x2, _x3, _x4) {
	return _performApiRequest2.apply(this, arguments);
}
function _performApiRequest2() {
	_performApiRequest2 = _asyncToGenerator(function* (auth, method, path, request, customErrorMap = {}) {
		return _performFetchWithErrorHandling(auth, customErrorMap, _asyncToGenerator(function* () {
			let body = {};
			let params = {};
			if (request) if (method === "GET") params = request;
			else body = { body: JSON.stringify(request) };
			const query = querystring(Object.assign({ key: auth.config.apiKey }, params)).slice(1);
			const headers = yield auth._getAdditionalHeaders();
			headers["Content-Type"] = "application/json";
			if (auth.languageCode) headers["X-Firebase-Locale"] = auth.languageCode;
			const fetchArgs = Object.assign({
				method,
				headers
			}, body);
			if (!isCloudflareWorker()) fetchArgs.referrerPolicy = "no-referrer";
			if (auth.emulatorConfig && isCloudWorkstation(auth.emulatorConfig.host)) fetchArgs.credentials = "include";
			return FetchProvider.fetch()(yield _getFinalTarget(auth, auth.config.apiHost, path, query), fetchArgs);
		}));
	});
	return _performApiRequest2.apply(this, arguments);
}
function _performFetchWithErrorHandling(_x5, _x6, _x7) {
	return _performFetchWithErrorHandling2.apply(this, arguments);
}
function _performFetchWithErrorHandling2() {
	_performFetchWithErrorHandling2 = _asyncToGenerator(function* (auth, customErrorMap, fetchFn) {
		auth._canInitEmulator = false;
		const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
		try {
			const networkTimeout = new NetworkTimeout(auth);
			const response = yield Promise.race([fetchFn(), networkTimeout.promise]);
			networkTimeout.clearNetworkTimeout();
			const json = yield response.json();
			if ("needConfirmation" in json) throw _makeTaggedError(auth, "account-exists-with-different-credential", json);
			if (response.ok && !("errorMessage" in json)) return json;
			else {
				const [serverErrorCode, serverErrorMessage] = (response.ok ? json.errorMessage : json.error.message).split(" : ");
				if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED") throw _makeTaggedError(auth, "credential-already-in-use", json);
				else if (serverErrorCode === "EMAIL_EXISTS") throw _makeTaggedError(auth, "email-already-in-use", json);
				else if (serverErrorCode === "USER_DISABLED") throw _makeTaggedError(auth, "user-disabled", json);
				const authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, "-");
				if (serverErrorMessage) throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
				else _fail(auth, authError);
			}
		} catch (e) {
			if (e instanceof FirebaseError) throw e;
			_fail(auth, "network-request-failed", { "message": String(e) });
		}
	});
	return _performFetchWithErrorHandling2.apply(this, arguments);
}
function _performSignInRequest(_x8, _x9, _x10, _x11) {
	return _performSignInRequest2.apply(this, arguments);
}
function _performSignInRequest2() {
	_performSignInRequest2 = _asyncToGenerator(function* (auth, method, path, request, customErrorMap = {}) {
		const serverResponse = yield _performApiRequest(auth, method, path, request, customErrorMap);
		if ("mfaPendingCredential" in serverResponse) _fail(auth, "multi-factor-auth-required", { _serverResponse: serverResponse });
		return serverResponse;
	});
	return _performSignInRequest2.apply(this, arguments);
}
function _getFinalTarget(_x12, _x13, _x14, _x15) {
	return _getFinalTarget2.apply(this, arguments);
}
function _getFinalTarget2() {
	_getFinalTarget2 = _asyncToGenerator(function* (auth, host, path, query) {
		const base = `${host}${path}?${query}`;
		const authInternal = auth;
		const finalTarget = authInternal.config.emulator ? _emulatorUrl(auth.config, base) : `${auth.config.apiScheme}://${base}`;
		if (CookieAuthProxiedEndpoints.includes(path)) {
			yield authInternal._persistenceManagerAvailable;
			if (authInternal._getPersistenceType() === "COOKIE") return authInternal._getPersistence()._getFinalTarget(finalTarget).toString();
		}
		return finalTarget;
	});
	return _getFinalTarget2.apply(this, arguments);
}
function _parseEnforcementState(enforcementStateStr) {
	switch (enforcementStateStr) {
		case "ENFORCE": return "ENFORCE";
		case "AUDIT": return "AUDIT";
		case "OFF": return "OFF";
		default: return "ENFORCEMENT_STATE_UNSPECIFIED";
	}
}
var NetworkTimeout = class {
	clearNetworkTimeout() {
		clearTimeout(this.timer);
	}
	constructor(auth) {
		this.auth = auth;
		this.timer = null;
		this.promise = new Promise((_, reject) => {
			this.timer = setTimeout(() => {
				return reject(_createError(this.auth, "network-request-failed"));
			}, DEFAULT_API_TIMEOUT_MS.get());
		});
	}
};
function _makeTaggedError(auth, code, response) {
	const errorParams = { appName: auth.name };
	if (response.email) errorParams.email = response.email;
	if (response.phoneNumber) errorParams.phoneNumber = response.phoneNumber;
	const error = _createError(auth, code, errorParams);
	error.customData._tokenResponse = response;
	return error;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isV2(grecaptcha) {
	return grecaptcha !== void 0 && grecaptcha.getResponse !== void 0;
}
function isEnterprise(grecaptcha) {
	return grecaptcha !== void 0 && grecaptcha.enterprise !== void 0;
}
var RecaptchaConfig = class {
	constructor(response) {
		/**
		* The reCAPTCHA site key.
		*/
		this.siteKey = "";
		/**
		* The list of providers and their enablement status for reCAPTCHA Enterprise.
		*/
		this.recaptchaEnforcementState = [];
		if (response.recaptchaKey === void 0) throw new Error("recaptchaKey undefined");
		this.siteKey = response.recaptchaKey.split("/")[3];
		this.recaptchaEnforcementState = response.recaptchaEnforcementState;
	}
	/**
	* Returns the reCAPTCHA Enterprise enforcement state for the given provider.
	*
	* @param providerStr - The provider whose enforcement state is to be returned.
	* @returns The reCAPTCHA Enterprise enforcement state for the given provider.
	*/
	getProviderEnforcementState(providerStr) {
		if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) return null;
		for (const recaptchaEnforcementState of this.recaptchaEnforcementState) if (recaptchaEnforcementState.provider && recaptchaEnforcementState.provider === providerStr) return _parseEnforcementState(recaptchaEnforcementState.enforcementState);
		return null;
	}
	/**
	* Returns true if the reCAPTCHA Enterprise enforcement state for the provider is set to ENFORCE or AUDIT.
	*
	* @param providerStr - The provider whose enablement state is to be returned.
	* @returns Whether or not reCAPTCHA Enterprise protection is enabled for the given provider.
	*/
	isProviderEnabled(providerStr) {
		return this.getProviderEnforcementState(providerStr) === "ENFORCE" || this.getProviderEnforcementState(providerStr) === "AUDIT";
	}
	/**
	* Returns true if reCAPTCHA Enterprise protection is enabled in at least one provider, otherwise
	* returns false.
	*
	* @returns Whether or not reCAPTCHA Enterprise protection is enabled for at least one provider.
	*/
	isAnyProviderEnabled() {
		return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") || this.isProviderEnabled("PHONE_PROVIDER");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getRecaptchaParams(_x16) {
	return _getRecaptchaParams.apply(this, arguments);
}
function _getRecaptchaParams() {
	_getRecaptchaParams = _asyncToGenerator(function* (auth) {
		return (yield _performApiRequest(auth, "GET", "/v1/recaptchaParams")).recaptchaSiteKey || "";
	});
	return _getRecaptchaParams.apply(this, arguments);
}
function getRecaptchaConfig(_x17, _x18) {
	return _getRecaptchaConfig.apply(this, arguments);
}
function _getRecaptchaConfig() {
	_getRecaptchaConfig = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "GET", "/v2/recaptchaConfig", _addTidIfNecessary(auth, request));
	});
	return _getRecaptchaConfig.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function deleteAccount(_x19, _x20) {
	return _deleteAccount.apply(this, arguments);
}
function _deleteAccount() {
	_deleteAccount = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:delete", request);
	});
	return _deleteAccount.apply(this, arguments);
}
function deleteLinkedAccounts(_x21, _x22) {
	return _deleteLinkedAccounts.apply(this, arguments);
}
function _deleteLinkedAccounts() {
	_deleteLinkedAccounts = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:update", request);
	});
	return _deleteLinkedAccounts.apply(this, arguments);
}
function getAccountInfo(_x23, _x24) {
	return _getAccountInfo.apply(this, arguments);
}
function _getAccountInfo() {
	_getAccountInfo = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:lookup", request);
	});
	return _getAccountInfo.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function utcTimestampToDateString(utcTimestamp) {
	if (!utcTimestamp) return;
	try {
		const date = new Date(Number(utcTimestamp));
		if (!isNaN(date.getTime())) return date.toUTCString();
	} catch (e) {}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
*
* @remarks
* Returns the current token if it has not expired or if it will not expire in the next five
* minutes. Otherwise, this will refresh the token and return a new one.
*
* @param user - The user.
* @param forceRefresh - Force refresh regardless of token expiration.
*
* @public
*/
function getIdToken(user, forceRefresh = false) {
	return getModularInstance(user).getIdToken(forceRefresh);
}
/**
* Returns a deserialized JSON Web Token (JWT) used to identify the user to a Firebase service.
*
* @remarks
* Returns the current token if it has not expired or if it will not expire in the next five
* minutes. Otherwise, this will refresh the token and return a new one.
*
* @param user - The user.
* @param forceRefresh - Force refresh regardless of token expiration.
*
* @public
*/
function getIdTokenResult(_x25) {
	return _getIdTokenResult.apply(this, arguments);
}
function _getIdTokenResult() {
	_getIdTokenResult = _asyncToGenerator(function* (user, forceRefresh = false) {
		const userInternal = getModularInstance(user);
		const token = yield userInternal.getIdToken(forceRefresh);
		const claims = _parseToken(token);
		_assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error");
		const firebase = typeof claims.firebase === "object" ? claims.firebase : void 0;
		const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_provider"];
		return {
			claims,
			token,
			authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
			issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
			expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
			signInProvider: signInProvider || null,
			signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_second_factor"]) || null
		};
	});
	return _getIdTokenResult.apply(this, arguments);
}
function secondsStringToMilliseconds(seconds) {
	return Number(seconds) * 1e3;
}
function _parseToken(token) {
	const [algorithm, payload, signature] = token.split(".");
	if (algorithm === void 0 || payload === void 0 || signature === void 0) {
		_logError("JWT malformed, contained fewer than 3 sections");
		return null;
	}
	try {
		const decoded = base64Decode(payload);
		if (!decoded) {
			_logError("Failed to decode base64 JWT payload");
			return null;
		}
		return JSON.parse(decoded);
	} catch (e) {
		_logError("Caught error parsing JWT payload as JSON", e === null || e === void 0 ? void 0 : e.toString());
		return null;
	}
}
/**
* Extract expiresIn TTL from a token by subtracting the expiration from the issuance.
*/
function _tokenExpiresIn(token) {
	const parsedToken = _parseToken(token);
	_assert(parsedToken, "internal-error");
	_assert(typeof parsedToken.exp !== "undefined", "internal-error");
	_assert(typeof parsedToken.iat !== "undefined", "internal-error");
	return Number(parsedToken.exp) - Number(parsedToken.iat);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _logoutIfInvalidated(_x26, _x27) {
	return _logoutIfInvalidated2.apply(this, arguments);
}
function _logoutIfInvalidated2() {
	_logoutIfInvalidated2 = _asyncToGenerator(function* (user, promise, bypassAuthState = false) {
		if (bypassAuthState) return promise;
		try {
			return yield promise;
		} catch (e) {
			if (e instanceof FirebaseError && isUserInvalidated(e)) {
				if (user.auth.currentUser === user) yield user.auth.signOut();
			}
			throw e;
		}
	});
	return _logoutIfInvalidated2.apply(this, arguments);
}
function isUserInvalidated({ code }) {
	return code === `auth/user-disabled` || code === `auth/user-token-expired`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ProactiveRefresh = class {
	constructor(user) {
		this.user = user;
		this.isRunning = false;
		this.timerId = null;
		this.errorBackoff = 3e4;
	}
	_start() {
		if (this.isRunning) return;
		this.isRunning = true;
		this.schedule();
	}
	_stop() {
		if (!this.isRunning) return;
		this.isRunning = false;
		if (this.timerId !== null) clearTimeout(this.timerId);
	}
	getInterval(wasError) {
		var _a;
		if (wasError) {
			const interval = this.errorBackoff;
			this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4);
			return interval;
		} else {
			this.errorBackoff = 3e4;
			const interval = ((_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0) - Date.now() - 3e5;
			return Math.max(0, interval);
		}
	}
	schedule(wasError = false) {
		var _this = this;
		if (!this.isRunning) return;
		const interval = this.getInterval(wasError);
		this.timerId = setTimeout(_asyncToGenerator(function* () {
			yield _this.iteration();
		}), interval);
	}
	iteration() {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			try {
				yield _this2.user.getIdToken(true);
			} catch (e) {
				if ((e === null || e === void 0 ? void 0 : e.code) === `auth/network-request-failed`) _this2.schedule(true);
				return;
			}
			_this2.schedule();
		})();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UserMetadata = class {
	constructor(createdAt, lastLoginAt) {
		this.createdAt = createdAt;
		this.lastLoginAt = lastLoginAt;
		this._initializeTime();
	}
	_initializeTime() {
		this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
		this.creationTime = utcTimestampToDateString(this.createdAt);
	}
	_copy(metadata) {
		this.createdAt = metadata.createdAt;
		this.lastLoginAt = metadata.lastLoginAt;
		this._initializeTime();
	}
	toJSON() {
		return {
			createdAt: this.createdAt,
			lastLoginAt: this.lastLoginAt
		};
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _reloadWithoutSaving(_x28) {
	return _reloadWithoutSaving2.apply(this, arguments);
}
function _reloadWithoutSaving2() {
	_reloadWithoutSaving2 = _asyncToGenerator(function* (user) {
		var _a;
		const auth = user.auth;
		const response = yield _logoutIfInvalidated(user, getAccountInfo(auth, { idToken: yield user.getIdToken() }));
		_assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error");
		const coreAccount = response.users[0];
		user._notifyReloadListener(coreAccount);
		const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
		const providerData = mergeProviderData(user.providerData, newProviderData);
		const oldIsAnonymous = user.isAnonymous;
		const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
		const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
		const updates = {
			uid: coreAccount.localId,
			displayName: coreAccount.displayName || null,
			photoURL: coreAccount.photoUrl || null,
			email: coreAccount.email || null,
			emailVerified: coreAccount.emailVerified || false,
			phoneNumber: coreAccount.phoneNumber || null,
			tenantId: coreAccount.tenantId || null,
			providerData,
			metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
			isAnonymous
		};
		Object.assign(user, updates);
	});
	return _reloadWithoutSaving2.apply(this, arguments);
}
/**
* Reloads user account data, if signed in.
*
* @param user - The user.
*
* @public
*/
function reload(_x29) {
	return _reload.apply(this, arguments);
}
function _reload() {
	_reload = _asyncToGenerator(function* (user) {
		const userInternal = getModularInstance(user);
		yield _reloadWithoutSaving(userInternal);
		yield userInternal.auth._persistUserIfCurrent(userInternal);
		userInternal.auth._notifyListenersIfCurrent(userInternal);
	});
	return _reload.apply(this, arguments);
}
function mergeProviderData(original, newData) {
	return [...original.filter((o) => !newData.some((n) => n.providerId === o.providerId)), ...newData];
}
function extractProviderData(providers) {
	return providers.map((_a) => {
		var { providerId } = _a, provider = __rest(_a, ["providerId"]);
		return {
			providerId,
			uid: provider.rawId || "",
			displayName: provider.displayName || null,
			email: provider.email || null,
			phoneNumber: provider.phoneNumber || null,
			photoURL: provider.photoUrl || null
		};
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function requestStsToken(_x30, _x31) {
	return _requestStsToken.apply(this, arguments);
}
function _requestStsToken() {
	_requestStsToken = _asyncToGenerator(function* (auth, refreshToken) {
		const response = yield _performFetchWithErrorHandling(auth, {}, _asyncToGenerator(function* () {
			const body = querystring({
				"grant_type": "refresh_token",
				"refresh_token": refreshToken
			}).slice(1);
			const { tokenApiHost, apiKey } = auth.config;
			const url = yield _getFinalTarget(auth, tokenApiHost, "/v1/token", `key=${apiKey}`);
			const headers = yield auth._getAdditionalHeaders();
			headers["Content-Type"] = "application/x-www-form-urlencoded";
			const options = {
				method: "POST",
				headers,
				body
			};
			if (auth.emulatorConfig && isCloudWorkstation(auth.emulatorConfig.host)) options.credentials = "include";
			return FetchProvider.fetch()(url, options);
		}));
		return {
			accessToken: response.access_token,
			expiresIn: response.expires_in,
			refreshToken: response.refresh_token
		};
	});
	return _requestStsToken.apply(this, arguments);
}
function revokeToken(_x32, _x33) {
	return _revokeToken.apply(this, arguments);
}
function _revokeToken() {
	_revokeToken = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v2/accounts:revokeToken", _addTidIfNecessary(auth, request));
	});
	return _revokeToken.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* We need to mark this class as internal explicitly to exclude it in the public typings, because
* it references AuthInternal which has a circular dependency with UserInternal.
*
* @internal
*/
var StsTokenManager = class StsTokenManager {
	constructor() {
		this.refreshToken = null;
		this.accessToken = null;
		this.expirationTime = null;
	}
	get isExpired() {
		return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
	}
	updateFromServerResponse(response) {
		_assert(response.idToken, "internal-error");
		_assert(typeof response.idToken !== "undefined", "internal-error");
		_assert(typeof response.refreshToken !== "undefined", "internal-error");
		const expiresIn = "expiresIn" in response && typeof response.expiresIn !== "undefined" ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
		this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
	}
	updateFromIdToken(idToken) {
		_assert(idToken.length !== 0, "internal-error");
		const expiresIn = _tokenExpiresIn(idToken);
		this.updateTokensAndExpiration(idToken, null, expiresIn);
	}
	getToken(auth, forceRefresh = false) {
		var _this3 = this;
		return _asyncToGenerator(function* () {
			if (!forceRefresh && _this3.accessToken && !_this3.isExpired) return _this3.accessToken;
			_assert(_this3.refreshToken, auth, "user-token-expired");
			if (_this3.refreshToken) {
				yield _this3.refresh(auth, _this3.refreshToken);
				return _this3.accessToken;
			}
			return null;
		})();
	}
	clearRefreshToken() {
		this.refreshToken = null;
	}
	refresh(auth, oldToken) {
		var _this4 = this;
		return _asyncToGenerator(function* () {
			const { accessToken, refreshToken, expiresIn } = yield requestStsToken(auth, oldToken);
			_this4.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
		})();
	}
	updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
		this.refreshToken = refreshToken || null;
		this.accessToken = accessToken || null;
		this.expirationTime = Date.now() + expiresInSec * 1e3;
	}
	static fromJSON(appName, object) {
		const { refreshToken, accessToken, expirationTime } = object;
		const manager = new StsTokenManager();
		if (refreshToken) {
			_assert(typeof refreshToken === "string", "internal-error", { appName });
			manager.refreshToken = refreshToken;
		}
		if (accessToken) {
			_assert(typeof accessToken === "string", "internal-error", { appName });
			manager.accessToken = accessToken;
		}
		if (expirationTime) {
			_assert(typeof expirationTime === "number", "internal-error", { appName });
			manager.expirationTime = expirationTime;
		}
		return manager;
	}
	toJSON() {
		return {
			refreshToken: this.refreshToken,
			accessToken: this.accessToken,
			expirationTime: this.expirationTime
		};
	}
	_assign(stsTokenManager) {
		this.accessToken = stsTokenManager.accessToken;
		this.refreshToken = stsTokenManager.refreshToken;
		this.expirationTime = stsTokenManager.expirationTime;
	}
	_clone() {
		return Object.assign(new StsTokenManager(), this.toJSON());
	}
	_performRefresh() {
		return debugFail("not implemented");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function assertStringOrUndefined(assertion, appName) {
	_assert(typeof assertion === "string" || typeof assertion === "undefined", "internal-error", { appName });
}
var UserImpl = class UserImpl {
	constructor(_a) {
		var { uid, auth, stsTokenManager } = _a, opt = __rest(_a, [
			"uid",
			"auth",
			"stsTokenManager"
		]);
		this.providerId = "firebase";
		this.proactiveRefresh = new ProactiveRefresh(this);
		this.reloadUserInfo = null;
		this.reloadListener = null;
		this.uid = uid;
		this.auth = auth;
		this.stsTokenManager = stsTokenManager;
		this.accessToken = stsTokenManager.accessToken;
		this.displayName = opt.displayName || null;
		this.email = opt.email || null;
		this.emailVerified = opt.emailVerified || false;
		this.phoneNumber = opt.phoneNumber || null;
		this.photoURL = opt.photoURL || null;
		this.isAnonymous = opt.isAnonymous || false;
		this.tenantId = opt.tenantId || null;
		this.providerData = opt.providerData ? [...opt.providerData] : [];
		this.metadata = new UserMetadata(opt.createdAt || void 0, opt.lastLoginAt || void 0);
	}
	getIdToken(forceRefresh) {
		var _this5 = this;
		return _asyncToGenerator(function* () {
			const accessToken = yield _logoutIfInvalidated(_this5, _this5.stsTokenManager.getToken(_this5.auth, forceRefresh));
			_assert(accessToken, _this5.auth, "internal-error");
			if (_this5.accessToken !== accessToken) {
				_this5.accessToken = accessToken;
				yield _this5.auth._persistUserIfCurrent(_this5);
				_this5.auth._notifyListenersIfCurrent(_this5);
			}
			return accessToken;
		})();
	}
	getIdTokenResult(forceRefresh) {
		return getIdTokenResult(this, forceRefresh);
	}
	reload() {
		return reload(this);
	}
	_assign(user) {
		if (this === user) return;
		_assert(this.uid === user.uid, this.auth, "internal-error");
		this.displayName = user.displayName;
		this.photoURL = user.photoURL;
		this.email = user.email;
		this.emailVerified = user.emailVerified;
		this.phoneNumber = user.phoneNumber;
		this.isAnonymous = user.isAnonymous;
		this.tenantId = user.tenantId;
		this.providerData = user.providerData.map((userInfo) => Object.assign({}, userInfo));
		this.metadata._copy(user.metadata);
		this.stsTokenManager._assign(user.stsTokenManager);
	}
	_clone(auth) {
		const newUser = new UserImpl(Object.assign(Object.assign({}, this), {
			auth,
			stsTokenManager: this.stsTokenManager._clone()
		}));
		newUser.metadata._copy(this.metadata);
		return newUser;
	}
	_onReload(callback) {
		_assert(!this.reloadListener, this.auth, "internal-error");
		this.reloadListener = callback;
		if (this.reloadUserInfo) {
			this._notifyReloadListener(this.reloadUserInfo);
			this.reloadUserInfo = null;
		}
	}
	_notifyReloadListener(userInfo) {
		if (this.reloadListener) this.reloadListener(userInfo);
		else this.reloadUserInfo = userInfo;
	}
	_startProactiveRefresh() {
		this.proactiveRefresh._start();
	}
	_stopProactiveRefresh() {
		this.proactiveRefresh._stop();
	}
	_updateTokensIfNecessary(response, reload = false) {
		var _this6 = this;
		return _asyncToGenerator(function* () {
			let tokensRefreshed = false;
			if (response.idToken && response.idToken !== _this6.stsTokenManager.accessToken) {
				_this6.stsTokenManager.updateFromServerResponse(response);
				tokensRefreshed = true;
			}
			if (reload) yield _reloadWithoutSaving(_this6);
			yield _this6.auth._persistUserIfCurrent(_this6);
			if (tokensRefreshed) _this6.auth._notifyListenersIfCurrent(_this6);
		})();
	}
	delete() {
		var _this7 = this;
		return _asyncToGenerator(function* () {
			if (_isFirebaseServerApp(_this7.auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(_this7.auth));
			const idToken = yield _this7.getIdToken();
			yield _logoutIfInvalidated(_this7, deleteAccount(_this7.auth, { idToken }));
			_this7.stsTokenManager.clearRefreshToken();
			return _this7.auth.signOut();
		})();
	}
	toJSON() {
		return Object.assign(Object.assign({
			uid: this.uid,
			email: this.email || void 0,
			emailVerified: this.emailVerified,
			displayName: this.displayName || void 0,
			isAnonymous: this.isAnonymous,
			photoURL: this.photoURL || void 0,
			phoneNumber: this.phoneNumber || void 0,
			tenantId: this.tenantId || void 0,
			providerData: this.providerData.map((userInfo) => Object.assign({}, userInfo)),
			stsTokenManager: this.stsTokenManager.toJSON(),
			_redirectEventId: this._redirectEventId
		}, this.metadata.toJSON()), {
			apiKey: this.auth.config.apiKey,
			appName: this.auth.name
		});
	}
	get refreshToken() {
		return this.stsTokenManager.refreshToken || "";
	}
	static _fromJSON(auth, object) {
		var _a, _b, _c, _d, _e, _f, _g, _h;
		const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : void 0;
		const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
		const phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : void 0;
		const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
		const tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : void 0;
		const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
		const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
		const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : void 0;
		const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
		_assert(uid && plainObjectTokenManager, auth, "internal-error");
		const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
		_assert(typeof uid === "string", auth, "internal-error");
		assertStringOrUndefined(displayName, auth.name);
		assertStringOrUndefined(email, auth.name);
		_assert(typeof emailVerified === "boolean", auth, "internal-error");
		_assert(typeof isAnonymous === "boolean", auth, "internal-error");
		assertStringOrUndefined(phoneNumber, auth.name);
		assertStringOrUndefined(photoURL, auth.name);
		assertStringOrUndefined(tenantId, auth.name);
		assertStringOrUndefined(_redirectEventId, auth.name);
		assertStringOrUndefined(createdAt, auth.name);
		assertStringOrUndefined(lastLoginAt, auth.name);
		const user = new UserImpl({
			uid,
			auth,
			email,
			emailVerified,
			displayName,
			isAnonymous,
			photoURL,
			phoneNumber,
			tenantId,
			stsTokenManager,
			createdAt,
			lastLoginAt
		});
		if (providerData && Array.isArray(providerData)) user.providerData = providerData.map((userInfo) => Object.assign({}, userInfo));
		if (_redirectEventId) user._redirectEventId = _redirectEventId;
		return user;
	}
	/**
	* Initialize a User from an idToken server response
	* @param auth
	* @param idTokenResponse
	*/
	static _fromIdTokenResponse(auth, idTokenResponse, isAnonymous = false) {
		return _asyncToGenerator(function* () {
			const stsTokenManager = new StsTokenManager();
			stsTokenManager.updateFromServerResponse(idTokenResponse);
			const user = new UserImpl({
				uid: idTokenResponse.localId,
				auth,
				stsTokenManager,
				isAnonymous
			});
			yield _reloadWithoutSaving(user);
			return user;
		})();
	}
	/**
	* Initialize a User from an idToken server response
	* @param auth
	* @param idTokenResponse
	*/
	static _fromGetAccountInfoResponse(auth, response, idToken) {
		return _asyncToGenerator(function* () {
			const coreAccount = response.users[0];
			_assert(coreAccount.localId !== void 0, "internal-error");
			const providerData = coreAccount.providerUserInfo !== void 0 ? extractProviderData(coreAccount.providerUserInfo) : [];
			const isAnonymous = !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
			const stsTokenManager = new StsTokenManager();
			stsTokenManager.updateFromIdToken(idToken);
			const user = new UserImpl({
				uid: coreAccount.localId,
				auth,
				stsTokenManager,
				isAnonymous
			});
			const updates = {
				uid: coreAccount.localId,
				displayName: coreAccount.displayName || null,
				photoURL: coreAccount.photoUrl || null,
				email: coreAccount.email || null,
				emailVerified: coreAccount.emailVerified || false,
				phoneNumber: coreAccount.phoneNumber || null,
				tenantId: coreAccount.tenantId || null,
				providerData,
				metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
				isAnonymous: !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length)
			};
			Object.assign(user, updates);
			return user;
		})();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var instanceCache = /* @__PURE__ */ new Map();
function _getInstance(cls) {
	debugAssert(cls instanceof Function, "Expected a class definition");
	let instance = instanceCache.get(cls);
	if (instance) {
		debugAssert(instance instanceof cls, "Instance stored in cache mismatched with class");
		return instance;
	}
	instance = new cls();
	instanceCache.set(cls, instance);
	return instance;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var InMemoryPersistence = class {
	constructor() {
		this.type = "NONE";
		this.storage = {};
	}
	_isAvailable() {
		return _asyncToGenerator(function* () {
			return true;
		})();
	}
	_set(key, value) {
		var _this8 = this;
		return _asyncToGenerator(function* () {
			_this8.storage[key] = value;
		})();
	}
	_get(key) {
		var _this9 = this;
		return _asyncToGenerator(function* () {
			const value = _this9.storage[key];
			return value === void 0 ? null : value;
		})();
	}
	_remove(key) {
		var _this10 = this;
		return _asyncToGenerator(function* () {
			delete _this10.storage[key];
		})();
	}
	_addListener(_key, _listener) {}
	_removeListener(_key, _listener) {}
};
InMemoryPersistence.type = "NONE";
/**
* An implementation of {@link Persistence} of type 'NONE'.
*
* @public
*/
var inMemoryPersistence = InMemoryPersistence;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _persistenceKeyName(key, apiKey, appName) {
	return `firebase:${key}:${apiKey}:${appName}`;
}
var PersistenceUserManager = class PersistenceUserManager {
	constructor(persistence, auth, userKey) {
		this.persistence = persistence;
		this.auth = auth;
		this.userKey = userKey;
		const { config, name } = this.auth;
		this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
		this.fullPersistenceKey = _persistenceKeyName("persistence", config.apiKey, name);
		this.boundEventHandler = auth._onStorageEvent.bind(auth);
		this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
	}
	setCurrentUser(user) {
		return this.persistence._set(this.fullUserKey, user.toJSON());
	}
	getCurrentUser() {
		var _this11 = this;
		return _asyncToGenerator(function* () {
			const blob = yield _this11.persistence._get(_this11.fullUserKey);
			if (!blob) return null;
			if (typeof blob === "string") {
				const response = yield getAccountInfo(_this11.auth, { idToken: blob }).catch(() => void 0);
				if (!response) return null;
				return UserImpl._fromGetAccountInfoResponse(_this11.auth, response, blob);
			}
			return UserImpl._fromJSON(_this11.auth, blob);
		})();
	}
	removeCurrentUser() {
		return this.persistence._remove(this.fullUserKey);
	}
	savePersistenceForRedirect() {
		return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
	}
	setPersistence(newPersistence) {
		var _this12 = this;
		return _asyncToGenerator(function* () {
			if (_this12.persistence === newPersistence) return;
			const currentUser = yield _this12.getCurrentUser();
			yield _this12.removeCurrentUser();
			_this12.persistence = newPersistence;
			if (currentUser) return _this12.setCurrentUser(currentUser);
		})();
	}
	delete() {
		this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
	}
	static create(auth, persistenceHierarchy, userKey = "authUser") {
		return _asyncToGenerator(function* () {
			if (!persistenceHierarchy.length) return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey);
			const availablePersistences = (yield Promise.all(persistenceHierarchy.map(function() {
				var _ref = _asyncToGenerator(function* (persistence) {
					if (yield persistence._isAvailable()) return persistence;
				});
				return function(_x34) {
					return _ref.apply(this, arguments);
				};
			}()))).filter((persistence) => persistence);
			let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
			const key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
			let userToMigrate = null;
			for (const persistence of persistenceHierarchy) try {
				const blob = yield persistence._get(key);
				if (blob) {
					let user;
					if (typeof blob === "string") {
						const response = yield getAccountInfo(auth, { idToken: blob }).catch(() => void 0);
						if (!response) break;
						user = yield UserImpl._fromGetAccountInfoResponse(auth, response, blob);
					} else user = UserImpl._fromJSON(auth, blob);
					if (persistence !== selectedPersistence) userToMigrate = user;
					selectedPersistence = persistence;
					break;
				}
			} catch (_a) {}
			const migrationHierarchy = availablePersistences.filter((p) => p._shouldAllowMigration);
			if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) return new PersistenceUserManager(selectedPersistence, auth, userKey);
			selectedPersistence = migrationHierarchy[0];
			if (userToMigrate) yield selectedPersistence._set(key, userToMigrate.toJSON());
			yield Promise.all(persistenceHierarchy.map(function() {
				var _ref2 = _asyncToGenerator(function* (persistence) {
					if (persistence !== selectedPersistence) try {
						yield persistence._remove(key);
					} catch (_a) {}
				});
				return function(_x35) {
					return _ref2.apply(this, arguments);
				};
			}()));
			return new PersistenceUserManager(selectedPersistence, auth, userKey);
		})();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Determine the browser for the purposes of reporting usage to the API
*/
function _getBrowserName(userAgent) {
	const ua = userAgent.toLowerCase();
	if (ua.includes("opera/") || ua.includes("opr/") || ua.includes("opios/")) return "Opera";
	else if (_isIEMobile(ua)) return "IEMobile";
	else if (ua.includes("msie") || ua.includes("trident/")) return "IE";
	else if (ua.includes("edge/")) return "Edge";
	else if (_isFirefox(ua)) return "Firefox";
	else if (ua.includes("silk/")) return "Silk";
	else if (_isBlackBerry(ua)) return "Blackberry";
	else if (_isWebOS(ua)) return "Webos";
	else if (_isSafari(ua)) return "Safari";
	else if ((ua.includes("chrome/") || _isChromeIOS(ua)) && !ua.includes("edge/")) return "Chrome";
	else if (_isAndroid(ua)) return "Android";
	else {
		const matches = userAgent.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
		if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) return matches[1];
	}
	return "Other";
}
function _isFirefox(ua = getUA()) {
	return /firefox\//i.test(ua);
}
function _isSafari(userAgent = getUA()) {
	const ua = userAgent.toLowerCase();
	return ua.includes("safari/") && !ua.includes("chrome/") && !ua.includes("crios/") && !ua.includes("android");
}
function _isChromeIOS(ua = getUA()) {
	return /crios\//i.test(ua);
}
function _isIEMobile(ua = getUA()) {
	return /iemobile/i.test(ua);
}
function _isAndroid(ua = getUA()) {
	return /android/i.test(ua);
}
function _isBlackBerry(ua = getUA()) {
	return /blackberry/i.test(ua);
}
function _isWebOS(ua = getUA()) {
	return /webos/i.test(ua);
}
function _isIOS(ua = getUA()) {
	return /iphone|ipad|ipod/i.test(ua) || /macintosh/i.test(ua) && /mobile/i.test(ua);
}
function _isIOSStandalone(ua = getUA()) {
	var _a;
	return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
}
function _isIE10() {
	return isIE() && document.documentMode === 10;
}
function _isMobileBrowser(ua = getUA()) {
	return _isIOS(ua) || _isAndroid(ua) || _isWebOS(ua) || _isBlackBerry(ua) || /windows phone/i.test(ua) || _isIEMobile(ua);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getClientVersion(clientPlatform, frameworks = []) {
	let reportedPlatform;
	switch (clientPlatform) {
		case "Browser":
			reportedPlatform = _getBrowserName(getUA());
			break;
		case "Worker":
			reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
			break;
		default: reportedPlatform = clientPlatform;
	}
	const reportedFrameworks = frameworks.length ? frameworks.join(",") : "FirebaseCore-web";
	return `${reportedPlatform}/JsCore/${SDK_VERSION}/${reportedFrameworks}`;
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthMiddlewareQueue = class {
	constructor(auth) {
		this.auth = auth;
		this.queue = [];
	}
	pushCallback(callback, onAbort) {
		const wrappedCallback = (user) => new Promise((resolve, reject) => {
			try {
				resolve(callback(user));
			} catch (e) {
				reject(e);
			}
		});
		wrappedCallback.onAbort = onAbort;
		this.queue.push(wrappedCallback);
		const index = this.queue.length - 1;
		return () => {
			this.queue[index] = () => Promise.resolve();
		};
	}
	runMiddleware(nextUser) {
		var _this13 = this;
		return _asyncToGenerator(function* () {
			if (_this13.auth.currentUser === nextUser) return;
			const onAbortStack = [];
			try {
				for (const beforeStateCallback of _this13.queue) {
					yield beforeStateCallback(nextUser);
					if (beforeStateCallback.onAbort) onAbortStack.push(beforeStateCallback.onAbort);
				}
			} catch (e) {
				onAbortStack.reverse();
				for (const onAbort of onAbortStack) try {
					onAbort();
				} catch (_) {}
				throw _this13.auth._errorFactory.create("login-blocked", { originalMessage: e === null || e === void 0 ? void 0 : e.message });
			}
		})();
	}
};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Fetches the password policy for the currently set tenant or the project if no tenant is set.
*
* @param auth Auth object.
* @param request Password policy request.
* @returns Password policy response.
*/
function _getPasswordPolicy(_x36) {
	return _getPasswordPolicy2.apply(this, arguments);
}
function _getPasswordPolicy2() {
	_getPasswordPolicy2 = _asyncToGenerator(function* (auth, request = {}) {
		return _performApiRequest(auth, "GET", "/v2/passwordPolicy", _addTidIfNecessary(auth, request));
	});
	return _getPasswordPolicy2.apply(this, arguments);
}
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MINIMUM_MIN_PASSWORD_LENGTH = 6;
/**
* Stores password policy requirements and provides password validation against the policy.
*
* @internal
*/
var PasswordPolicyImpl = class {
	constructor(response) {
		var _a, _b, _c, _d;
		const responseOptions = response.customStrengthOptions;
		this.customStrengthOptions = {};
		this.customStrengthOptions.minPasswordLength = (_a = responseOptions.minPasswordLength) !== null && _a !== void 0 ? _a : MINIMUM_MIN_PASSWORD_LENGTH;
		if (responseOptions.maxPasswordLength) this.customStrengthOptions.maxPasswordLength = responseOptions.maxPasswordLength;
		if (responseOptions.containsLowercaseCharacter !== void 0) this.customStrengthOptions.containsLowercaseLetter = responseOptions.containsLowercaseCharacter;
		if (responseOptions.containsUppercaseCharacter !== void 0) this.customStrengthOptions.containsUppercaseLetter = responseOptions.containsUppercaseCharacter;
		if (responseOptions.containsNumericCharacter !== void 0) this.customStrengthOptions.containsNumericCharacter = responseOptions.containsNumericCharacter;
		if (responseOptions.containsNonAlphanumericCharacter !== void 0) this.customStrengthOptions.containsNonAlphanumericCharacter = responseOptions.containsNonAlphanumericCharacter;
		this.enforcementState = response.enforcementState;
		if (this.enforcementState === "ENFORCEMENT_STATE_UNSPECIFIED") this.enforcementState = "OFF";
		this.allowedNonAlphanumericCharacters = (_c = (_b = response.allowedNonAlphanumericCharacters) === null || _b === void 0 ? void 0 : _b.join("")) !== null && _c !== void 0 ? _c : "";
		this.forceUpgradeOnSignin = (_d = response.forceUpgradeOnSignin) !== null && _d !== void 0 ? _d : false;
		this.schemaVersion = response.schemaVersion;
	}
	validatePassword(password) {
		var _a, _b, _c, _d, _e, _f;
		const status = {
			isValid: true,
			passwordPolicy: this
		};
		this.validatePasswordLengthOptions(password, status);
		this.validatePasswordCharacterOptions(password, status);
		status.isValid && (status.isValid = (_a = status.meetsMinPasswordLength) !== null && _a !== void 0 ? _a : true);
		status.isValid && (status.isValid = (_b = status.meetsMaxPasswordLength) !== null && _b !== void 0 ? _b : true);
		status.isValid && (status.isValid = (_c = status.containsLowercaseLetter) !== null && _c !== void 0 ? _c : true);
		status.isValid && (status.isValid = (_d = status.containsUppercaseLetter) !== null && _d !== void 0 ? _d : true);
		status.isValid && (status.isValid = (_e = status.containsNumericCharacter) !== null && _e !== void 0 ? _e : true);
		status.isValid && (status.isValid = (_f = status.containsNonAlphanumericCharacter) !== null && _f !== void 0 ? _f : true);
		return status;
	}
	/**
	* Validates that the password meets the length options for the policy.
	*
	* @param password Password to validate.
	* @param status Validation status.
	*/
	validatePasswordLengthOptions(password, status) {
		const minPasswordLength = this.customStrengthOptions.minPasswordLength;
		const maxPasswordLength = this.customStrengthOptions.maxPasswordLength;
		if (minPasswordLength) status.meetsMinPasswordLength = password.length >= minPasswordLength;
		if (maxPasswordLength) status.meetsMaxPasswordLength = password.length <= maxPasswordLength;
	}
	/**
	* Validates that the password meets the character options for the policy.
	*
	* @param password Password to validate.
	* @param status Validation status.
	*/
	validatePasswordCharacterOptions(password, status) {
		this.updatePasswordCharacterOptionsStatuses(status, false, false, false, false);
		let passwordChar;
		for (let i = 0; i < password.length; i++) {
			passwordChar = password.charAt(i);
			this.updatePasswordCharacterOptionsStatuses(status, passwordChar >= "a" && passwordChar <= "z", passwordChar >= "A" && passwordChar <= "Z", passwordChar >= "0" && passwordChar <= "9", this.allowedNonAlphanumericCharacters.includes(passwordChar));
		}
	}
	/**
	* Updates the running validation status with the statuses for the character options.
	* Expected to be called each time a character is processed to update each option status
	* based on the current character.
	*
	* @param status Validation status.
	* @param containsLowercaseCharacter Whether the character is a lowercase letter.
	* @param containsUppercaseCharacter Whether the character is an uppercase letter.
	* @param containsNumericCharacter Whether the character is a numeric character.
	* @param containsNonAlphanumericCharacter Whether the character is a non-alphanumeric character.
	*/
	updatePasswordCharacterOptionsStatuses(status, containsLowercaseCharacter, containsUppercaseCharacter, containsNumericCharacter, containsNonAlphanumericCharacter) {
		if (this.customStrengthOptions.containsLowercaseLetter) status.containsLowercaseLetter || (status.containsLowercaseLetter = containsLowercaseCharacter);
		if (this.customStrengthOptions.containsUppercaseLetter) status.containsUppercaseLetter || (status.containsUppercaseLetter = containsUppercaseCharacter);
		if (this.customStrengthOptions.containsNumericCharacter) status.containsNumericCharacter || (status.containsNumericCharacter = containsNumericCharacter);
		if (this.customStrengthOptions.containsNonAlphanumericCharacter) status.containsNonAlphanumericCharacter || (status.containsNonAlphanumericCharacter = containsNonAlphanumericCharacter);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthImpl = class {
	constructor(app, heartbeatServiceProvider, appCheckServiceProvider, config) {
		this.app = app;
		this.heartbeatServiceProvider = heartbeatServiceProvider;
		this.appCheckServiceProvider = appCheckServiceProvider;
		this.config = config;
		this.currentUser = null;
		this.emulatorConfig = null;
		this.operations = Promise.resolve();
		this.authStateSubscription = new Subscription(this);
		this.idTokenSubscription = new Subscription(this);
		this.beforeStateQueue = new AuthMiddlewareQueue(this);
		this.redirectUser = null;
		this.isProactiveRefreshEnabled = false;
		this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1;
		this._canInitEmulator = true;
		this._isInitialized = false;
		this._deleted = false;
		this._initializationPromise = null;
		this._popupRedirectResolver = null;
		this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
		this._agentRecaptchaConfig = null;
		this._tenantRecaptchaConfigs = {};
		this._projectPasswordPolicy = null;
		this._tenantPasswordPolicies = {};
		this._resolvePersistenceManagerAvailable = void 0;
		this.lastNotifiedUid = void 0;
		this.languageCode = null;
		this.tenantId = null;
		this.settings = { appVerificationDisabledForTesting: false };
		this.frameworks = [];
		this.name = app.name;
		this.clientVersion = config.sdkClientVersion;
		this._persistenceManagerAvailable = new Promise((resolve) => this._resolvePersistenceManagerAvailable = resolve);
	}
	_initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
		var _this14 = this;
		if (popupRedirectResolver) this._popupRedirectResolver = _getInstance(popupRedirectResolver);
		this._initializationPromise = this.queue(_asyncToGenerator(function* () {
			var _a, _b, _c;
			if (_this14._deleted) return;
			_this14.persistenceManager = yield PersistenceUserManager.create(_this14, persistenceHierarchy);
			(_a = _this14._resolvePersistenceManagerAvailable) === null || _a === void 0 || _a.call(_this14);
			if (_this14._deleted) return;
			if ((_b = _this14._popupRedirectResolver) === null || _b === void 0 ? void 0 : _b._shouldInitProactively) try {
				yield _this14._popupRedirectResolver._initialize(_this14);
			} catch (e) {}
			yield _this14.initializeCurrentUser(popupRedirectResolver);
			_this14.lastNotifiedUid = ((_c = _this14.currentUser) === null || _c === void 0 ? void 0 : _c.uid) || null;
			if (_this14._deleted) return;
			_this14._isInitialized = true;
		}));
		return this._initializationPromise;
	}
	/**
	* If the persistence is changed in another window, the user manager will let us know
	*/
	_onStorageEvent() {
		var _this15 = this;
		return _asyncToGenerator(function* () {
			if (_this15._deleted) return;
			const user = yield _this15.assertedPersistence.getCurrentUser();
			if (!_this15.currentUser && !user) return;
			if (_this15.currentUser && user && _this15.currentUser.uid === user.uid) {
				_this15._currentUser._assign(user);
				yield _this15.currentUser.getIdToken();
				return;
			}
			yield _this15._updateCurrentUser(user, true);
		})();
	}
	initializeCurrentUserFromIdToken(idToken) {
		var _this16 = this;
		return _asyncToGenerator(function* () {
			try {
				const response = yield getAccountInfo(_this16, { idToken });
				const user = yield UserImpl._fromGetAccountInfoResponse(_this16, response, idToken);
				yield _this16.directlySetCurrentUser(user);
			} catch (err) {
				console.warn("FirebaseServerApp could not login user with provided authIdToken: ", err);
				yield _this16.directlySetCurrentUser(null);
			}
		})();
	}
	initializeCurrentUser(popupRedirectResolver) {
		var _this17 = this;
		return _asyncToGenerator(function* () {
			var _a;
			if (_isFirebaseServerApp(_this17.app)) {
				const idToken = _this17.app.settings.authIdToken;
				if (idToken) return new Promise((resolve) => {
					setTimeout(() => _this17.initializeCurrentUserFromIdToken(idToken).then(resolve, resolve));
				});
				else return _this17.directlySetCurrentUser(null);
			}
			const previouslyStoredUser = yield _this17.assertedPersistence.getCurrentUser();
			let futureCurrentUser = previouslyStoredUser;
			let needsTocheckMiddleware = false;
			if (popupRedirectResolver && _this17.config.authDomain) {
				yield _this17.getOrInitRedirectPersistenceManager();
				const redirectUserEventId = (_a = _this17.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
				const storedUserEventId = futureCurrentUser === null || futureCurrentUser === void 0 ? void 0 : futureCurrentUser._redirectEventId;
				const result = yield _this17.tryRedirectSignIn(popupRedirectResolver);
				if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
					futureCurrentUser = result.user;
					needsTocheckMiddleware = true;
				}
			}
			if (!futureCurrentUser) return _this17.directlySetCurrentUser(null);
			if (!futureCurrentUser._redirectEventId) {
				if (needsTocheckMiddleware) try {
					yield _this17.beforeStateQueue.runMiddleware(futureCurrentUser);
				} catch (e) {
					futureCurrentUser = previouslyStoredUser;
					_this17._popupRedirectResolver._overrideRedirectResult(_this17, () => Promise.reject(e));
				}
				if (futureCurrentUser) return _this17.reloadAndSetCurrentUserOrClear(futureCurrentUser);
				else return _this17.directlySetCurrentUser(null);
			}
			_assert(_this17._popupRedirectResolver, _this17, "argument-error");
			yield _this17.getOrInitRedirectPersistenceManager();
			if (_this17.redirectUser && _this17.redirectUser._redirectEventId === futureCurrentUser._redirectEventId) return _this17.directlySetCurrentUser(futureCurrentUser);
			return _this17.reloadAndSetCurrentUserOrClear(futureCurrentUser);
		})();
	}
	tryRedirectSignIn(redirectResolver) {
		var _this18 = this;
		return _asyncToGenerator(function* () {
			let result = null;
			try {
				result = yield _this18._popupRedirectResolver._completeRedirectFn(_this18, redirectResolver, true);
			} catch (e) {
				yield _this18._setRedirectUser(null);
			}
			return result;
		})();
	}
	reloadAndSetCurrentUserOrClear(user) {
		var _this19 = this;
		return _asyncToGenerator(function* () {
			try {
				yield _reloadWithoutSaving(user);
			} catch (e) {
				if ((e === null || e === void 0 ? void 0 : e.code) !== `auth/network-request-failed`) return _this19.directlySetCurrentUser(null);
			}
			return _this19.directlySetCurrentUser(user);
		})();
	}
	useDeviceLanguage() {
		this.languageCode = _getUserLanguage();
	}
	_delete() {
		var _this20 = this;
		return _asyncToGenerator(function* () {
			_this20._deleted = true;
		})();
	}
	updateCurrentUser(userExtern) {
		var _this21 = this;
		return _asyncToGenerator(function* () {
			if (_isFirebaseServerApp(_this21.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(_this21));
			const user = userExtern ? getModularInstance(userExtern) : null;
			if (user) _assert(user.auth.config.apiKey === _this21.config.apiKey, _this21, "invalid-user-token");
			return _this21._updateCurrentUser(user && user._clone(_this21));
		})();
	}
	_updateCurrentUser(user, skipBeforeStateCallbacks = false) {
		var _this22 = this;
		return _asyncToGenerator(function* () {
			if (_this22._deleted) return;
			if (user) _assert(_this22.tenantId === user.tenantId, _this22, "tenant-id-mismatch");
			if (!skipBeforeStateCallbacks) yield _this22.beforeStateQueue.runMiddleware(user);
			return _this22.queue(_asyncToGenerator(function* () {
				yield _this22.directlySetCurrentUser(user);
				_this22.notifyAuthListeners();
			}));
		})();
	}
	signOut() {
		var _this23 = this;
		return _asyncToGenerator(function* () {
			if (_isFirebaseServerApp(_this23.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(_this23));
			yield _this23.beforeStateQueue.runMiddleware(null);
			if (_this23.redirectPersistenceManager || _this23._popupRedirectResolver) yield _this23._setRedirectUser(null);
			return _this23._updateCurrentUser(null, true);
		})();
	}
	setPersistence(persistence) {
		var _this24 = this;
		if (_isFirebaseServerApp(this.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
		return this.queue(_asyncToGenerator(function* () {
			yield _this24.assertedPersistence.setPersistence(_getInstance(persistence));
		}));
	}
	_getRecaptchaConfig() {
		if (this.tenantId == null) return this._agentRecaptchaConfig;
		else return this._tenantRecaptchaConfigs[this.tenantId];
	}
	validatePassword(password) {
		var _this25 = this;
		return _asyncToGenerator(function* () {
			if (!_this25._getPasswordPolicyInternal()) yield _this25._updatePasswordPolicy();
			const passwordPolicy = _this25._getPasswordPolicyInternal();
			if (passwordPolicy.schemaVersion !== _this25.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION) return Promise.reject(_this25._errorFactory.create("unsupported-password-policy-schema-version", {}));
			return passwordPolicy.validatePassword(password);
		})();
	}
	_getPasswordPolicyInternal() {
		if (this.tenantId === null) return this._projectPasswordPolicy;
		else return this._tenantPasswordPolicies[this.tenantId];
	}
	_updatePasswordPolicy() {
		var _this26 = this;
		return _asyncToGenerator(function* () {
			const passwordPolicy = new PasswordPolicyImpl(yield _getPasswordPolicy(_this26));
			if (_this26.tenantId === null) _this26._projectPasswordPolicy = passwordPolicy;
			else _this26._tenantPasswordPolicies[_this26.tenantId] = passwordPolicy;
		})();
	}
	_getPersistenceType() {
		return this.assertedPersistence.persistence.type;
	}
	_getPersistence() {
		return this.assertedPersistence.persistence;
	}
	_updateErrorMap(errorMap) {
		this._errorFactory = new ErrorFactory("auth", "Firebase", errorMap());
	}
	onAuthStateChanged(nextOrObserver, error, completed) {
		return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
	}
	beforeAuthStateChanged(callback, onAbort) {
		return this.beforeStateQueue.pushCallback(callback, onAbort);
	}
	onIdTokenChanged(nextOrObserver, error, completed) {
		return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
	}
	authStateReady() {
		return new Promise((resolve, reject) => {
			if (this.currentUser) resolve();
			else {
				const unsubscribe = this.onAuthStateChanged(() => {
					unsubscribe();
					resolve();
				}, reject);
			}
		});
	}
	/**
	* Revokes the given access token. Currently only supports Apple OAuth access tokens.
	*/
	revokeAccessToken(token) {
		var _this27 = this;
		return _asyncToGenerator(function* () {
			if (_this27.currentUser) {
				const request = {
					providerId: "apple.com",
					tokenType: "ACCESS_TOKEN",
					token,
					idToken: yield _this27.currentUser.getIdToken()
				};
				if (_this27.tenantId != null) request.tenantId = _this27.tenantId;
				yield revokeToken(_this27, request);
			}
		})();
	}
	toJSON() {
		var _a;
		return {
			apiKey: this.config.apiKey,
			authDomain: this.config.authDomain,
			appName: this.name,
			currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
		};
	}
	_setRedirectUser(user, popupRedirectResolver) {
		var _this28 = this;
		return _asyncToGenerator(function* () {
			const redirectManager = yield _this28.getOrInitRedirectPersistenceManager(popupRedirectResolver);
			return user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user);
		})();
	}
	getOrInitRedirectPersistenceManager(popupRedirectResolver) {
		var _this29 = this;
		return _asyncToGenerator(function* () {
			if (!_this29.redirectPersistenceManager) {
				const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || _this29._popupRedirectResolver;
				_assert(resolver, _this29, "argument-error");
				_this29.redirectPersistenceManager = yield PersistenceUserManager.create(_this29, [_getInstance(resolver._redirectPersistence)], "redirectUser");
				_this29.redirectUser = yield _this29.redirectPersistenceManager.getCurrentUser();
			}
			return _this29.redirectPersistenceManager;
		})();
	}
	_redirectUserForId(id) {
		var _this30 = this;
		return _asyncToGenerator(function* () {
			var _a, _b;
			if (_this30._isInitialized) yield _this30.queue(_asyncToGenerator(function* () {}));
			if (((_a = _this30._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) return _this30._currentUser;
			if (((_b = _this30.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) return _this30.redirectUser;
			return null;
		})();
	}
	_persistUserIfCurrent(user) {
		var _this31 = this;
		return _asyncToGenerator(function* () {
			if (user === _this31.currentUser) return _this31.queue(_asyncToGenerator(function* () {
				return _this31.directlySetCurrentUser(user);
			}));
		})();
	}
	/** Notifies listeners only if the user is current */
	_notifyListenersIfCurrent(user) {
		if (user === this.currentUser) this.notifyAuthListeners();
	}
	_key() {
		return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
	}
	_startProactiveRefresh() {
		this.isProactiveRefreshEnabled = true;
		if (this.currentUser) this._currentUser._startProactiveRefresh();
	}
	_stopProactiveRefresh() {
		this.isProactiveRefreshEnabled = false;
		if (this.currentUser) this._currentUser._stopProactiveRefresh();
	}
	/** Returns the current user cast as the internal type */
	get _currentUser() {
		return this.currentUser;
	}
	notifyAuthListeners() {
		var _a, _b;
		if (!this._isInitialized) return;
		this.idTokenSubscription.next(this.currentUser);
		const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
		if (this.lastNotifiedUid !== currentUid) {
			this.lastNotifiedUid = currentUid;
			this.authStateSubscription.next(this.currentUser);
		}
	}
	registerStateListener(subscription, nextOrObserver, error, completed) {
		if (this._deleted) return () => {};
		const cb = typeof nextOrObserver === "function" ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
		let isUnsubscribed = false;
		const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
		_assert(promise, this, "internal-error");
		promise.then(() => {
			if (isUnsubscribed) return;
			cb(this.currentUser);
		});
		if (typeof nextOrObserver === "function") {
			const unsubscribe = subscription.addObserver(nextOrObserver, error, completed);
			return () => {
				isUnsubscribed = true;
				unsubscribe();
			};
		} else {
			const unsubscribe = subscription.addObserver(nextOrObserver);
			return () => {
				isUnsubscribed = true;
				unsubscribe();
			};
		}
	}
	/**
	* Unprotected (from race conditions) method to set the current user. This
	* should only be called from within a queued callback. This is necessary
	* because the queue shouldn't rely on another queued callback.
	*/
	directlySetCurrentUser(user) {
		var _this32 = this;
		return _asyncToGenerator(function* () {
			if (_this32.currentUser && _this32.currentUser !== user) _this32._currentUser._stopProactiveRefresh();
			if (user && _this32.isProactiveRefreshEnabled) user._startProactiveRefresh();
			_this32.currentUser = user;
			if (user) yield _this32.assertedPersistence.setCurrentUser(user);
			else yield _this32.assertedPersistence.removeCurrentUser();
		})();
	}
	queue(action) {
		this.operations = this.operations.then(action, action);
		return this.operations;
	}
	get assertedPersistence() {
		_assert(this.persistenceManager, this, "internal-error");
		return this.persistenceManager;
	}
	_logFramework(framework) {
		if (!framework || this.frameworks.includes(framework)) return;
		this.frameworks.push(framework);
		this.frameworks.sort();
		this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
	}
	_getFrameworks() {
		return this.frameworks;
	}
	_getAdditionalHeaders() {
		var _this33 = this;
		return _asyncToGenerator(function* () {
			var _a;
			const headers = { ["X-Client-Version"]: _this33.clientVersion };
			if (_this33.app.options.appId) headers["X-Firebase-gmpid"] = _this33.app.options.appId;
			const heartbeatsHeader = yield (_a = _this33.heartbeatServiceProvider.getImmediate({ optional: true })) === null || _a === void 0 ? void 0 : _a.getHeartbeatsHeader();
			if (heartbeatsHeader) headers["X-Firebase-Client"] = heartbeatsHeader;
			const appCheckToken = yield _this33._getAppCheckToken();
			if (appCheckToken) headers["X-Firebase-AppCheck"] = appCheckToken;
			return headers;
		})();
	}
	_getAppCheckToken() {
		var _this34 = this;
		return _asyncToGenerator(function* () {
			var _a;
			if (_isFirebaseServerApp(_this34.app) && _this34.app.settings.appCheckToken) return _this34.app.settings.appCheckToken;
			const appCheckTokenResult = yield (_a = _this34.appCheckServiceProvider.getImmediate({ optional: true })) === null || _a === void 0 ? void 0 : _a.getToken();
			if (appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.error) _logWarn(`Error while retrieving App Check token: ${appCheckTokenResult.error}`);
			return appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.token;
		})();
	}
};
/**
* Method to be used to cast down to our private implementation of Auth.
* It will also handle unwrapping from the compat type if necessary
*
* @param auth Auth object passed in from developer
*/
function _castAuth(auth) {
	return getModularInstance(auth);
}
/** Helper class to wrap subscriber logic */
var Subscription = class {
	constructor(auth) {
		this.auth = auth;
		this.observer = null;
		this.addObserver = createSubscribe((observer) => this.observer = observer);
	}
	get next() {
		_assert(this.observer, this.auth, "internal-error");
		return this.observer.next.bind(this.observer);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var externalJSProvider = {
	loadJS() {
		return _asyncToGenerator(function* () {
			throw new Error("Unable to load external scripts");
		})();
	},
	recaptchaV2Script: "",
	recaptchaEnterpriseScript: "",
	gapiScript: ""
};
function _setExternalJSProvider(p) {
	externalJSProvider = p;
}
function _loadJS(url) {
	return externalJSProvider.loadJS(url);
}
function _recaptchaV2ScriptUrl() {
	return externalJSProvider.recaptchaV2Script;
}
function _recaptchaEnterpriseScriptUrl() {
	return externalJSProvider.recaptchaEnterpriseScript;
}
function _gapiScriptUrl() {
	return externalJSProvider.gapiScript;
}
function _generateCallbackName(prefix) {
	return `__${prefix}${Math.floor(Math.random() * 1e6)}`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _SOLVE_TIME_MS = 500;
var _EXPIRATION_TIME_MS = 6e4;
var _WIDGET_ID_START = 0xe8d4a51000;
var MockReCaptcha = class {
	constructor(auth) {
		this.auth = auth;
		this.counter = _WIDGET_ID_START;
		this._widgets = /* @__PURE__ */ new Map();
	}
	render(container, parameters) {
		const id = this.counter;
		this._widgets.set(id, new MockWidget(container, this.auth.name, parameters || {}));
		this.counter++;
		return id;
	}
	reset(optWidgetId) {
		var _a;
		const id = optWidgetId || _WIDGET_ID_START;
		(_a = this._widgets.get(id)) === null || _a === void 0 || _a.delete();
		this._widgets.delete(id);
	}
	getResponse(optWidgetId) {
		var _a;
		const id = optWidgetId || _WIDGET_ID_START;
		return ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.getResponse()) || "";
	}
	execute(optWidgetId) {
		var _this35 = this;
		return _asyncToGenerator(function* () {
			var _a;
			const id = optWidgetId || _WIDGET_ID_START;
			(_a = _this35._widgets.get(id)) === null || _a === void 0 || _a.execute();
			return "";
		})();
	}
};
var MockGreCAPTCHATopLevel = class {
	constructor() {
		this.enterprise = new MockGreCAPTCHA();
	}
	ready(callback) {
		callback();
	}
	execute(_siteKey, _options) {
		return Promise.resolve("token");
	}
	render(_container, _parameters) {
		return "";
	}
};
var MockGreCAPTCHA = class {
	ready(callback) {
		callback();
	}
	execute(_siteKey, _options) {
		return Promise.resolve("token");
	}
	render(_container, _parameters) {
		return "";
	}
};
var MockWidget = class {
	constructor(containerOrId, appName, params) {
		this.params = params;
		this.timerId = null;
		this.deleted = false;
		this.responseToken = null;
		this.clickHandler = () => {
			this.execute();
		};
		const container = typeof containerOrId === "string" ? document.getElementById(containerOrId) : containerOrId;
		_assert(container, "argument-error", { appName });
		this.container = container;
		this.isVisible = this.params.size !== "invisible";
		if (this.isVisible) this.execute();
		else this.container.addEventListener("click", this.clickHandler);
	}
	getResponse() {
		this.checkIfDeleted();
		return this.responseToken;
	}
	delete() {
		this.checkIfDeleted();
		this.deleted = true;
		if (this.timerId) {
			clearTimeout(this.timerId);
			this.timerId = null;
		}
		this.container.removeEventListener("click", this.clickHandler);
	}
	execute() {
		this.checkIfDeleted();
		if (this.timerId) return;
		this.timerId = window.setTimeout(() => {
			this.responseToken = generateRandomAlphaNumericString(50);
			const { callback, "expired-callback": expiredCallback } = this.params;
			if (callback) try {
				callback(this.responseToken);
			} catch (e) {}
			this.timerId = window.setTimeout(() => {
				this.timerId = null;
				this.responseToken = null;
				if (expiredCallback) try {
					expiredCallback();
				} catch (e) {}
				if (this.isVisible) this.execute();
			}, _EXPIRATION_TIME_MS);
		}, _SOLVE_TIME_MS);
	}
	checkIfDeleted() {
		if (this.deleted) throw new Error("reCAPTCHA mock was already deleted!");
	}
};
function generateRandomAlphaNumericString(len) {
	const chars = [];
	const allowedChars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (let i = 0; i < len; i++) chars.push(allowedChars.charAt(Math.floor(Math.random() * 62)));
	return chars.join("");
}
var RECAPTCHA_ENTERPRISE_VERIFIER_TYPE = "recaptcha-enterprise";
var FAKE_TOKEN = "NO_RECAPTCHA";
var RecaptchaEnterpriseVerifier = class {
	/**
	*
	* @param authExtern - The corresponding Firebase {@link Auth} instance.
	*
	*/
	constructor(authExtern) {
		/**
		* Identifies the type of application verifier (e.g. "recaptcha-enterprise").
		*/
		this.type = RECAPTCHA_ENTERPRISE_VERIFIER_TYPE;
		this.auth = _castAuth(authExtern);
	}
	/**
	* Executes the verification process.
	*
	* @returns A Promise for a token that can be used to assert the validity of a request.
	*/
	verify(action = "verify", forceRefresh = false) {
		var _this36 = this;
		return _asyncToGenerator(function* () {
			function retrieveSiteKey(_x39) {
				return _retrieveSiteKey.apply(this, arguments);
			}
			function _retrieveSiteKey() {
				_retrieveSiteKey = _asyncToGenerator(function* (auth) {
					if (!forceRefresh) {
						if (auth.tenantId == null && auth._agentRecaptchaConfig != null) return auth._agentRecaptchaConfig.siteKey;
						if (auth.tenantId != null && auth._tenantRecaptchaConfigs[auth.tenantId] !== void 0) return auth._tenantRecaptchaConfigs[auth.tenantId].siteKey;
					}
					return new Promise(function() {
						var _ref3 = _asyncToGenerator(function* (resolve, reject) {
							getRecaptchaConfig(auth, {
								clientType: "CLIENT_TYPE_WEB",
								version: "RECAPTCHA_ENTERPRISE"
							}).then((response) => {
								if (response.recaptchaKey === void 0) reject(/* @__PURE__ */ new Error("recaptcha Enterprise site key undefined"));
								else {
									const config = new RecaptchaConfig(response);
									if (auth.tenantId == null) auth._agentRecaptchaConfig = config;
									else auth._tenantRecaptchaConfigs[auth.tenantId] = config;
									return resolve(config.siteKey);
								}
							}).catch((error) => {
								reject(error);
							});
						});
						return function(_x37, _x38) {
							return _ref3.apply(this, arguments);
						};
					}());
				});
				return _retrieveSiteKey.apply(this, arguments);
			}
			function retrieveRecaptchaToken(siteKey, resolve, reject) {
				const grecaptcha = window.grecaptcha;
				if (isEnterprise(grecaptcha)) grecaptcha.enterprise.ready(() => {
					grecaptcha.enterprise.execute(siteKey, { action }).then((token) => {
						resolve(token);
					}).catch(() => {
						resolve(FAKE_TOKEN);
					});
				});
				else reject(Error("No reCAPTCHA enterprise script loaded."));
			}
			if (_this36.auth.settings.appVerificationDisabledForTesting) return new MockGreCAPTCHATopLevel().execute("siteKey", { action: "verify" });
			return new Promise((resolve, reject) => {
				retrieveSiteKey(_this36.auth).then((siteKey) => {
					if (!forceRefresh && isEnterprise(window.grecaptcha)) retrieveRecaptchaToken(siteKey, resolve, reject);
					else {
						if (typeof window === "undefined") {
							reject(/* @__PURE__ */ new Error("RecaptchaVerifier is only supported in browser"));
							return;
						}
						let url = _recaptchaEnterpriseScriptUrl();
						if (url.length !== 0) url += siteKey;
						_loadJS(url).then(() => {
							retrieveRecaptchaToken(siteKey, resolve, reject);
						}).catch((error) => {
							reject(error);
						});
					}
				}).catch((error) => {
					reject(error);
				});
			});
		})();
	}
};
function injectRecaptchaFields(_x40, _x41, _x42) {
	return _injectRecaptchaFields.apply(this, arguments);
}
function _injectRecaptchaFields() {
	_injectRecaptchaFields = _asyncToGenerator(function* (auth, request, action, isCaptchaResp = false, isFakeToken = false) {
		const verifier = new RecaptchaEnterpriseVerifier(auth);
		let captchaResponse;
		if (isFakeToken) captchaResponse = FAKE_TOKEN;
		else try {
			captchaResponse = yield verifier.verify(action);
		} catch (error) {
			captchaResponse = yield verifier.verify(action, true);
		}
		const newRequest = Object.assign({}, request);
		if (action === "mfaSmsEnrollment" || action === "mfaSmsSignIn") {
			if ("phoneEnrollmentInfo" in newRequest) {
				const phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
				const recaptchaToken = newRequest.phoneEnrollmentInfo.recaptchaToken;
				Object.assign(newRequest, { "phoneEnrollmentInfo": {
					phoneNumber,
					recaptchaToken,
					captchaResponse,
					"clientType": "CLIENT_TYPE_WEB",
					"recaptchaVersion": "RECAPTCHA_ENTERPRISE"
				} });
			} else if ("phoneSignInInfo" in newRequest) {
				const recaptchaToken = newRequest.phoneSignInInfo.recaptchaToken;
				Object.assign(newRequest, { "phoneSignInInfo": {
					recaptchaToken,
					captchaResponse,
					"clientType": "CLIENT_TYPE_WEB",
					"recaptchaVersion": "RECAPTCHA_ENTERPRISE"
				} });
			}
			return newRequest;
		}
		if (!isCaptchaResp) Object.assign(newRequest, { captchaResponse });
		else Object.assign(newRequest, { "captchaResp": captchaResponse });
		Object.assign(newRequest, { "clientType": "CLIENT_TYPE_WEB" });
		Object.assign(newRequest, { "recaptchaVersion": "RECAPTCHA_ENTERPRISE" });
		return newRequest;
	});
	return _injectRecaptchaFields.apply(this, arguments);
}
function handleRecaptchaFlow(_x45, _x46, _x47, _x48, _x49) {
	return _handleRecaptchaFlow.apply(this, arguments);
}
function _handleRecaptchaFlow() {
	_handleRecaptchaFlow = _asyncToGenerator(function* (authInstance, request, actionName, actionMethod, recaptchaAuthProvider) {
		var _a, _b;
		if (recaptchaAuthProvider === "EMAIL_PASSWORD_PROVIDER") if ((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")) return actionMethod(authInstance, yield injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode"));
		else return actionMethod(authInstance, request).catch(function() {
			var _ref4 = _asyncToGenerator(function* (error) {
				if (error.code === `auth/missing-recaptcha-token`) {
					console.log(`${actionName} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);
					return actionMethod(authInstance, yield injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode"));
				} else return Promise.reject(error);
			});
			return function(_x43) {
				return _ref4.apply(this, arguments);
			};
		}());
		else if (recaptchaAuthProvider === "PHONE_PROVIDER") if ((_b = authInstance._getRecaptchaConfig()) === null || _b === void 0 ? void 0 : _b.isProviderEnabled("PHONE_PROVIDER")) return actionMethod(authInstance, yield injectRecaptchaFields(authInstance, request, actionName)).catch(function() {
			var _ref5 = _asyncToGenerator(function* (error) {
				var _a;
				if (((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.getProviderEnforcementState("PHONE_PROVIDER")) === "AUDIT") {
					if (error.code === `auth/missing-recaptcha-token` || error.code === `auth/invalid-app-credential`) {
						console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${actionName} flow.`);
						return actionMethod(authInstance, yield injectRecaptchaFields(authInstance, request, actionName, false, true));
					}
				}
				return Promise.reject(error);
			});
			return function(_x44) {
				return _ref5.apply(this, arguments);
			};
		}());
		else return actionMethod(authInstance, yield injectRecaptchaFields(authInstance, request, actionName, false, true));
		else return Promise.reject(recaptchaAuthProvider + " provider is not supported.");
	});
	return _handleRecaptchaFlow.apply(this, arguments);
}
function _initializeRecaptchaConfig(_x50) {
	return _initializeRecaptchaConfig2.apply(this, arguments);
}
function _initializeRecaptchaConfig2() {
	_initializeRecaptchaConfig2 = _asyncToGenerator(function* (auth) {
		const authInternal = _castAuth(auth);
		const config = new RecaptchaConfig(yield getRecaptchaConfig(authInternal, {
			clientType: "CLIENT_TYPE_WEB",
			version: "RECAPTCHA_ENTERPRISE"
		}));
		if (authInternal.tenantId == null) authInternal._agentRecaptchaConfig = config;
		else authInternal._tenantRecaptchaConfigs[authInternal.tenantId] = config;
		if (config.isAnyProviderEnabled()) new RecaptchaEnterpriseVerifier(authInternal).verify();
	});
	return _initializeRecaptchaConfig2.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Initializes an {@link Auth} instance with fine-grained control over
* {@link Dependencies}.
*
* @remarks
*
* This function allows more control over the {@link Auth} instance than
* {@link getAuth}. `getAuth` uses platform-specific defaults to supply
* the {@link Dependencies}. In general, `getAuth` is the easiest way to
* initialize Auth and works for most use cases. Use `initializeAuth` if you
* need control over which persistence layer is used, or to minimize bundle
* size if you're not using either `signInWithPopup` or `signInWithRedirect`.
*
* For example, if your app only uses anonymous accounts and you only want
* accounts saved for the current session, initialize `Auth` with:
*
* ```js
* const auth = initializeAuth(app, {
*   persistence: browserSessionPersistence,
*   popupRedirectResolver: undefined,
* });
* ```
*
* @public
*/
function initializeAuth(app, deps) {
	const provider = _getProvider(app, "auth");
	if (provider.isInitialized()) {
		const auth = provider.getImmediate();
		if (deepEqual(provider.getOptions(), deps !== null && deps !== void 0 ? deps : {})) return auth;
		else _fail(auth, "already-initialized");
	}
	return provider.initialize({ options: deps });
}
function _initializeAuthInstance(auth, deps) {
	const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
	const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
	if (deps === null || deps === void 0 ? void 0 : deps.errorMap) auth._updateErrorMap(deps.errorMap);
	auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}
/**
* Changes the {@link Auth} instance to communicate with the Firebase Auth Emulator, instead of production
* Firebase Auth services.
*
* @remarks
* This must be called synchronously immediately following the first call to
* {@link initializeAuth}.  Do not use with production credentials as emulator
* traffic is not encrypted.
*
*
* @example
* ```javascript
* connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
* ```
*
* @param auth - The {@link Auth} instance.
* @param url - The URL at which the emulator is running (eg, 'http://localhost:9099').
* @param options - Optional. `options.disableWarnings` defaults to `false`. Set it to
* `true` to disable the warning banner attached to the DOM.
*
* @public
*/
function connectAuthEmulator(auth, url, options) {
	const authInternal = _castAuth(auth);
	_assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme");
	const disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
	const protocol = extractProtocol(url);
	const { host, port } = extractHostAndPort(url);
	const portStr = port === null ? "" : `:${port}`;
	const emulator = { url: `${protocol}//${host}${portStr}/` };
	const emulatorConfig = Object.freeze({
		host,
		port,
		protocol: protocol.replace(":", ""),
		options: Object.freeze({ disableWarnings })
	});
	if (!authInternal._canInitEmulator) {
		_assert(authInternal.config.emulator && authInternal.emulatorConfig, authInternal, "emulator-config-failed");
		_assert(deepEqual(emulator, authInternal.config.emulator) && deepEqual(emulatorConfig, authInternal.emulatorConfig), authInternal, "emulator-config-failed");
		return;
	}
	authInternal.config.emulator = emulator;
	authInternal.emulatorConfig = emulatorConfig;
	authInternal.settings.appVerificationDisabledForTesting = true;
	if (isCloudWorkstation(host)) {
		pingServer(`${protocol}//${host}${portStr}`);
		updateEmulatorBanner("Auth", true);
	} else if (!disableWarnings) emitEmulatorWarning();
}
function extractProtocol(url) {
	const protocolEnd = url.indexOf(":");
	return protocolEnd < 0 ? "" : url.substr(0, protocolEnd + 1);
}
function extractHostAndPort(url) {
	const protocol = extractProtocol(url);
	const authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length));
	if (!authority) return {
		host: "",
		port: null
	};
	const hostAndPort = authority[2].split("@").pop() || "";
	const bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
	if (bracketedIPv6) {
		const host = bracketedIPv6[1];
		return {
			host,
			port: parsePort(hostAndPort.substr(host.length + 1))
		};
	} else {
		const [host, port] = hostAndPort.split(":");
		return {
			host,
			port: parsePort(port)
		};
	}
}
function parsePort(portStr) {
	if (!portStr) return null;
	const port = Number(portStr);
	if (isNaN(port)) return null;
	return port;
}
function emitEmulatorWarning() {
	function attachBanner() {
		const el = document.createElement("p");
		const sty = el.style;
		el.innerText = "Running in emulator mode. Do not use with production credentials.";
		sty.position = "fixed";
		sty.width = "100%";
		sty.backgroundColor = "#ffffff";
		sty.border = ".1em solid #000000";
		sty.color = "#b50000";
		sty.bottom = "0px";
		sty.left = "0px";
		sty.margin = "0px";
		sty.zIndex = "10000";
		sty.textAlign = "center";
		el.classList.add("firebase-emulator-warning");
		document.body.appendChild(el);
	}
	if (typeof console !== "undefined" && typeof console.info === "function") console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
	if (typeof window !== "undefined" && typeof document !== "undefined") if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", attachBanner);
	else attachBanner();
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface that represents the credentials returned by an {@link AuthProvider}.
*
* @remarks
* Implementations specify the details about each auth provider's credential requirements.
*
* @public
*/
var AuthCredential = class {
	/** @internal */
	constructor(providerId, signInMethod) {
		this.providerId = providerId;
		this.signInMethod = signInMethod;
	}
	/**
	* Returns a JSON-serializable representation of this object.
	*
	* @returns a JSON-serializable representation of this object.
	*/
	toJSON() {
		return debugFail("not implemented");
	}
	/** @internal */
	_getIdTokenResponse(_auth) {
		return debugFail("not implemented");
	}
	/** @internal */
	_linkToIdToken(_auth, _idToken) {
		return debugFail("not implemented");
	}
	/** @internal */
	_getReauthenticationResolver(_auth) {
		return debugFail("not implemented");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function resetPassword(_x51, _x52) {
	return _resetPassword.apply(this, arguments);
}
function _resetPassword() {
	_resetPassword = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:resetPassword", _addTidIfNecessary(auth, request));
	});
	return _resetPassword.apply(this, arguments);
}
function updateEmailPassword(_x53, _x54) {
	return _updateEmailPassword.apply(this, arguments);
}
function _updateEmailPassword() {
	_updateEmailPassword = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:update", request);
	});
	return _updateEmailPassword.apply(this, arguments);
}
function linkEmailPassword(_x55, _x56) {
	return _linkEmailPassword.apply(this, arguments);
}
function _linkEmailPassword() {
	_linkEmailPassword = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:signUp", request);
	});
	return _linkEmailPassword.apply(this, arguments);
}
function applyActionCode$1(_x57, _x58) {
	return _applyActionCode$.apply(this, arguments);
}
function _applyActionCode$() {
	_applyActionCode$ = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:update", _addTidIfNecessary(auth, request));
	});
	return _applyActionCode$.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function signInWithPassword(_x59, _x60) {
	return _signInWithPassword.apply(this, arguments);
}
function _signInWithPassword() {
	_signInWithPassword = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(auth, request));
	});
	return _signInWithPassword.apply(this, arguments);
}
function sendOobCode(_x61, _x62) {
	return _sendOobCode.apply(this, arguments);
}
function _sendOobCode() {
	_sendOobCode = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:sendOobCode", _addTidIfNecessary(auth, request));
	});
	return _sendOobCode.apply(this, arguments);
}
function sendEmailVerification$1(_x63, _x64) {
	return _sendEmailVerification$.apply(this, arguments);
}
function _sendEmailVerification$() {
	_sendEmailVerification$ = _asyncToGenerator(function* (auth, request) {
		return sendOobCode(auth, request);
	});
	return _sendEmailVerification$.apply(this, arguments);
}
function sendPasswordResetEmail$1(_x65, _x66) {
	return _sendPasswordResetEmail$.apply(this, arguments);
}
function _sendPasswordResetEmail$() {
	_sendPasswordResetEmail$ = _asyncToGenerator(function* (auth, request) {
		return sendOobCode(auth, request);
	});
	return _sendPasswordResetEmail$.apply(this, arguments);
}
function sendSignInLinkToEmail$1(_x67, _x68) {
	return _sendSignInLinkToEmail$.apply(this, arguments);
}
function _sendSignInLinkToEmail$() {
	_sendSignInLinkToEmail$ = _asyncToGenerator(function* (auth, request) {
		return sendOobCode(auth, request);
	});
	return _sendSignInLinkToEmail$.apply(this, arguments);
}
function verifyAndChangeEmail(_x69, _x70) {
	return _verifyAndChangeEmail.apply(this, arguments);
}
function _verifyAndChangeEmail() {
	_verifyAndChangeEmail = _asyncToGenerator(function* (auth, request) {
		return sendOobCode(auth, request);
	});
	return _verifyAndChangeEmail.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function signInWithEmailLink$1(_x71, _x72) {
	return _signInWithEmailLink$.apply(this, arguments);
}
function _signInWithEmailLink$() {
	_signInWithEmailLink$ = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
	});
	return _signInWithEmailLink$.apply(this, arguments);
}
function signInWithEmailLinkForLinking(_x73, _x74) {
	return _signInWithEmailLinkForLinking.apply(this, arguments);
}
function _signInWithEmailLinkForLinking() {
	_signInWithEmailLinkForLinking = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
	});
	return _signInWithEmailLinkForLinking.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface that represents the credentials returned by {@link EmailAuthProvider} for
* {@link ProviderId}.PASSWORD
*
* @remarks
* Covers both {@link SignInMethod}.EMAIL_PASSWORD and
* {@link SignInMethod}.EMAIL_LINK.
*
* @public
*/
var EmailAuthCredential = class EmailAuthCredential extends AuthCredential {
	/** @internal */
	constructor(_email, _password, signInMethod, _tenantId = null) {
		super("password", signInMethod);
		this._email = _email;
		this._password = _password;
		this._tenantId = _tenantId;
	}
	/** @internal */
	static _fromEmailAndPassword(email, password) {
		return new EmailAuthCredential(email, password, "password");
	}
	/** @internal */
	static _fromEmailAndCode(email, oobCode, tenantId = null) {
		return new EmailAuthCredential(email, oobCode, "emailLink", tenantId);
	}
	/** {@inheritdoc AuthCredential.toJSON} */
	toJSON() {
		return {
			email: this._email,
			password: this._password,
			signInMethod: this.signInMethod,
			tenantId: this._tenantId
		};
	}
	/**
	* Static method to deserialize a JSON representation of an object into an {@link  AuthCredential}.
	*
	* @param json - Either `object` or the stringified representation of the object. When string is
	* provided, `JSON.parse` would be called first.
	*
	* @returns If the JSON input does not represent an {@link AuthCredential}, null is returned.
	*/
	static fromJSON(json) {
		const obj = typeof json === "string" ? JSON.parse(json) : json;
		if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
			if (obj.signInMethod === "password") return this._fromEmailAndPassword(obj.email, obj.password);
			else if (obj.signInMethod === "emailLink") return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
		}
		return null;
	}
	/** @internal */
	_getIdTokenResponse(auth) {
		var _this37 = this;
		return _asyncToGenerator(function* () {
			switch (_this37.signInMethod) {
				case "password": return handleRecaptchaFlow(auth, {
					returnSecureToken: true,
					email: _this37._email,
					password: _this37._password,
					clientType: "CLIENT_TYPE_WEB"
				}, "signInWithPassword", signInWithPassword, "EMAIL_PASSWORD_PROVIDER");
				case "emailLink": return signInWithEmailLink$1(auth, {
					email: _this37._email,
					oobCode: _this37._password
				});
				default: _fail(auth, "internal-error");
			}
		})();
	}
	/** @internal */
	_linkToIdToken(auth, idToken) {
		var _this38 = this;
		return _asyncToGenerator(function* () {
			switch (_this38.signInMethod) {
				case "password": return handleRecaptchaFlow(auth, {
					idToken,
					returnSecureToken: true,
					email: _this38._email,
					password: _this38._password,
					clientType: "CLIENT_TYPE_WEB"
				}, "signUpPassword", linkEmailPassword, "EMAIL_PASSWORD_PROVIDER");
				case "emailLink": return signInWithEmailLinkForLinking(auth, {
					idToken,
					email: _this38._email,
					oobCode: _this38._password
				});
				default: _fail(auth, "internal-error");
			}
		})();
	}
	/** @internal */
	_getReauthenticationResolver(auth) {
		return this._getIdTokenResponse(auth);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function signInWithIdp(_x75, _x76) {
	return _signInWithIdp.apply(this, arguments);
}
function _signInWithIdp() {
	_signInWithIdp = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(auth, request));
	});
	return _signInWithIdp.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IDP_REQUEST_URI$1 = "http://localhost";
/**
* Represents the OAuth credentials returned by an {@link OAuthProvider}.
*
* @remarks
* Implementations specify the details about each auth provider's credential requirements.
*
* @public
*/
var OAuthCredential = class OAuthCredential extends AuthCredential {
	constructor() {
		super(...arguments);
		this.pendingToken = null;
	}
	/** @internal */
	static _fromParams(params) {
		const cred = new OAuthCredential(params.providerId, params.signInMethod);
		if (params.idToken || params.accessToken) {
			if (params.idToken) cred.idToken = params.idToken;
			if (params.accessToken) cred.accessToken = params.accessToken;
			if (params.nonce && !params.pendingToken) cred.nonce = params.nonce;
			if (params.pendingToken) cred.pendingToken = params.pendingToken;
		} else if (params.oauthToken && params.oauthTokenSecret) {
			cred.accessToken = params.oauthToken;
			cred.secret = params.oauthTokenSecret;
		} else _fail("argument-error");
		return cred;
	}
	/** {@inheritdoc AuthCredential.toJSON}  */
	toJSON() {
		return {
			idToken: this.idToken,
			accessToken: this.accessToken,
			secret: this.secret,
			nonce: this.nonce,
			pendingToken: this.pendingToken,
			providerId: this.providerId,
			signInMethod: this.signInMethod
		};
	}
	/**
	* Static method to deserialize a JSON representation of an object into an
	* {@link  AuthCredential}.
	*
	* @param json - Input can be either Object or the stringified representation of the object.
	* When string is provided, JSON.parse would be called first.
	*
	* @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
	*/
	static fromJSON(json) {
		const obj = typeof json === "string" ? JSON.parse(json) : json;
		const { providerId, signInMethod } = obj, rest = __rest(obj, ["providerId", "signInMethod"]);
		if (!providerId || !signInMethod) return null;
		const cred = new OAuthCredential(providerId, signInMethod);
		cred.idToken = rest.idToken || void 0;
		cred.accessToken = rest.accessToken || void 0;
		cred.secret = rest.secret;
		cred.nonce = rest.nonce;
		cred.pendingToken = rest.pendingToken || null;
		return cred;
	}
	/** @internal */
	_getIdTokenResponse(auth) {
		return signInWithIdp(auth, this.buildRequest());
	}
	/** @internal */
	_linkToIdToken(auth, idToken) {
		const request = this.buildRequest();
		request.idToken = idToken;
		return signInWithIdp(auth, request);
	}
	/** @internal */
	_getReauthenticationResolver(auth) {
		const request = this.buildRequest();
		request.autoCreate = false;
		return signInWithIdp(auth, request);
	}
	buildRequest() {
		const request = {
			requestUri: IDP_REQUEST_URI$1,
			returnSecureToken: true
		};
		if (this.pendingToken) request.pendingToken = this.pendingToken;
		else {
			const postBody = {};
			if (this.idToken) postBody["id_token"] = this.idToken;
			if (this.accessToken) postBody["access_token"] = this.accessToken;
			if (this.secret) postBody["oauth_token_secret"] = this.secret;
			postBody["providerId"] = this.providerId;
			if (this.nonce && !this.pendingToken) postBody["nonce"] = this.nonce;
			request.postBody = querystring(postBody);
		}
		return request;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function sendPhoneVerificationCode(_x77, _x78) {
	return _sendPhoneVerificationCode.apply(this, arguments);
}
function _sendPhoneVerificationCode() {
	_sendPhoneVerificationCode = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:sendVerificationCode", _addTidIfNecessary(auth, request));
	});
	return _sendPhoneVerificationCode.apply(this, arguments);
}
function signInWithPhoneNumber$1(_x79, _x80) {
	return _signInWithPhoneNumber$.apply(this, arguments);
}
function _signInWithPhoneNumber$() {
	_signInWithPhoneNumber$ = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
	});
	return _signInWithPhoneNumber$.apply(this, arguments);
}
function linkWithPhoneNumber$1(_x81, _x82) {
	return _linkWithPhoneNumber$.apply(this, arguments);
}
function _linkWithPhoneNumber$() {
	_linkWithPhoneNumber$ = _asyncToGenerator(function* (auth, request) {
		const response = yield _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
		if (response.temporaryProof) throw _makeTaggedError(auth, "account-exists-with-different-credential", response);
		return response;
	});
	return _linkWithPhoneNumber$.apply(this, arguments);
}
var VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = { ["USER_NOT_FOUND"]: "user-not-found" };
function verifyPhoneNumberForExisting(_x83, _x84) {
	return _verifyPhoneNumberForExisting.apply(this, arguments);
}
function _verifyPhoneNumberForExisting() {
	_verifyPhoneNumberForExisting = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, Object.assign(Object.assign({}, request), { operation: "REAUTH" })), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_);
	});
	return _verifyPhoneNumberForExisting.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Represents the credentials returned by {@link PhoneAuthProvider}.
*
* @public
*/
var PhoneAuthCredential = class PhoneAuthCredential extends AuthCredential {
	constructor(params) {
		super("phone", "phone");
		this.params = params;
	}
	/** @internal */
	static _fromVerification(verificationId, verificationCode) {
		return new PhoneAuthCredential({
			verificationId,
			verificationCode
		});
	}
	/** @internal */
	static _fromTokenResponse(phoneNumber, temporaryProof) {
		return new PhoneAuthCredential({
			phoneNumber,
			temporaryProof
		});
	}
	/** @internal */
	_getIdTokenResponse(auth) {
		return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
	}
	/** @internal */
	_linkToIdToken(auth, idToken) {
		return linkWithPhoneNumber$1(auth, Object.assign({ idToken }, this._makeVerificationRequest()));
	}
	/** @internal */
	_getReauthenticationResolver(auth) {
		return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
	}
	/** @internal */
	_makeVerificationRequest() {
		const { temporaryProof, phoneNumber, verificationId, verificationCode } = this.params;
		if (temporaryProof && phoneNumber) return {
			temporaryProof,
			phoneNumber
		};
		return {
			sessionInfo: verificationId,
			code: verificationCode
		};
	}
	/** {@inheritdoc AuthCredential.toJSON} */
	toJSON() {
		const obj = { providerId: this.providerId };
		if (this.params.phoneNumber) obj.phoneNumber = this.params.phoneNumber;
		if (this.params.temporaryProof) obj.temporaryProof = this.params.temporaryProof;
		if (this.params.verificationCode) obj.verificationCode = this.params.verificationCode;
		if (this.params.verificationId) obj.verificationId = this.params.verificationId;
		return obj;
	}
	/** Generates a phone credential based on a plain object or a JSON string. */
	static fromJSON(json) {
		if (typeof json === "string") json = JSON.parse(json);
		const { verificationId, verificationCode, phoneNumber, temporaryProof } = json;
		if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) return null;
		return new PhoneAuthCredential({
			verificationId,
			verificationCode,
			phoneNumber,
			temporaryProof
		});
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Maps the mode string in action code URL to Action Code Info operation.
*
* @param mode
*/
function parseMode(mode) {
	switch (mode) {
		case "recoverEmail": return "RECOVER_EMAIL";
		case "resetPassword": return "PASSWORD_RESET";
		case "signIn": return "EMAIL_SIGNIN";
		case "verifyEmail": return "VERIFY_EMAIL";
		case "verifyAndChangeEmail": return "VERIFY_AND_CHANGE_EMAIL";
		case "revertSecondFactorAddition": return "REVERT_SECOND_FACTOR_ADDITION";
		default: return null;
	}
}
/**
* Helper to parse FDL links
*
* @param url
*/
function parseDeepLink(url) {
	const link = querystringDecode(extractQuerystring(url))["link"];
	const doubleDeepLink = link ? querystringDecode(extractQuerystring(link))["deep_link_id"] : null;
	const iOSDeepLink = querystringDecode(extractQuerystring(url))["deep_link_id"];
	return (iOSDeepLink ? querystringDecode(extractQuerystring(iOSDeepLink))["link"] : null) || iOSDeepLink || doubleDeepLink || link || url;
}
/**
* A utility class to parse email action URLs such as password reset, email verification,
* email link sign in, etc.
*
* @public
*/
var ActionCodeURL = class ActionCodeURL {
	/**
	* @param actionLink - The link from which to extract the URL.
	* @returns The {@link ActionCodeURL} object, or null if the link is invalid.
	*
	* @internal
	*/
	constructor(actionLink) {
		var _a, _b, _c, _d, _e, _f;
		const searchParams = querystringDecode(extractQuerystring(actionLink));
		const apiKey = (_a = searchParams["apiKey"]) !== null && _a !== void 0 ? _a : null;
		const code = (_b = searchParams["oobCode"]) !== null && _b !== void 0 ? _b : null;
		const operation = parseMode((_c = searchParams["mode"]) !== null && _c !== void 0 ? _c : null);
		_assert(apiKey && code && operation, "argument-error");
		this.apiKey = apiKey;
		this.operation = operation;
		this.code = code;
		this.continueUrl = (_d = searchParams["continueUrl"]) !== null && _d !== void 0 ? _d : null;
		this.languageCode = (_e = searchParams["lang"]) !== null && _e !== void 0 ? _e : null;
		this.tenantId = (_f = searchParams["tenantId"]) !== null && _f !== void 0 ? _f : null;
	}
	/**
	* Parses the email action link string and returns an {@link ActionCodeURL} if the link is valid,
	* otherwise returns null.
	*
	* @param link  - The email action link string.
	* @returns The {@link ActionCodeURL} object, or null if the link is invalid.
	*
	* @public
	*/
	static parseLink(link) {
		const actionLink = parseDeepLink(link);
		try {
			return new ActionCodeURL(actionLink);
		} catch (_a) {
			return null;
		}
	}
};
/**
* Parses the email action link string and returns an {@link ActionCodeURL} if
* the link is valid, otherwise returns null.
*
* @public
*/
function parseActionCodeURL(link) {
	return ActionCodeURL.parseLink(link);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating {@link EmailAuthCredential}.
*
* @public
*/
var EmailAuthProvider = class EmailAuthProvider {
	constructor() {
		/**
		* Always set to {@link ProviderId}.PASSWORD, even for email link.
		*/
		this.providerId = EmailAuthProvider.PROVIDER_ID;
	}
	/**
	* Initialize an {@link AuthCredential} using an email and password.
	*
	* @example
	* ```javascript
	* const authCredential = EmailAuthProvider.credential(email, password);
	* const userCredential = await signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* ```javascript
	* const userCredential = await signInWithEmailAndPassword(auth, email, password);
	* ```
	*
	* @param email - Email address.
	* @param password - User account password.
	* @returns The auth provider credential.
	*/
	static credential(email, password) {
		return EmailAuthCredential._fromEmailAndPassword(email, password);
	}
	/**
	* Initialize an {@link AuthCredential} using an email and an email link after a sign in with
	* email link operation.
	*
	* @example
	* ```javascript
	* const authCredential = EmailAuthProvider.credentialWithLink(auth, email, emailLink);
	* const userCredential = await signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* ```javascript
	* await sendSignInLinkToEmail(auth, email);
	* // Obtain emailLink from user.
	* const userCredential = await signInWithEmailLink(auth, email, emailLink);
	* ```
	*
	* @param auth - The {@link Auth} instance used to verify the link.
	* @param email - Email address.
	* @param emailLink - Sign-in email link.
	* @returns - The auth provider credential.
	*/
	static credentialWithLink(email, emailLink) {
		const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
		_assert(actionCodeUrl, "argument-error");
		return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
	}
};
/**
* Always set to {@link ProviderId}.PASSWORD, even for email link.
*/
EmailAuthProvider.PROVIDER_ID = "password";
/**
* Always set to {@link SignInMethod}.EMAIL_PASSWORD.
*/
EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
/**
* Always set to {@link SignInMethod}.EMAIL_LINK.
*/
EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* The base class for all Federated providers (OAuth (including OIDC), SAML).
*
* This class is not meant to be instantiated directly.
*
* @public
*/
var FederatedAuthProvider = class {
	/**
	* Constructor for generic OAuth providers.
	*
	* @param providerId - Provider for which credentials should be generated.
	*/
	constructor(providerId) {
		this.providerId = providerId;
		/** @internal */
		this.defaultLanguageCode = null;
		/** @internal */
		this.customParameters = {};
	}
	/**
	* Set the language gode.
	*
	* @param languageCode - language code
	*/
	setDefaultLanguage(languageCode) {
		this.defaultLanguageCode = languageCode;
	}
	/**
	* Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
	* operations.
	*
	* @remarks
	* For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
	* `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
	*
	* @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
	*/
	setCustomParameters(customOAuthParameters) {
		this.customParameters = customOAuthParameters;
		return this;
	}
	/**
	* Retrieve the current list of {@link CustomParameters}.
	*/
	getCustomParameters() {
		return this.customParameters;
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Common code to all OAuth providers. This is separate from the
* {@link OAuthProvider} so that child providers (like
* {@link GoogleAuthProvider}) don't inherit the `credential` instance method.
* Instead, they rely on a static `credential` method.
*/
var BaseOAuthProvider = class extends FederatedAuthProvider {
	constructor() {
		super(...arguments);
		/** @internal */
		this.scopes = [];
	}
	/**
	* Add an OAuth scope to the credential.
	*
	* @param scope - Provider OAuth scope to add.
	*/
	addScope(scope) {
		if (!this.scopes.includes(scope)) this.scopes.push(scope);
		return this;
	}
	/**
	* Retrieve the current list of OAuth scopes.
	*/
	getScopes() {
		return [...this.scopes];
	}
};
/**
* Provider for generating generic {@link OAuthCredential}.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new OAuthProvider('google.com');
* // Start a sign in process for an unauthenticated user.
* provider.addScope('profile');
* provider.addScope('email');
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a OAuth Access Token for the provider.
*   const credential = provider.credentialFromResult(auth, result);
*   const token = credential.accessToken;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new OAuthProvider('google.com');
* provider.addScope('profile');
* provider.addScope('email');
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a OAuth Access Token for the provider.
* const credential = provider.credentialFromResult(auth, result);
* const token = credential.accessToken;
* ```
* @public
*/
var OAuthProvider = class OAuthProvider extends BaseOAuthProvider {
	/**
	* Creates an {@link OAuthCredential} from a JSON string or a plain object.
	* @param json - A plain object or a JSON string
	*/
	static credentialFromJSON(json) {
		const obj = typeof json === "string" ? JSON.parse(json) : json;
		_assert("providerId" in obj && "signInMethod" in obj, "argument-error");
		return OAuthCredential._fromParams(obj);
	}
	/**
	* Creates a {@link OAuthCredential} from a generic OAuth provider's access token or ID token.
	*
	* @remarks
	* The raw nonce is required when an ID token with a nonce field is provided. The SHA-256 hash of
	* the raw nonce must match the nonce field in the ID token.
	*
	* @example
	* ```javascript
	* // `googleUser` from the onsuccess Google Sign In callback.
	* // Initialize a generate OAuth provider with a `google.com` providerId.
	* const provider = new OAuthProvider('google.com');
	* const credential = provider.credential({
	*   idToken: googleUser.getAuthResponse().id_token,
	* });
	* const result = await signInWithCredential(credential);
	* ```
	*
	* @param params - Either the options object containing the ID token, access token and raw nonce
	* or the ID token string.
	*/
	credential(params) {
		return this._credential(Object.assign(Object.assign({}, params), { nonce: params.rawNonce }));
	}
	/** An internal credential method that accepts more permissive options */
	_credential(params) {
		_assert(params.idToken || params.accessToken, "argument-error");
		return OAuthCredential._fromParams(Object.assign(Object.assign({}, params), {
			providerId: this.providerId,
			signInMethod: this.providerId
		}));
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return OAuthProvider.oauthCredentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return OAuthProvider.oauthCredentialFromTaggedObject(error.customData || {});
	}
	static oauthCredentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { oauthIdToken, oauthAccessToken, oauthTokenSecret, pendingToken, nonce, providerId } = tokenResponse;
		if (!oauthAccessToken && !oauthTokenSecret && !oauthIdToken && !pendingToken) return null;
		if (!providerId) return null;
		try {
			return new OAuthProvider(providerId)._credential({
				idToken: oauthIdToken,
				accessToken: oauthAccessToken,
				nonce,
				pendingToken
			});
		} catch (e) {
			return null;
		}
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.FACEBOOK.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new FacebookAuthProvider();
* // Start a sign in process for an unauthenticated user.
* provider.addScope('user_birthday');
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Facebook Access Token.
*   const credential = FacebookAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new FacebookAuthProvider();
* provider.addScope('user_birthday');
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Facebook Access Token.
* const credential = FacebookAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* ```
*
* @public
*/
var FacebookAuthProvider = class FacebookAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("facebook.com");
	}
	/**
	* Creates a credential for Facebook.
	*
	* @example
	* ```javascript
	* // `event` from the Facebook auth.authResponseChange callback.
	* const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
	* const result = await signInWithCredential(credential);
	* ```
	*
	* @param accessToken - Facebook access token.
	*/
	static credential(accessToken) {
		return OAuthCredential._fromParams({
			providerId: FacebookAuthProvider.PROVIDER_ID,
			signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
			accessToken
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return FacebookAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) return null;
		if (!tokenResponse.oauthAccessToken) return null;
		try {
			return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.FACEBOOK. */
FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
/** Always set to {@link ProviderId}.FACEBOOK. */
FacebookAuthProvider.PROVIDER_ID = "facebook.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GOOGLE.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new GoogleAuthProvider();
* // Start a sign in process for an unauthenticated user.
* provider.addScope('profile');
* provider.addScope('email');
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Google Access Token.
*   const credential = GoogleAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new GoogleAuthProvider();
* provider.addScope('profile');
* provider.addScope('email');
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Google Access Token.
* const credential = GoogleAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* ```
*
* @public
*/
var GoogleAuthProvider = class GoogleAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("google.com");
		this.addScope("profile");
	}
	/**
	* Creates a credential for Google. At least one of ID token and access token is required.
	*
	* @example
	* ```javascript
	* // \`googleUser\` from the onsuccess Google Sign In callback.
	* const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
	* const result = await signInWithCredential(credential);
	* ```
	*
	* @param idToken - Google ID token.
	* @param accessToken - Google access token.
	*/
	static credential(idToken, accessToken) {
		return OAuthCredential._fromParams({
			providerId: GoogleAuthProvider.PROVIDER_ID,
			signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
			idToken,
			accessToken
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return GoogleAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { oauthIdToken, oauthAccessToken } = tokenResponse;
		if (!oauthIdToken && !oauthAccessToken) return null;
		try {
			return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.GOOGLE. */
GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com";
/** Always set to {@link ProviderId}.GOOGLE. */
GoogleAuthProvider.PROVIDER_ID = "google.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GITHUB.
*
* @remarks
* GitHub requires an OAuth 2.0 redirect, so you can either handle the redirect directly, or use
* the {@link signInWithPopup} handler:
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new GithubAuthProvider();
* // Start a sign in process for an unauthenticated user.
* provider.addScope('repo');
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a GitHub Access Token.
*   const credential = GithubAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new GithubAuthProvider();
* provider.addScope('repo');
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a GitHub Access Token.
* const credential = GithubAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* ```
* @public
*/
var GithubAuthProvider = class GithubAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("github.com");
	}
	/**
	* Creates a credential for GitHub.
	*
	* @param accessToken - GitHub access token.
	*/
	static credential(accessToken) {
		return OAuthCredential._fromParams({
			providerId: GithubAuthProvider.PROVIDER_ID,
			signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
			accessToken
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return GithubAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return GithubAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) return null;
		if (!tokenResponse.oauthAccessToken) return null;
		try {
			return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.GITHUB. */
GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com";
/** Always set to {@link ProviderId}.GITHUB. */
GithubAuthProvider.PROVIDER_ID = "github.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IDP_REQUEST_URI = "http://localhost";
/**
* @public
*/
var SAMLAuthCredential = class SAMLAuthCredential extends AuthCredential {
	/** @internal */
	constructor(providerId, pendingToken) {
		super(providerId, providerId);
		this.pendingToken = pendingToken;
	}
	/** @internal */
	_getIdTokenResponse(auth) {
		return signInWithIdp(auth, this.buildRequest());
	}
	/** @internal */
	_linkToIdToken(auth, idToken) {
		const request = this.buildRequest();
		request.idToken = idToken;
		return signInWithIdp(auth, request);
	}
	/** @internal */
	_getReauthenticationResolver(auth) {
		const request = this.buildRequest();
		request.autoCreate = false;
		return signInWithIdp(auth, request);
	}
	/** {@inheritdoc AuthCredential.toJSON}  */
	toJSON() {
		return {
			signInMethod: this.signInMethod,
			providerId: this.providerId,
			pendingToken: this.pendingToken
		};
	}
	/**
	* Static method to deserialize a JSON representation of an object into an
	* {@link  AuthCredential}.
	*
	* @param json - Input can be either Object or the stringified representation of the object.
	* When string is provided, JSON.parse would be called first.
	*
	* @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
	*/
	static fromJSON(json) {
		const { providerId, signInMethod, pendingToken } = typeof json === "string" ? JSON.parse(json) : json;
		if (!providerId || !signInMethod || !pendingToken || providerId !== signInMethod) return null;
		return new SAMLAuthCredential(providerId, pendingToken);
	}
	/**
	* Helper static method to avoid exposing the constructor to end users.
	*
	* @internal
	*/
	static _create(providerId, pendingToken) {
		return new SAMLAuthCredential(providerId, pendingToken);
	}
	buildRequest() {
		return {
			requestUri: IDP_REQUEST_URI,
			returnSecureToken: true,
			pendingToken: this.pendingToken
		};
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var SAML_PROVIDER_PREFIX = "saml.";
/**
* An {@link AuthProvider} for SAML.
*
* @public
*/
var SAMLAuthProvider = class SAMLAuthProvider extends FederatedAuthProvider {
	/**
	* Constructor. The providerId must start with "saml."
	* @param providerId - SAML provider ID.
	*/
	constructor(providerId) {
		_assert(providerId.startsWith(SAML_PROVIDER_PREFIX), "argument-error");
		super(providerId);
	}
	/**
	* Generates an {@link AuthCredential} from a {@link UserCredential} after a
	* successful SAML flow completes.
	*
	* @remarks
	*
	* For example, to get an {@link AuthCredential}, you could write the
	* following code:
	*
	* ```js
	* const userCredential = await signInWithPopup(auth, samlProvider);
	* const credential = SAMLAuthProvider.credentialFromResult(userCredential);
	* ```
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return SAMLAuthProvider.samlCredentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return SAMLAuthProvider.samlCredentialFromTaggedObject(error.customData || {});
	}
	/**
	* Creates an {@link AuthCredential} from a JSON string or a plain object.
	* @param json - A plain object or a JSON string
	*/
	static credentialFromJSON(json) {
		const credential = SAMLAuthCredential.fromJSON(json);
		_assert(credential, "argument-error");
		return credential;
	}
	static samlCredentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { pendingToken, providerId } = tokenResponse;
		if (!pendingToken || !providerId) return null;
		try {
			return SAMLAuthCredential._create(providerId, pendingToken);
		} catch (e) {
			return null;
		}
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.TWITTER.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new TwitterAuthProvider();
* // Start a sign in process for an unauthenticated user.
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Twitter Access Token and Secret.
*   const credential = TwitterAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
*   const secret = credential.secret;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new TwitterAuthProvider();
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Twitter Access Token and Secret.
* const credential = TwitterAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* const secret = credential.secret;
* ```
*
* @public
*/
var TwitterAuthProvider = class TwitterAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("twitter.com");
	}
	/**
	* Creates a credential for Twitter.
	*
	* @param token - Twitter access token.
	* @param secret - Twitter secret.
	*/
	static credential(token, secret) {
		return OAuthCredential._fromParams({
			providerId: TwitterAuthProvider.PROVIDER_ID,
			signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
			oauthToken: token,
			oauthTokenSecret: secret
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return TwitterAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
		if (!oauthAccessToken || !oauthTokenSecret) return null;
		try {
			return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.TWITTER. */
TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com";
/** Always set to {@link ProviderId}.TWITTER. */
TwitterAuthProvider.PROVIDER_ID = "twitter.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function signUp(_x85, _x86) {
	return _signUp.apply(this, arguments);
}
function _signUp() {
	_signUp = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signUp", _addTidIfNecessary(auth, request));
	});
	return _signUp.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UserCredentialImpl = class UserCredentialImpl {
	constructor(params) {
		this.user = params.user;
		this.providerId = params.providerId;
		this._tokenResponse = params._tokenResponse;
		this.operationType = params.operationType;
	}
	static _fromIdTokenResponse(auth, operationType, idTokenResponse, isAnonymous = false) {
		return _asyncToGenerator(function* () {
			const user = yield UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous);
			const providerId = providerIdForResponse(idTokenResponse);
			return new UserCredentialImpl({
				user,
				providerId,
				_tokenResponse: idTokenResponse,
				operationType
			});
		})();
	}
	static _forOperation(user, operationType, response) {
		return _asyncToGenerator(function* () {
			yield user._updateTokensIfNecessary(response, true);
			const providerId = providerIdForResponse(response);
			return new UserCredentialImpl({
				user,
				providerId,
				_tokenResponse: response,
				operationType
			});
		})();
	}
};
function providerIdForResponse(response) {
	if (response.providerId) return response.providerId;
	if ("phoneNumber" in response) return "phone";
	return null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Asynchronously signs in as an anonymous user.
*
* @remarks
* If there is already an anonymous user signed in, that user will be returned; otherwise, a
* new anonymous user identity will be created and returned.
*
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @param auth - The {@link Auth} instance.
*
* @public
*/
function signInAnonymously(_x87) {
	return _signInAnonymously.apply(this, arguments);
}
function _signInAnonymously() {
	_signInAnonymously = _asyncToGenerator(function* (auth) {
		var _a;
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const authInternal = _castAuth(auth);
		yield authInternal._initializationPromise;
		if ((_a = authInternal.currentUser) === null || _a === void 0 ? void 0 : _a.isAnonymous) return new UserCredentialImpl({
			user: authInternal.currentUser,
			providerId: null,
			operationType: "signIn"
		});
		const response = yield signUp(authInternal, { returnSecureToken: true });
		const userCredential = yield UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response, true);
		yield authInternal._updateCurrentUser(userCredential.user);
		return userCredential;
	});
	return _signInAnonymously.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MultiFactorError = class MultiFactorError extends FirebaseError {
	constructor(auth, error, operationType, user) {
		var _a;
		super(error.code, error.message);
		this.operationType = operationType;
		this.user = user;
		Object.setPrototypeOf(this, MultiFactorError.prototype);
		this.customData = {
			appName: auth.name,
			tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : void 0,
			_serverResponse: error.customData._serverResponse,
			operationType
		};
	}
	static _fromErrorAndOperation(auth, error, operationType, user) {
		return new MultiFactorError(auth, error, operationType, user);
	}
};
function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
	return (operationType === "reauthenticate" ? credential._getReauthenticationResolver(auth) : credential._getIdTokenResponse(auth)).catch((error) => {
		if (error.code === `auth/multi-factor-auth-required`) throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
		throw error;
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Takes a set of UserInfo provider data and converts it to a set of names
*/
function providerDataAsNames(providerData) {
	return new Set(providerData.map(({ providerId }) => providerId).filter((pid) => !!pid));
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Unlinks a provider from a user account.
*
* @param user - The user.
* @param providerId - The provider to unlink.
*
* @public
*/
function unlink(_x88, _x89) {
	return _unlink.apply(this, arguments);
}
function _unlink() {
	_unlink = _asyncToGenerator(function* (user, providerId) {
		const userInternal = getModularInstance(user);
		yield _assertLinkedStatus(true, userInternal, providerId);
		const { providerUserInfo } = yield deleteLinkedAccounts(userInternal.auth, {
			idToken: yield userInternal.getIdToken(),
			deleteProvider: [providerId]
		});
		const providersLeft = providerDataAsNames(providerUserInfo || []);
		userInternal.providerData = userInternal.providerData.filter((pd) => providersLeft.has(pd.providerId));
		if (!providersLeft.has("phone")) userInternal.phoneNumber = null;
		yield userInternal.auth._persistUserIfCurrent(userInternal);
		return userInternal;
	});
	return _unlink.apply(this, arguments);
}
function _link$1(_x90, _x91) {
	return _link$.apply(this, arguments);
}
function _link$() {
	_link$ = _asyncToGenerator(function* (user, credential, bypassAuthState = false) {
		const response = yield _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, yield user.getIdToken()), bypassAuthState);
		return UserCredentialImpl._forOperation(user, "link", response);
	});
	return _link$.apply(this, arguments);
}
function _assertLinkedStatus(_x92, _x93, _x94) {
	return _assertLinkedStatus2.apply(this, arguments);
}
function _assertLinkedStatus2() {
	_assertLinkedStatus2 = _asyncToGenerator(function* (expected, user, provider) {
		yield _reloadWithoutSaving(user);
		const providerIds = providerDataAsNames(user.providerData);
		const code = expected === false ? "provider-already-linked" : "no-such-provider";
		_assert(providerIds.has(provider) === expected, user.auth, code);
	});
	return _assertLinkedStatus2.apply(this, arguments);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _reauthenticate(_x95, _x96) {
	return _reauthenticate2.apply(this, arguments);
}
function _reauthenticate2() {
	_reauthenticate2 = _asyncToGenerator(function* (user, credential, bypassAuthState = false) {
		const { auth } = user;
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const operationType = "reauthenticate";
		try {
			const response = yield _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState);
			_assert(response.idToken, auth, "internal-error");
			const parsed = _parseToken(response.idToken);
			_assert(parsed, auth, "internal-error");
			const { sub: localId } = parsed;
			_assert(user.uid === localId, auth, "user-mismatch");
			return UserCredentialImpl._forOperation(user, operationType, response);
		} catch (e) {
			if ((e === null || e === void 0 ? void 0 : e.code) === `auth/user-not-found`) _fail(auth, "user-mismatch");
			throw e;
		}
	});
	return _reauthenticate2.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _signInWithCredential(_x97, _x98) {
	return _signInWithCredential2.apply(this, arguments);
}
function _signInWithCredential2() {
	_signInWithCredential2 = _asyncToGenerator(function* (auth, credential, bypassAuthState = false) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const operationType = "signIn";
		const response = yield _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
		const userCredential = yield UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);
		if (!bypassAuthState) yield auth._updateCurrentUser(userCredential.user);
		return userCredential;
	});
	return _signInWithCredential2.apply(this, arguments);
}
/**
* Asynchronously signs in with the given credentials.
*
* @remarks
* An {@link AuthProvider} can be used to generate the credential.
*
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @param auth - The {@link Auth} instance.
* @param credential - The auth credential.
*
* @public
*/
function signInWithCredential(_x99, _x100) {
	return _signInWithCredential3.apply(this, arguments);
}
function _signInWithCredential3() {
	_signInWithCredential3 = _asyncToGenerator(function* (auth, credential) {
		return _signInWithCredential(_castAuth(auth), credential);
	});
	return _signInWithCredential3.apply(this, arguments);
}
/**
* Links the user account with the given credentials.
*
* @remarks
* An {@link AuthProvider} can be used to generate the credential.
*
* @param user - The user.
* @param credential - The auth credential.
*
* @public
*/
function linkWithCredential(_x101, _x102) {
	return _linkWithCredential.apply(this, arguments);
}
function _linkWithCredential() {
	_linkWithCredential = _asyncToGenerator(function* (user, credential) {
		const userInternal = getModularInstance(user);
		yield _assertLinkedStatus(false, userInternal, credential.providerId);
		return _link$1(userInternal, credential);
	});
	return _linkWithCredential.apply(this, arguments);
}
/**
* Re-authenticates a user using a fresh credential.
*
* @remarks
* Use before operations such as {@link updatePassword} that require tokens from recent sign-in
* attempts. This method can be used to recover from a `CREDENTIAL_TOO_OLD_LOGIN_AGAIN` error
* or a `TOKEN_EXPIRED` error.
*
* This method is not supported on any {@link User} signed in by {@link Auth} instances
* created with a {@link @firebase/app#FirebaseServerApp}.
*
* @param user - The user.
* @param credential - The auth credential.
*
* @public
*/
function reauthenticateWithCredential(_x103, _x104) {
	return _reauthenticateWithCredential.apply(this, arguments);
}
function _reauthenticateWithCredential() {
	_reauthenticateWithCredential = _asyncToGenerator(function* (user, credential) {
		return _reauthenticate(getModularInstance(user), credential);
	});
	return _reauthenticateWithCredential.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function signInWithCustomToken$1(_x105, _x106) {
	return _signInWithCustomToken$.apply(this, arguments);
}
function _signInWithCustomToken$() {
	_signInWithCustomToken$ = _asyncToGenerator(function* (auth, request) {
		return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithCustomToken", _addTidIfNecessary(auth, request));
	});
	return _signInWithCustomToken$.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Asynchronously signs in using a custom token.
*
* @remarks
* Custom tokens are used to integrate Firebase Auth with existing auth systems, and must
* be generated by an auth backend using the
* {@link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#createcustomtoken | createCustomToken}
* method in the {@link https://firebase.google.com/docs/auth/admin | Admin SDK} .
*
* Fails with an error if the token is invalid, expired, or not accepted by the Firebase Auth service.
*
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @param auth - The {@link Auth} instance.
* @param customToken - The custom token to sign in with.
*
* @public
*/
function signInWithCustomToken(_x107, _x108) {
	return _signInWithCustomToken.apply(this, arguments);
}
function _signInWithCustomToken() {
	_signInWithCustomToken = _asyncToGenerator(function* (auth, customToken) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const authInternal = _castAuth(auth);
		const response = yield signInWithCustomToken$1(authInternal, {
			token: customToken,
			returnSecureToken: true
		});
		const cred = yield UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response);
		yield authInternal._updateCurrentUser(cred.user);
		return cred;
	});
	return _signInWithCustomToken.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MultiFactorInfoImpl = class {
	constructor(factorId, response) {
		this.factorId = factorId;
		this.uid = response.mfaEnrollmentId;
		this.enrollmentTime = new Date(response.enrolledAt).toUTCString();
		this.displayName = response.displayName;
	}
	static _fromServerResponse(auth, enrollment) {
		if ("phoneInfo" in enrollment) return PhoneMultiFactorInfoImpl._fromServerResponse(auth, enrollment);
		else if ("totpInfo" in enrollment) return TotpMultiFactorInfoImpl._fromServerResponse(auth, enrollment);
		return _fail(auth, "internal-error");
	}
};
var PhoneMultiFactorInfoImpl = class PhoneMultiFactorInfoImpl extends MultiFactorInfoImpl {
	constructor(response) {
		super("phone", response);
		this.phoneNumber = response.phoneInfo;
	}
	static _fromServerResponse(_auth, enrollment) {
		return new PhoneMultiFactorInfoImpl(enrollment);
	}
};
var TotpMultiFactorInfoImpl = class TotpMultiFactorInfoImpl extends MultiFactorInfoImpl {
	constructor(response) {
		super("totp", response);
	}
	static _fromServerResponse(_auth, enrollment) {
		return new TotpMultiFactorInfoImpl(enrollment);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings) {
	var _a;
	_assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth, "invalid-continue-uri");
	_assert(typeof actionCodeSettings.dynamicLinkDomain === "undefined" || actionCodeSettings.dynamicLinkDomain.length > 0, auth, "invalid-dynamic-link-domain");
	_assert(typeof actionCodeSettings.linkDomain === "undefined" || actionCodeSettings.linkDomain.length > 0, auth, "invalid-hosting-link-domain");
	request.continueUrl = actionCodeSettings.url;
	request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
	request.linkDomain = actionCodeSettings.linkDomain;
	request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
	if (actionCodeSettings.iOS) {
		_assert(actionCodeSettings.iOS.bundleId.length > 0, auth, "missing-ios-bundle-id");
		request.iOSBundleId = actionCodeSettings.iOS.bundleId;
	}
	if (actionCodeSettings.android) {
		_assert(actionCodeSettings.android.packageName.length > 0, auth, "missing-android-pkg-name");
		request.androidInstallApp = actionCodeSettings.android.installApp;
		request.androidMinimumVersionCode = actionCodeSettings.android.minimumVersion;
		request.androidPackageName = actionCodeSettings.android.packageName;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Updates the password policy cached in the {@link Auth} instance if a policy is already
* cached for the project or tenant.
*
* @remarks
* We only fetch the password policy if the password did not meet policy requirements and
* there is an existing policy cached. A developer must call validatePassword at least
* once for the cache to be automatically updated.
*
* @param auth - The {@link Auth} instance.
*
* @private
*/
function recachePasswordPolicy(_x109) {
	return _recachePasswordPolicy.apply(this, arguments);
}
function _recachePasswordPolicy() {
	_recachePasswordPolicy = _asyncToGenerator(function* (auth) {
		const authInternal = _castAuth(auth);
		if (authInternal._getPasswordPolicyInternal()) yield authInternal._updatePasswordPolicy();
	});
	return _recachePasswordPolicy.apply(this, arguments);
}
/**
* Sends a password reset email to the given email address. This method does not throw an error when
* there's no user account with the given email address and
* {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
* is enabled.
*
* @remarks
* To complete the password reset, call {@link confirmPasswordReset} with the code supplied in
* the email sent to the user, along with the new password specified by the user.
*
* @example
* ```javascript
* const actionCodeSettings = {
*   url: 'https://www.example.com/?email=user@example.com',
*   iOS: {
*      bundleId: 'com.example.ios'
*   },
*   android: {
*     packageName: 'com.example.android',
*     installApp: true,
*     minimumVersion: '12'
*   },
*   handleCodeInApp: true
* };
* await sendPasswordResetEmail(auth, 'user@example.com', actionCodeSettings);
* // Obtain code from user.
* await confirmPasswordReset('user@example.com', code);
* ```
*
* @param auth - The {@link Auth} instance.
* @param email - The user's email address.
* @param actionCodeSettings - The {@link ActionCodeSettings}.
*
* @public
*/
function sendPasswordResetEmail(_x110, _x111, _x112) {
	return _sendPasswordResetEmail.apply(this, arguments);
}
function _sendPasswordResetEmail() {
	_sendPasswordResetEmail = _asyncToGenerator(function* (auth, email, actionCodeSettings) {
		const authInternal = _castAuth(auth);
		const request = {
			requestType: "PASSWORD_RESET",
			email,
			clientType: "CLIENT_TYPE_WEB"
		};
		if (actionCodeSettings) _setActionCodeSettingsOnRequest(authInternal, request, actionCodeSettings);
		yield handleRecaptchaFlow(authInternal, request, "getOobCode", sendPasswordResetEmail$1, "EMAIL_PASSWORD_PROVIDER");
	});
	return _sendPasswordResetEmail.apply(this, arguments);
}
/**
* Completes the password reset process, given a confirmation code and new password.
*
* @param auth - The {@link Auth} instance.
* @param oobCode - A confirmation code sent to the user.
* @param newPassword - The new password.
*
* @public
*/
function confirmPasswordReset(_x114, _x115, _x116) {
	return _confirmPasswordReset.apply(this, arguments);
}
function _confirmPasswordReset() {
	_confirmPasswordReset = _asyncToGenerator(function* (auth, oobCode, newPassword) {
		yield resetPassword(getModularInstance(auth), {
			oobCode,
			newPassword
		}).catch(function() {
			var _ref6 = _asyncToGenerator(function* (error) {
				if (error.code === `auth/password-does-not-meet-requirements`) recachePasswordPolicy(auth);
				throw error;
			});
			return function(_x113) {
				return _ref6.apply(this, arguments);
			};
		}());
	});
	return _confirmPasswordReset.apply(this, arguments);
}
/**
* Applies a verification code sent to the user by email or other out-of-band mechanism.
*
* @param auth - The {@link Auth} instance.
* @param oobCode - A verification code sent to the user.
*
* @public
*/
function applyActionCode(_x117, _x118) {
	return _applyActionCode.apply(this, arguments);
}
function _applyActionCode() {
	_applyActionCode = _asyncToGenerator(function* (auth, oobCode) {
		yield applyActionCode$1(getModularInstance(auth), { oobCode });
	});
	return _applyActionCode.apply(this, arguments);
}
/**
* Checks a verification code sent to the user by email or other out-of-band mechanism.
*
* @returns metadata about the code.
*
* @param auth - The {@link Auth} instance.
* @param oobCode - A verification code sent to the user.
*
* @public
*/
function checkActionCode(_x119, _x120) {
	return _checkActionCode.apply(this, arguments);
}
function _checkActionCode() {
	_checkActionCode = _asyncToGenerator(function* (auth, oobCode) {
		const authModular = getModularInstance(auth);
		const response = yield resetPassword(authModular, { oobCode });
		const operation = response.requestType;
		_assert(operation, authModular, "internal-error");
		switch (operation) {
			case "EMAIL_SIGNIN": break;
			case "VERIFY_AND_CHANGE_EMAIL":
				_assert(response.newEmail, authModular, "internal-error");
				break;
			case "REVERT_SECOND_FACTOR_ADDITION": _assert(response.mfaInfo, authModular, "internal-error");
			default: _assert(response.email, authModular, "internal-error");
		}
		let multiFactorInfo = null;
		if (response.mfaInfo) multiFactorInfo = MultiFactorInfoImpl._fromServerResponse(_castAuth(authModular), response.mfaInfo);
		return {
			data: {
				email: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" ? response.newEmail : response.email) || null,
				previousEmail: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" ? response.email : response.newEmail) || null,
				multiFactorInfo
			},
			operation
		};
	});
	return _checkActionCode.apply(this, arguments);
}
/**
* Checks a password reset code sent to the user by email or other out-of-band mechanism.
*
* @returns the user's email address if valid.
*
* @param auth - The {@link Auth} instance.
* @param code - A verification code sent to the user.
*
* @public
*/
function verifyPasswordResetCode(_x121, _x122) {
	return _verifyPasswordResetCode.apply(this, arguments);
}
function _verifyPasswordResetCode() {
	_verifyPasswordResetCode = _asyncToGenerator(function* (auth, code) {
		const { data } = yield checkActionCode(getModularInstance(auth), code);
		return data.email;
	});
	return _verifyPasswordResetCode.apply(this, arguments);
}
/**
* Creates a new user account associated with the specified email address and password.
*
* @remarks
* On successful creation of the user account, this user will also be signed in to your application.
*
* User account creation can fail if the account already exists or the password is invalid.
*
* This method is not supported on {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* Note: The email address acts as a unique identifier for the user and enables an email-based
* password reset. This function will create a new user account and set the initial user password.
*
* @param auth - The {@link Auth} instance.
* @param email - The user's email address.
* @param password - The user's chosen password.
*
* @public
*/
function createUserWithEmailAndPassword(_x123, _x124, _x125) {
	return _createUserWithEmailAndPassword.apply(this, arguments);
}
function _createUserWithEmailAndPassword() {
	_createUserWithEmailAndPassword = _asyncToGenerator(function* (auth, email, password) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const authInternal = _castAuth(auth);
		const response = yield handleRecaptchaFlow(authInternal, {
			returnSecureToken: true,
			email,
			password,
			clientType: "CLIENT_TYPE_WEB"
		}, "signUpPassword", signUp, "EMAIL_PASSWORD_PROVIDER").catch((error) => {
			if (error.code === `auth/password-does-not-meet-requirements`) recachePasswordPolicy(auth);
			throw error;
		});
		const userCredential = yield UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response);
		yield authInternal._updateCurrentUser(userCredential.user);
		return userCredential;
	});
	return _createUserWithEmailAndPassword.apply(this, arguments);
}
/**
* Asynchronously signs in using an email and password.
*
* @remarks
* Fails with an error if the email address and password do not match. When
* {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
* is enabled, this method fails with "auth/invalid-credential" in case of an invalid
* email/password.
*
* This method is not supported on {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* Note: The user's password is NOT the password used to access the user's email account. The
* email address serves as a unique identifier for the user, and the password is used to access
* the user's account in your Firebase project. See also: {@link createUserWithEmailAndPassword}.
*
*
* @param auth - The {@link Auth} instance.
* @param email - The users email address.
* @param password - The users password.
*
* @public
*/
function signInWithEmailAndPassword(auth, email, password) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	return signInWithCredential(getModularInstance(auth), EmailAuthProvider.credential(email, password)).catch(function() {
		var _ref7 = _asyncToGenerator(function* (error) {
			if (error.code === `auth/password-does-not-meet-requirements`) recachePasswordPolicy(auth);
			throw error;
		});
		return function(_x126) {
			return _ref7.apply(this, arguments);
		};
	}());
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Sends a sign-in email link to the user with the specified email.
*
* @remarks
* The sign-in operation has to always be completed in the app unlike other out of band email
* actions (password reset and email verifications). This is because, at the end of the flow,
* the user is expected to be signed in and their Auth state persisted within the app.
*
* To complete sign in with the email link, call {@link signInWithEmailLink} with the email
* address and the email link supplied in the email sent to the user.
*
* @example
* ```javascript
* const actionCodeSettings = {
*   url: 'https://www.example.com/?email=user@example.com',
*   iOS: {
*      bundleId: 'com.example.ios'
*   },
*   android: {
*     packageName: 'com.example.android',
*     installApp: true,
*     minimumVersion: '12'
*   },
*   handleCodeInApp: true
* };
* await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
* // Obtain emailLink from the user.
* if(isSignInWithEmailLink(auth, emailLink)) {
*   await signInWithEmailLink(auth, 'user@example.com', emailLink);
* }
* ```
*
* @param authInternal - The {@link Auth} instance.
* @param email - The user's email address.
* @param actionCodeSettings - The {@link ActionCodeSettings}.
*
* @public
*/
function sendSignInLinkToEmail(_x127, _x128, _x129) {
	return _sendSignInLinkToEmail.apply(this, arguments);
}
function _sendSignInLinkToEmail() {
	_sendSignInLinkToEmail = _asyncToGenerator(function* (auth, email, actionCodeSettings) {
		const authInternal = _castAuth(auth);
		const request = {
			requestType: "EMAIL_SIGNIN",
			email,
			clientType: "CLIENT_TYPE_WEB"
		};
		function setActionCodeSettings(request, actionCodeSettings) {
			_assert(actionCodeSettings.handleCodeInApp, authInternal, "argument-error");
			if (actionCodeSettings) _setActionCodeSettingsOnRequest(authInternal, request, actionCodeSettings);
		}
		setActionCodeSettings(request, actionCodeSettings);
		yield handleRecaptchaFlow(authInternal, request, "getOobCode", sendSignInLinkToEmail$1, "EMAIL_PASSWORD_PROVIDER");
	});
	return _sendSignInLinkToEmail.apply(this, arguments);
}
/**
* Checks if an incoming link is a sign-in with email link suitable for {@link signInWithEmailLink}.
*
* @param auth - The {@link Auth} instance.
* @param emailLink - The link sent to the user's email address.
*
* @public
*/
function isSignInWithEmailLink(auth, emailLink) {
	const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
	return (actionCodeUrl === null || actionCodeUrl === void 0 ? void 0 : actionCodeUrl.operation) === "EMAIL_SIGNIN";
}
/**
* Asynchronously signs in using an email and sign-in email link.
*
* @remarks
* If no link is passed, the link is inferred from the current URL.
*
* Fails with an error if the email address is invalid or OTP in email link expires.
*
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* Note: Confirm the link is a sign-in email link before calling this method firebase.auth.Auth.isSignInWithEmailLink.
*
* @example
* ```javascript
* const actionCodeSettings = {
*   url: 'https://www.example.com/?email=user@example.com',
*   iOS: {
*      bundleId: 'com.example.ios'
*   },
*   android: {
*     packageName: 'com.example.android',
*     installApp: true,
*     minimumVersion: '12'
*   },
*   handleCodeInApp: true
* };
* await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
* // Obtain emailLink from the user.
* if(isSignInWithEmailLink(auth, emailLink)) {
*   await signInWithEmailLink(auth, 'user@example.com', emailLink);
* }
* ```
*
*
* @param auth - The {@link Auth} instance.
* @param email - The user's email address.
* @param emailLink - The link sent to the user's email address.
*
* @public
*/
function signInWithEmailLink(_x130, _x131, _x132) {
	return _signInWithEmailLink.apply(this, arguments);
}
function _signInWithEmailLink() {
	_signInWithEmailLink = _asyncToGenerator(function* (auth, email, emailLink) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const authModular = getModularInstance(auth);
		const credential = EmailAuthProvider.credentialWithLink(email, emailLink || _getCurrentUrl());
		_assert(credential._tenantId === (authModular.tenantId || null), authModular, "tenant-id-mismatch");
		return signInWithCredential(authModular, credential);
	});
	return _signInWithEmailLink.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function createAuthUri(_x133, _x134) {
	return _createAuthUri.apply(this, arguments);
}
function _createAuthUri() {
	_createAuthUri = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:createAuthUri", _addTidIfNecessary(auth, request));
	});
	return _createAuthUri.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Gets the list of possible sign in methods for the given email address. This method returns an
* empty list when
* {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
* is enabled, irrespective of the number of authentication methods available for the given email.
*
* @remarks
* This is useful to differentiate methods of sign-in for the same provider, eg.
* {@link EmailAuthProvider} which has 2 methods of sign-in,
* {@link SignInMethod}.EMAIL_PASSWORD and
* {@link SignInMethod}.EMAIL_LINK.
*
* @param auth - The {@link Auth} instance.
* @param email - The user's email address.
*
* Deprecated. Migrating off of this method is recommended as a security best-practice.
* Learn more in the Identity Platform documentation for
* {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}.
* @public
*/
function fetchSignInMethodsForEmail(_x135, _x136) {
	return _fetchSignInMethodsForEmail.apply(this, arguments);
}
function _fetchSignInMethodsForEmail() {
	_fetchSignInMethodsForEmail = _asyncToGenerator(function* (auth, email) {
		const request = {
			identifier: email,
			continueUri: _isHttpOrHttps() ? _getCurrentUrl() : "http://localhost"
		};
		const { signinMethods } = yield createAuthUri(getModularInstance(auth), request);
		return signinMethods || [];
	});
	return _fetchSignInMethodsForEmail.apply(this, arguments);
}
/**
* Sends a verification email to a user.
*
* @remarks
* The verification process is completed by calling {@link applyActionCode}.
*
* @example
* ```javascript
* const actionCodeSettings = {
*   url: 'https://www.example.com/?email=user@example.com',
*   iOS: {
*      bundleId: 'com.example.ios'
*   },
*   android: {
*     packageName: 'com.example.android',
*     installApp: true,
*     minimumVersion: '12'
*   },
*   handleCodeInApp: true
* };
* await sendEmailVerification(user, actionCodeSettings);
* // Obtain code from the user.
* await applyActionCode(auth, code);
* ```
*
* @param user - The user.
* @param actionCodeSettings - The {@link ActionCodeSettings}.
*
* @public
*/
function sendEmailVerification(_x137, _x138) {
	return _sendEmailVerification.apply(this, arguments);
}
function _sendEmailVerification() {
	_sendEmailVerification = _asyncToGenerator(function* (user, actionCodeSettings) {
		const userInternal = getModularInstance(user);
		const request = {
			requestType: "VERIFY_EMAIL",
			idToken: yield user.getIdToken()
		};
		if (actionCodeSettings) _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
		const { email } = yield sendEmailVerification$1(userInternal.auth, request);
		if (email !== user.email) yield user.reload();
	});
	return _sendEmailVerification.apply(this, arguments);
}
/**
* Sends a verification email to a new email address.
*
* @remarks
* The user's email will be updated to the new one after being verified.
*
* If you have a custom email action handler, you can complete the verification process by calling
* {@link applyActionCode}.
*
* @example
* ```javascript
* const actionCodeSettings = {
*   url: 'https://www.example.com/?email=user@example.com',
*   iOS: {
*      bundleId: 'com.example.ios'
*   },
*   android: {
*     packageName: 'com.example.android',
*     installApp: true,
*     minimumVersion: '12'
*   },
*   handleCodeInApp: true
* };
* await verifyBeforeUpdateEmail(user, 'newemail@example.com', actionCodeSettings);
* // Obtain code from the user.
* await applyActionCode(auth, code);
* ```
*
* @param user - The user.
* @param newEmail - The new email address to be verified before update.
* @param actionCodeSettings - The {@link ActionCodeSettings}.
*
* @public
*/
function verifyBeforeUpdateEmail(_x139, _x140, _x141) {
	return _verifyBeforeUpdateEmail.apply(this, arguments);
}
function _verifyBeforeUpdateEmail() {
	_verifyBeforeUpdateEmail = _asyncToGenerator(function* (user, newEmail, actionCodeSettings) {
		const userInternal = getModularInstance(user);
		const request = {
			requestType: "VERIFY_AND_CHANGE_EMAIL",
			idToken: yield user.getIdToken(),
			newEmail
		};
		if (actionCodeSettings) _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
		const { email } = yield verifyAndChangeEmail(userInternal.auth, request);
		if (email !== user.email) yield user.reload();
	});
	return _verifyBeforeUpdateEmail.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function updateProfile$1(_x142, _x143) {
	return _updateProfile$.apply(this, arguments);
}
function _updateProfile$() {
	_updateProfile$ = _asyncToGenerator(function* (auth, request) {
		return _performApiRequest(auth, "POST", "/v1/accounts:update", request);
	});
	return _updateProfile$.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Updates a user's profile data.
*
* @param user - The user.
* @param profile - The profile's `displayName` and `photoURL` to update.
*
* @public
*/
function updateProfile(_x144, _x145) {
	return _updateProfile.apply(this, arguments);
}
function _updateProfile() {
	_updateProfile = _asyncToGenerator(function* (user, { displayName, photoURL: photoUrl }) {
		if (displayName === void 0 && photoUrl === void 0) return;
		const userInternal = getModularInstance(user);
		const profileRequest = {
			idToken: yield userInternal.getIdToken(),
			displayName,
			photoUrl,
			returnSecureToken: true
		};
		const response = yield _logoutIfInvalidated(userInternal, updateProfile$1(userInternal.auth, profileRequest));
		userInternal.displayName = response.displayName || null;
		userInternal.photoURL = response.photoUrl || null;
		const passwordProvider = userInternal.providerData.find(({ providerId }) => providerId === "password");
		if (passwordProvider) {
			passwordProvider.displayName = userInternal.displayName;
			passwordProvider.photoURL = userInternal.photoURL;
		}
		yield userInternal._updateTokensIfNecessary(response);
	});
	return _updateProfile.apply(this, arguments);
}
/**
* Updates the user's email address.
*
* @remarks
* An email will be sent to the original email address (if it was set) that allows to revoke the
* email address change, in order to protect them from account hijacking.
*
* This method is not supported on any {@link User} signed in by {@link Auth} instances
* created with a {@link @firebase/app#FirebaseServerApp}.
*
* Important: this is a security sensitive operation that requires the user to have recently signed
* in. If this requirement isn't met, ask the user to authenticate again and then call
* {@link reauthenticateWithCredential}.
*
* @param user - The user.
* @param newEmail - The new email address.
*
* Throws "auth/operation-not-allowed" error when
* {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
* is enabled.
* Deprecated - Use {@link verifyBeforeUpdateEmail} instead.
*
* @public
*/
function updateEmail(user, newEmail) {
	const userInternal = getModularInstance(user);
	if (_isFirebaseServerApp(userInternal.auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth));
	return updateEmailOrPassword(userInternal, newEmail, null);
}
/**
* Updates the user's password.
*
* @remarks
* Important: this is a security sensitive operation that requires the user to have recently signed
* in. If this requirement isn't met, ask the user to authenticate again and then call
* {@link reauthenticateWithCredential}.
*
* @param user - The user.
* @param newPassword - The new password.
*
* @public
*/
function updatePassword(user, newPassword) {
	return updateEmailOrPassword(getModularInstance(user), null, newPassword);
}
function updateEmailOrPassword(_x146, _x147, _x148) {
	return _updateEmailOrPassword.apply(this, arguments);
}
function _updateEmailOrPassword() {
	_updateEmailOrPassword = _asyncToGenerator(function* (user, email, password) {
		const { auth } = user;
		const request = {
			idToken: yield user.getIdToken(),
			returnSecureToken: true
		};
		if (email) request.email = email;
		if (password) request.password = password;
		const response = yield _logoutIfInvalidated(user, updateEmailPassword(auth, request));
		yield user._updateTokensIfNecessary(response, true);
	});
	return _updateEmailOrPassword.apply(this, arguments);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Parse the `AdditionalUserInfo` from the ID token response.
*
*/
function _fromIdTokenResponse(idTokenResponse) {
	var _a, _b;
	if (!idTokenResponse) return null;
	const { providerId } = idTokenResponse;
	const profile = idTokenResponse.rawUserInfo ? JSON.parse(idTokenResponse.rawUserInfo) : {};
	const isNewUser = idTokenResponse.isNewUser || idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse";
	if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
		const signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b["sign_in_provider"];
		if (signInProvider) return new GenericAdditionalUserInfo(isNewUser, signInProvider !== "anonymous" && signInProvider !== "custom" ? signInProvider : null);
	}
	if (!providerId) return null;
	switch (providerId) {
		case "facebook.com": return new FacebookAdditionalUserInfo(isNewUser, profile);
		case "github.com": return new GithubAdditionalUserInfo(isNewUser, profile);
		case "google.com": return new GoogleAdditionalUserInfo(isNewUser, profile);
		case "twitter.com": return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);
		case "custom":
		case "anonymous": return new GenericAdditionalUserInfo(isNewUser, null);
		default: return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
	}
}
var GenericAdditionalUserInfo = class {
	constructor(isNewUser, providerId, profile = {}) {
		this.isNewUser = isNewUser;
		this.providerId = providerId;
		this.profile = profile;
	}
};
var FederatedAdditionalUserInfoWithUsername = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, providerId, profile, username) {
		super(isNewUser, providerId, profile);
		this.username = username;
	}
};
var FacebookAdditionalUserInfo = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, profile) {
		super(isNewUser, "facebook.com", profile);
	}
};
var GithubAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
	constructor(isNewUser, profile) {
		super(isNewUser, "github.com", profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === "string" ? profile === null || profile === void 0 ? void 0 : profile.login : null);
	}
};
var GoogleAdditionalUserInfo = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, profile) {
		super(isNewUser, "google.com", profile);
	}
};
var TwitterAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
	constructor(isNewUser, profile, screenName) {
		super(isNewUser, "twitter.com", profile, screenName);
	}
};
/**
* Extracts provider specific {@link AdditionalUserInfo} for the given credential.
*
* @param userCredential - The user credential.
*
* @public
*/
function getAdditionalUserInfo(userCredential) {
	const { user, _tokenResponse } = userCredential;
	if (user.isAnonymous && !_tokenResponse) return {
		providerId: null,
		isNewUser: false,
		profile: null
	};
	return _fromIdTokenResponse(_tokenResponse);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Changes the type of persistence on the {@link Auth} instance for the currently saved
* `Auth` session and applies this type of persistence for future sign-in requests, including
* sign-in with redirect requests.
*
* @remarks
* This makes it easy for a user signing in to specify whether their session should be
* remembered or not. It also makes it easier to never persist the `Auth` state for applications
* that are shared by other users or have sensitive data.
*
* This method does not work in a Node.js environment or with {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* setPersistence(auth, browserSessionPersistence);
* ```
*
* @param auth - The {@link Auth} instance.
* @param persistence - The {@link Persistence} to use.
* @returns A `Promise` that resolves once the persistence change has completed
*
* @public
*/
function setPersistence(auth, persistence) {
	return getModularInstance(auth).setPersistence(persistence);
}
/**
* Loads the reCAPTCHA configuration into the `Auth` instance.
*
* @remarks
* This will load the reCAPTCHA config, which indicates whether the reCAPTCHA
* verification flow should be triggered for each auth provider, into the
* current Auth session.
*
* If initializeRecaptchaConfig() is not invoked, the auth flow will always start
* without reCAPTCHA verification. If the provider is configured to require reCAPTCHA
* verification, the SDK will transparently load the reCAPTCHA config and restart the
* auth flows.
*
* Thus, by calling this optional method, you will reduce the latency of future auth flows.
* Loading the reCAPTCHA config early will also enhance the signal collected by reCAPTCHA.
*
* This method does not work in a Node.js environment.
*
* @example
* ```javascript
* initializeRecaptchaConfig(auth);
* ```
*
* @param auth - The {@link Auth} instance.
*
* @public
*/
function initializeRecaptchaConfig(auth) {
	return _initializeRecaptchaConfig(auth);
}
/**
* Validates the password against the password policy configured for the project or tenant.
*
* @remarks
* If no tenant ID is set on the `Auth` instance, then this method will use the password
* policy configured for the project. Otherwise, this method will use the policy configured
* for the tenant. If a password policy has not been configured, then the default policy
* configured for all projects will be used.
*
* If an auth flow fails because a submitted password does not meet the password policy
* requirements and this method has previously been called, then this method will use the
* most recent policy available when called again.
*
* @example
* ```javascript
* validatePassword(auth, 'some-password');
* ```
*
* @param auth The {@link Auth} instance.
* @param password The password to validate.
*
* @public
*/
function validatePassword(_x149, _x150) {
	return _validatePassword.apply(this, arguments);
}
function _validatePassword() {
	_validatePassword = _asyncToGenerator(function* (auth, password) {
		return _castAuth(auth).validatePassword(password);
	});
	return _validatePassword.apply(this, arguments);
}
/**
* Adds an observer for changes to the signed-in user's ID token.
*
* @remarks
* This includes sign-in, sign-out, and token refresh events.
* This will not be triggered automatically upon ID token expiration. Use {@link User.getIdToken} to refresh the ID token.
*
* @param auth - The {@link Auth} instance.
* @param nextOrObserver - callback triggered on change.
* @param error - Deprecated. This callback is never triggered. Errors
* on signing in/out can be caught in promises returned from
* sign-in/sign-out functions.
* @param completed - Deprecated. This callback is never triggered.
*
* @public
*/
function onIdTokenChanged(auth, nextOrObserver, error, completed) {
	return getModularInstance(auth).onIdTokenChanged(nextOrObserver, error, completed);
}
/**
* Adds a blocking callback that runs before an auth state change
* sets a new user.
*
* @param auth - The {@link Auth} instance.
* @param callback - callback triggered before new user value is set.
*   If this throws, it blocks the user from being set.
* @param onAbort - callback triggered if a later `beforeAuthStateChanged()`
*   callback throws, allowing you to undo any side effects.
*/
function beforeAuthStateChanged(auth, callback, onAbort) {
	return getModularInstance(auth).beforeAuthStateChanged(callback, onAbort);
}
/**
* Adds an observer for changes to the user's sign-in state.
*
* @remarks
* To keep the old behavior, see {@link onIdTokenChanged}.
*
* @param auth - The {@link Auth} instance.
* @param nextOrObserver - callback triggered on change.
* @param error - Deprecated. This callback is never triggered. Errors
* on signing in/out can be caught in promises returned from
* sign-in/sign-out functions.
* @param completed - Deprecated. This callback is never triggered.
*
* @public
*/
function onAuthStateChanged(auth, nextOrObserver, error, completed) {
	return getModularInstance(auth).onAuthStateChanged(nextOrObserver, error, completed);
}
/**
* Sets the current language to the default device/browser preference.
*
* @param auth - The {@link Auth} instance.
*
* @public
*/
function useDeviceLanguage(auth) {
	getModularInstance(auth).useDeviceLanguage();
}
/**
* Asynchronously sets the provided user as {@link Auth.currentUser} on the
* {@link Auth} instance.
*
* @remarks
* A new instance copy of the user provided will be made and set as currentUser.
*
* This will trigger {@link onAuthStateChanged} and {@link onIdTokenChanged} listeners
* like other sign in methods.
*
* The operation fails with an error if the user to be updated belongs to a different Firebase
* project.
*
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @param auth - The {@link Auth} instance.
* @param user - The new {@link User}.
*
* @public
*/
function updateCurrentUser(auth, user) {
	return getModularInstance(auth).updateCurrentUser(user);
}
/**
* Signs out the current user.
*
* @remarks
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @param auth - The {@link Auth} instance.
*
* @public
*/
function signOut(auth) {
	return getModularInstance(auth).signOut();
}
/**
* Revokes the given access token. Currently only supports Apple OAuth access tokens.
*
* @param auth - The {@link Auth} instance.
* @param token - The Apple OAuth access token.
*
* @public
*/
function revokeAccessToken(auth, token) {
	return _castAuth(auth).revokeAccessToken(token);
}
/**
* Deletes and signs out the user.
*
* @remarks
* Important: this is a security-sensitive operation that requires the user to have recently
* signed in. If this requirement isn't met, ask the user to authenticate again and then call
* {@link reauthenticateWithCredential}.
*
* @param user - The user.
*
* @public
*/
function deleteUser(_x151) {
	return _deleteUser.apply(this, arguments);
}
function _deleteUser() {
	_deleteUser = _asyncToGenerator(function* (user) {
		return getModularInstance(user).delete();
	});
	return _deleteUser.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MultiFactorSessionImpl = class MultiFactorSessionImpl {
	constructor(type, credential, user) {
		this.type = type;
		this.credential = credential;
		this.user = user;
	}
	static _fromIdtoken(idToken, user) {
		return new MultiFactorSessionImpl("enroll", idToken, user);
	}
	static _fromMfaPendingCredential(mfaPendingCredential) {
		return new MultiFactorSessionImpl("signin", mfaPendingCredential);
	}
	toJSON() {
		return { multiFactorSession: { [this.type === "enroll" ? "idToken" : "pendingCredential"]: this.credential } };
	}
	static fromJSON(obj) {
		var _a, _b;
		if (obj === null || obj === void 0 ? void 0 : obj.multiFactorSession) {
			if ((_a = obj.multiFactorSession) === null || _a === void 0 ? void 0 : _a.pendingCredential) return MultiFactorSessionImpl._fromMfaPendingCredential(obj.multiFactorSession.pendingCredential);
			else if ((_b = obj.multiFactorSession) === null || _b === void 0 ? void 0 : _b.idToken) return MultiFactorSessionImpl._fromIdtoken(obj.multiFactorSession.idToken);
		}
		return null;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MultiFactorResolverImpl = class MultiFactorResolverImpl {
	constructor(session, hints, signInResolver) {
		this.session = session;
		this.hints = hints;
		this.signInResolver = signInResolver;
	}
	/** @internal */
	static _fromError(authExtern, error) {
		const auth = _castAuth(authExtern);
		const serverResponse = error.customData._serverResponse;
		const hints = (serverResponse.mfaInfo || []).map((enrollment) => MultiFactorInfoImpl._fromServerResponse(auth, enrollment));
		_assert(serverResponse.mfaPendingCredential, auth, "internal-error");
		const session = MultiFactorSessionImpl._fromMfaPendingCredential(serverResponse.mfaPendingCredential);
		return new MultiFactorResolverImpl(session, hints, function() {
			var _ref8 = _asyncToGenerator(function* (assertion) {
				const mfaResponse = yield assertion._process(auth, session);
				delete serverResponse.mfaInfo;
				delete serverResponse.mfaPendingCredential;
				const idTokenResponse = Object.assign(Object.assign({}, serverResponse), {
					idToken: mfaResponse.idToken,
					refreshToken: mfaResponse.refreshToken
				});
				switch (error.operationType) {
					case "signIn":
						const userCredential = yield UserCredentialImpl._fromIdTokenResponse(auth, error.operationType, idTokenResponse);
						yield auth._updateCurrentUser(userCredential.user);
						return userCredential;
					case "reauthenticate":
						_assert(error.user, auth, "internal-error");
						return UserCredentialImpl._forOperation(error.user, error.operationType, idTokenResponse);
					default: _fail(auth, "internal-error");
				}
			});
			return function(_x152) {
				return _ref8.apply(this, arguments);
			};
		}());
	}
	resolveSignIn(assertionExtern) {
		var _this39 = this;
		return _asyncToGenerator(function* () {
			const assertion = assertionExtern;
			return _this39.signInResolver(assertion);
		})();
	}
};
/**
* Provides a {@link MultiFactorResolver} suitable for completion of a
* multi-factor flow.
*
* @param auth - The {@link Auth} instance.
* @param error - The {@link MultiFactorError} raised during a sign-in, or
* reauthentication operation.
*
* @public
*/
function getMultiFactorResolver(auth, error) {
	var _a;
	const authModular = getModularInstance(auth);
	const errorInternal = error;
	_assert(error.customData.operationType, authModular, "argument-error");
	_assert((_a = errorInternal.customData._serverResponse) === null || _a === void 0 ? void 0 : _a.mfaPendingCredential, authModular, "argument-error");
	return MultiFactorResolverImpl._fromError(authModular, errorInternal);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function startEnrollPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
}
function finalizeEnrollPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
}
function startEnrollTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
}
function finalizeEnrollTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
}
function withdrawMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:withdraw", _addTidIfNecessary(auth, request));
}
var MultiFactorUserImpl = class MultiFactorUserImpl {
	constructor(user) {
		this.user = user;
		this.enrolledFactors = [];
		user._onReload((userInfo) => {
			if (userInfo.mfaInfo) this.enrolledFactors = userInfo.mfaInfo.map((enrollment) => MultiFactorInfoImpl._fromServerResponse(user.auth, enrollment));
		});
	}
	static _fromUser(user) {
		return new MultiFactorUserImpl(user);
	}
	getSession() {
		var _this40 = this;
		return _asyncToGenerator(function* () {
			return MultiFactorSessionImpl._fromIdtoken(yield _this40.user.getIdToken(), _this40.user);
		})();
	}
	enroll(assertionExtern, displayName) {
		var _this41 = this;
		return _asyncToGenerator(function* () {
			const assertion = assertionExtern;
			const session = yield _this41.getSession();
			const finalizeMfaResponse = yield _logoutIfInvalidated(_this41.user, assertion._process(_this41.user.auth, session, displayName));
			yield _this41.user._updateTokensIfNecessary(finalizeMfaResponse);
			return _this41.user.reload();
		})();
	}
	unenroll(infoOrUid) {
		var _this42 = this;
		return _asyncToGenerator(function* () {
			const mfaEnrollmentId = typeof infoOrUid === "string" ? infoOrUid : infoOrUid.uid;
			const idToken = yield _this42.user.getIdToken();
			try {
				const idTokenResponse = yield _logoutIfInvalidated(_this42.user, withdrawMfa(_this42.user.auth, {
					idToken,
					mfaEnrollmentId
				}));
				_this42.enrolledFactors = _this42.enrolledFactors.filter(({ uid }) => uid !== mfaEnrollmentId);
				yield _this42.user._updateTokensIfNecessary(idTokenResponse);
				yield _this42.user.reload();
			} catch (e) {
				throw e;
			}
		})();
	}
};
var multiFactorUserCache = /* @__PURE__ */ new WeakMap();
/**
* The {@link MultiFactorUser} corresponding to the user.
*
* @remarks
* This is used to access all multi-factor properties and operations related to the user.
*
* @param user - The user.
*
* @public
*/
function multiFactor(user) {
	const userModular = getModularInstance(user);
	if (!multiFactorUserCache.has(userModular)) multiFactorUserCache.set(userModular, MultiFactorUserImpl._fromUser(userModular));
	return multiFactorUserCache.get(userModular);
}
var STORAGE_AVAILABLE_KEY = "__sak";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BrowserPersistenceClass = class {
	constructor(storageRetriever, type) {
		this.storageRetriever = storageRetriever;
		this.type = type;
	}
	_isAvailable() {
		try {
			if (!this.storage) return Promise.resolve(false);
			this.storage.setItem(STORAGE_AVAILABLE_KEY, "1");
			this.storage.removeItem(STORAGE_AVAILABLE_KEY);
			return Promise.resolve(true);
		} catch (_a) {
			return Promise.resolve(false);
		}
	}
	_set(key, value) {
		this.storage.setItem(key, JSON.stringify(value));
		return Promise.resolve();
	}
	_get(key) {
		const json = this.storage.getItem(key);
		return Promise.resolve(json ? JSON.parse(json) : null);
	}
	_remove(key) {
		this.storage.removeItem(key);
		return Promise.resolve();
	}
	get storage() {
		return this.storageRetriever();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _POLLING_INTERVAL_MS$1 = 1e3;
var IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
var BrowserLocalPersistence = class extends BrowserPersistenceClass {
	constructor() {
		super(() => window.localStorage, "LOCAL");
		this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);
		this.listeners = {};
		this.localCache = {};
		this.pollTimer = null;
		this.fallbackToPolling = _isMobileBrowser();
		this._shouldAllowMigration = true;
	}
	forAllChangedKeys(cb) {
		for (const key of Object.keys(this.listeners)) {
			const newValue = this.storage.getItem(key);
			const oldValue = this.localCache[key];
			if (newValue !== oldValue) cb(key, oldValue, newValue);
		}
	}
	onStorageEvent(event, poll = false) {
		if (!event.key) {
			this.forAllChangedKeys((key, _oldValue, newValue) => {
				this.notifyListeners(key, newValue);
			});
			return;
		}
		const key = event.key;
		if (poll) this.detachListener();
		else this.stopPolling();
		const triggerListeners = () => {
			const storedValue = this.storage.getItem(key);
			if (!poll && this.localCache[key] === storedValue) return;
			this.notifyListeners(key, storedValue);
		};
		const storedValue = this.storage.getItem(key);
		if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
		else triggerListeners();
	}
	notifyListeners(key, value) {
		this.localCache[key] = value;
		const listeners = this.listeners[key];
		if (listeners) for (const listener of Array.from(listeners)) listener(value ? JSON.parse(value) : value);
	}
	startPolling() {
		this.stopPolling();
		this.pollTimer = setInterval(() => {
			this.forAllChangedKeys((key, oldValue, newValue) => {
				this.onStorageEvent(new StorageEvent("storage", {
					key,
					oldValue,
					newValue
				}), true);
			});
		}, _POLLING_INTERVAL_MS$1);
	}
	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer);
			this.pollTimer = null;
		}
	}
	attachListener() {
		window.addEventListener("storage", this.boundEventHandler);
	}
	detachListener() {
		window.removeEventListener("storage", this.boundEventHandler);
	}
	_addListener(key, listener) {
		if (Object.keys(this.listeners).length === 0) if (this.fallbackToPolling) this.startPolling();
		else this.attachListener();
		if (!this.listeners[key]) {
			this.listeners[key] = /* @__PURE__ */ new Set();
			this.localCache[key] = this.storage.getItem(key);
		}
		this.listeners[key].add(listener);
	}
	_removeListener(key, listener) {
		if (this.listeners[key]) {
			this.listeners[key].delete(listener);
			if (this.listeners[key].size === 0) delete this.listeners[key];
		}
		if (Object.keys(this.listeners).length === 0) {
			this.detachListener();
			this.stopPolling();
		}
	}
	_set(key, value) {
		var _superprop_get_set = () => super._set, _this43 = this;
		return _asyncToGenerator(function* () {
			yield _superprop_get_set().call(_this43, key, value);
			_this43.localCache[key] = JSON.stringify(value);
		})();
	}
	_get(key) {
		var _superprop_get_get = () => super._get, _this44 = this;
		return _asyncToGenerator(function* () {
			const value = yield _superprop_get_get().call(_this44, key);
			_this44.localCache[key] = JSON.stringify(value);
			return value;
		})();
	}
	_remove(key) {
		var _superprop_get_remove = () => super._remove, _this45 = this;
		return _asyncToGenerator(function* () {
			yield _superprop_get_remove().call(_this45, key);
			delete _this45.localCache[key];
		})();
	}
};
BrowserLocalPersistence.type = "LOCAL";
/**
* An implementation of {@link Persistence} of type `LOCAL` using `localStorage`
* for the underlying storage.
*
* @public
*/
var browserLocalPersistence = BrowserLocalPersistence;
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var POLLING_INTERVAL_MS = 1e3;
function getDocumentCookie(name) {
	var _a, _b;
	const escapedName = name.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
	const matcher = RegExp(`${escapedName}=([^;]+)`);
	return (_b = (_a = document.cookie.match(matcher)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
}
function getCookieName(key) {
	return `${window.location.protocol === "http:" ? "__dev_" : "__HOST-"}FIREBASE_${key.split(":")[3]}`;
}
var CookiePersistence = class {
	constructor() {
		this.type = "COOKIE";
		this.listenerUnsubscribes = /* @__PURE__ */ new Map();
	}
	_getFinalTarget(originalUrl) {
		const url = new URL(`${window.location.origin}/__cookies__`);
		url.searchParams.set("finalTarget", originalUrl);
		return url;
	}
	_isAvailable() {
		return _asyncToGenerator(function* () {
			var _a;
			if (typeof isSecureContext === "boolean" && !isSecureContext) return false;
			if (typeof navigator === "undefined" || typeof document === "undefined") return false;
			return (_a = navigator.cookieEnabled) !== null && _a !== void 0 ? _a : true;
		})();
	}
	_set(_key, _value) {
		return _asyncToGenerator(function* () {})();
	}
	_get(key) {
		var _this46 = this;
		return _asyncToGenerator(function* () {
			if (!_this46._isAvailable()) return null;
			const name = getCookieName(key);
			if (window.cookieStore) {
				const cookie = yield window.cookieStore.get(name);
				return cookie === null || cookie === void 0 ? void 0 : cookie.value;
			}
			return getDocumentCookie(name);
		})();
	}
	_remove(key) {
		var _this47 = this;
		return _asyncToGenerator(function* () {
			if (!_this47._isAvailable()) return;
			if (!(yield _this47._get(key))) return;
			const name = getCookieName(key);
			document.cookie = `${name}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`;
			yield fetch(`/__cookies__`, { method: "DELETE" }).catch(() => void 0);
		})();
	}
	_addListener(key, listener) {
		if (!this._isAvailable()) return;
		const name = getCookieName(key);
		if (window.cookieStore) {
			const cb = ((event) => {
				const changedCookie = event.changed.find((change) => change.name === name);
				if (changedCookie) listener(changedCookie.value);
				if (event.deleted.find((change) => change.name === name)) listener(null);
			});
			const unsubscribe = () => window.cookieStore.removeEventListener("change", cb);
			this.listenerUnsubscribes.set(listener, unsubscribe);
			return window.cookieStore.addEventListener("change", cb);
		}
		let lastValue = getDocumentCookie(name);
		const interval = setInterval(() => {
			const currentValue = getDocumentCookie(name);
			if (currentValue !== lastValue) {
				listener(currentValue);
				lastValue = currentValue;
			}
		}, POLLING_INTERVAL_MS);
		const unsubscribe = () => clearInterval(interval);
		this.listenerUnsubscribes.set(listener, unsubscribe);
	}
	_removeListener(_key, listener) {
		const unsubscribe = this.listenerUnsubscribes.get(listener);
		if (!unsubscribe) return;
		unsubscribe();
		this.listenerUnsubscribes.delete(listener);
	}
};
CookiePersistence.type = "COOKIE";
/**
* An implementation of {@link Persistence} of type `COOKIE`, for use on the client side in
* applications leveraging hybrid rendering and middleware.
*
* @remarks This persistence method requires companion middleware to function, such as that provided
* by {@link https://firebaseopensource.com/projects/firebaseextended/reactfire/ | ReactFire} for
* NextJS.
* @beta
*/
var browserCookiePersistence = CookiePersistence;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BrowserSessionPersistence = class extends BrowserPersistenceClass {
	constructor() {
		super(() => window.sessionStorage, "SESSION");
	}
	_addListener(_key, _listener) {}
	_removeListener(_key, _listener) {}
};
BrowserSessionPersistence.type = "SESSION";
/**
* An implementation of {@link Persistence} of `SESSION` using `sessionStorage`
* for the underlying storage.
*
* @public
*/
var browserSessionPersistence = BrowserSessionPersistence;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Shim for Promise.allSettled, note the slightly different format of `fulfilled` vs `status`.
*
* @param promises - Array of promises to wait on.
*/
function _allSettled(promises) {
	return Promise.all(promises.map(function() {
		var _ref9 = _asyncToGenerator(function* (promise) {
			try {
				return {
					fulfilled: true,
					value: yield promise
				};
			} catch (reason) {
				return {
					fulfilled: false,
					reason
				};
			}
		});
		return function(_x153) {
			return _ref9.apply(this, arguments);
		};
	}()));
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface class for receiving messages.
*
*/
var Receiver = class Receiver {
	constructor(eventTarget) {
		this.eventTarget = eventTarget;
		this.handlersMap = {};
		this.boundEventHandler = this.handleEvent.bind(this);
	}
	/**
	* Obtain an instance of a Receiver for a given event target, if none exists it will be created.
	*
	* @param eventTarget - An event target (such as window or self) through which the underlying
	* messages will be received.
	*/
	static _getInstance(eventTarget) {
		const existingInstance = this.receivers.find((receiver) => receiver.isListeningto(eventTarget));
		if (existingInstance) return existingInstance;
		const newInstance = new Receiver(eventTarget);
		this.receivers.push(newInstance);
		return newInstance;
	}
	isListeningto(eventTarget) {
		return this.eventTarget === eventTarget;
	}
	/**
	* Fans out a MessageEvent to the appropriate listeners.
	*
	* @remarks
	* Sends an {@link Status.ACK} upon receipt and a {@link Status.DONE} once all handlers have
	* finished processing.
	*
	* @param event - The MessageEvent.
	*
	*/
	handleEvent(event) {
		var _this48 = this;
		return _asyncToGenerator(function* () {
			const messageEvent = event;
			const { eventId, eventType, data } = messageEvent.data;
			const handlers = _this48.handlersMap[eventType];
			if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) return;
			messageEvent.ports[0].postMessage({
				status: "ack",
				eventId,
				eventType
			});
			const response = yield _allSettled(Array.from(handlers).map(function() {
				var _ref10 = _asyncToGenerator(function* (handler) {
					return handler(messageEvent.origin, data);
				});
				return function(_x154) {
					return _ref10.apply(this, arguments);
				};
			}()));
			messageEvent.ports[0].postMessage({
				status: "done",
				eventId,
				eventType,
				response
			});
		})();
	}
	/**
	* Subscribe an event handler for a particular event.
	*
	* @param eventType - Event name to subscribe to.
	* @param eventHandler - The event handler which should receive the events.
	*
	*/
	_subscribe(eventType, eventHandler) {
		if (Object.keys(this.handlersMap).length === 0) this.eventTarget.addEventListener("message", this.boundEventHandler);
		if (!this.handlersMap[eventType]) this.handlersMap[eventType] = /* @__PURE__ */ new Set();
		this.handlersMap[eventType].add(eventHandler);
	}
	/**
	* Unsubscribe an event handler from a particular event.
	*
	* @param eventType - Event name to unsubscribe from.
	* @param eventHandler - Optional event handler, if none provided, unsubscribe all handlers on this event.
	*
	*/
	_unsubscribe(eventType, eventHandler) {
		if (this.handlersMap[eventType] && eventHandler) this.handlersMap[eventType].delete(eventHandler);
		if (!eventHandler || this.handlersMap[eventType].size === 0) delete this.handlersMap[eventType];
		if (Object.keys(this.handlersMap).length === 0) this.eventTarget.removeEventListener("message", this.boundEventHandler);
	}
};
Receiver.receivers = [];
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _generateEventId(prefix = "", digits = 10) {
	let random = "";
	for (let i = 0; i < digits; i++) random += Math.floor(Math.random() * 10);
	return prefix + random;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface for sending messages and waiting for a completion response.
*
*/
var Sender = class {
	constructor(target) {
		this.target = target;
		this.handlers = /* @__PURE__ */ new Set();
	}
	/**
	* Unsubscribe the handler and remove it from our tracking Set.
	*
	* @param handler - The handler to unsubscribe.
	*/
	removeMessageHandler(handler) {
		if (handler.messageChannel) {
			handler.messageChannel.port1.removeEventListener("message", handler.onMessage);
			handler.messageChannel.port1.close();
		}
		this.handlers.delete(handler);
	}
	/**
	* Send a message to the Receiver located at {@link target}.
	*
	* @remarks
	* We'll first wait a bit for an ACK , if we get one we will wait significantly longer until the
	* receiver has had a chance to fully process the event.
	*
	* @param eventType - Type of event to send.
	* @param data - The payload of the event.
	* @param timeout - Timeout for waiting on an ACK from the receiver.
	*
	* @returns An array of settled promises from all the handlers that were listening on the receiver.
	*/
	_send(eventType, data, timeout = 50) {
		var _this49 = this;
		return _asyncToGenerator(function* () {
			const messageChannel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
			if (!messageChannel) throw new Error("connection_unavailable");
			let completionTimer;
			let handler;
			return new Promise((resolve, reject) => {
				const eventId = _generateEventId("", 20);
				messageChannel.port1.start();
				const ackTimer = setTimeout(() => {
					reject(/* @__PURE__ */ new Error("unsupported_event"));
				}, timeout);
				handler = {
					messageChannel,
					onMessage(event) {
						const messageEvent = event;
						if (messageEvent.data.eventId !== eventId) return;
						switch (messageEvent.data.status) {
							case "ack":
								clearTimeout(ackTimer);
								completionTimer = setTimeout(() => {
									reject(/* @__PURE__ */ new Error("timeout"));
								}, 3e3);
								break;
							case "done":
								clearTimeout(completionTimer);
								resolve(messageEvent.data.response);
								break;
							default:
								clearTimeout(ackTimer);
								clearTimeout(completionTimer);
								reject(/* @__PURE__ */ new Error("invalid_response"));
								break;
						}
					}
				};
				_this49.handlers.add(handler);
				messageChannel.port1.addEventListener("message", handler.onMessage);
				_this49.target.postMessage({
					eventType,
					eventId,
					data
				}, [messageChannel.port2]);
			}).finally(() => {
				if (handler) _this49.removeMessageHandler(handler);
			});
		})();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Lazy accessor for window, since the compat layer won't tree shake this out,
* we need to make sure not to mess with window unless we have to
*/
function _window() {
	return window;
}
function _setWindowLocation(url) {
	_window().location.href = url;
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _isWorker() {
	return typeof _window()["WorkerGlobalScope"] !== "undefined" && typeof _window()["importScripts"] === "function";
}
function _getActiveServiceWorker() {
	return _getActiveServiceWorker2.apply(this, arguments);
}
function _getActiveServiceWorker2() {
	_getActiveServiceWorker2 = _asyncToGenerator(function* () {
		if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) return null;
		try {
			return (yield navigator.serviceWorker.ready).active;
		} catch (_a) {
			return null;
		}
	});
	return _getActiveServiceWorker2.apply(this, arguments);
}
function _getServiceWorkerController() {
	var _a;
	return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
}
function _getWorkerGlobalScope() {
	return _isWorker() ? self : null;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DB_NAME = "firebaseLocalStorageDb";
var DB_VERSION = 1;
var DB_OBJECTSTORE_NAME = "firebaseLocalStorage";
var DB_DATA_KEYPATH = "fbase_key";
/**
* Promise wrapper for IDBRequest
*
* Unfortunately we can't cleanly extend Promise<T> since promises are not callable in ES6
*
*/
var DBPromise = class {
	constructor(request) {
		this.request = request;
	}
	toPromise() {
		return new Promise((resolve, reject) => {
			this.request.addEventListener("success", () => {
				resolve(this.request.result);
			});
			this.request.addEventListener("error", () => {
				reject(this.request.error);
			});
		});
	}
};
function getObjectStore(db, isReadWrite) {
	return db.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? "readwrite" : "readonly").objectStore(DB_OBJECTSTORE_NAME);
}
function _deleteDatabase() {
	return new DBPromise(indexedDB.deleteDatabase(DB_NAME)).toPromise();
}
function _openDatabase() {
	const request = indexedDB.open(DB_NAME, DB_VERSION);
	return new Promise((resolve, reject) => {
		request.addEventListener("error", () => {
			reject(request.error);
		});
		request.addEventListener("upgradeneeded", () => {
			const db = request.result;
			try {
				db.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
			} catch (e) {
				reject(e);
			}
		});
		request.addEventListener("success", _asyncToGenerator(function* () {
			const db = request.result;
			if (!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
				db.close();
				yield _deleteDatabase();
				resolve(yield _openDatabase());
			} else resolve(db);
		}));
	});
}
function _putObject(_x155, _x156, _x157) {
	return _putObject2.apply(this, arguments);
}
function _putObject2() {
	_putObject2 = _asyncToGenerator(function* (db, key, value) {
		return new DBPromise(getObjectStore(db, true).put({
			[DB_DATA_KEYPATH]: key,
			value
		})).toPromise();
	});
	return _putObject2.apply(this, arguments);
}
function getObject(_x158, _x159) {
	return _getObject.apply(this, arguments);
}
function _getObject() {
	_getObject = _asyncToGenerator(function* (db, key) {
		const data = yield new DBPromise(getObjectStore(db, false).get(key)).toPromise();
		return data === void 0 ? null : data.value;
	});
	return _getObject.apply(this, arguments);
}
function _deleteObject(db, key) {
	return new DBPromise(getObjectStore(db, true).delete(key)).toPromise();
}
var _POLLING_INTERVAL_MS = 800;
var _TRANSACTION_RETRY_COUNT = 3;
var IndexedDBLocalPersistence = class {
	constructor() {
		this.type = "LOCAL";
		this._shouldAllowMigration = true;
		this.listeners = {};
		this.localCache = {};
		this.pollTimer = null;
		this.pendingWrites = 0;
		this.receiver = null;
		this.sender = null;
		this.serviceWorkerReceiverAvailable = false;
		this.activeServiceWorker = null;
		this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {});
	}
	_openDb() {
		var _this50 = this;
		return _asyncToGenerator(function* () {
			if (_this50.db) return _this50.db;
			_this50.db = yield _openDatabase();
			return _this50.db;
		})();
	}
	_withRetries(op) {
		var _this51 = this;
		return _asyncToGenerator(function* () {
			let numAttempts = 0;
			while (true) try {
				return yield op(yield _this51._openDb());
			} catch (e) {
				if (numAttempts++ > _TRANSACTION_RETRY_COUNT) throw e;
				if (_this51.db) {
					_this51.db.close();
					_this51.db = void 0;
				}
			}
		})();
	}
	/**
	* IndexedDB events do not propagate from the main window to the worker context.  We rely on a
	* postMessage interface to send these events to the worker ourselves.
	*/
	initializeServiceWorkerMessaging() {
		var _this52 = this;
		return _asyncToGenerator(function* () {
			return _isWorker() ? _this52.initializeReceiver() : _this52.initializeSender();
		})();
	}
	/**
	* As the worker we should listen to events from the main window.
	*/
	initializeReceiver() {
		var _this53 = this;
		return _asyncToGenerator(function* () {
			_this53.receiver = Receiver._getInstance(_getWorkerGlobalScope());
			_this53.receiver._subscribe("keyChanged", function() {
				var _ref11 = _asyncToGenerator(function* (_origin, data) {
					return { keyProcessed: (yield _this53._poll()).includes(data.key) };
				});
				return function(_x160, _x161) {
					return _ref11.apply(this, arguments);
				};
			}());
			_this53.receiver._subscribe("ping", function() {
				var _ref12 = _asyncToGenerator(function* (_origin, _data) {
					return ["keyChanged"];
				});
				return function(_x162, _x163) {
					return _ref12.apply(this, arguments);
				};
			}());
		})();
	}
	/**
	* As the main window, we should let the worker know when keys change (set and remove).
	*
	* @remarks
	* {@link https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready | ServiceWorkerContainer.ready}
	* may not resolve.
	*/
	initializeSender() {
		var _this54 = this;
		return _asyncToGenerator(function* () {
			var _a, _b;
			_this54.activeServiceWorker = yield _getActiveServiceWorker();
			if (!_this54.activeServiceWorker) return;
			_this54.sender = new Sender(_this54.activeServiceWorker);
			const results = yield _this54.sender._send("ping", {}, 800);
			if (!results) return;
			if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"))) _this54.serviceWorkerReceiverAvailable = true;
		})();
	}
	/**
	* Let the worker know about a changed key, the exact key doesn't technically matter since the
	* worker will just trigger a full sync anyway.
	*
	* @remarks
	* For now, we only support one service worker per page.
	*
	* @param key - Storage key which changed.
	*/
	notifyServiceWorker(key) {
		var _this55 = this;
		return _asyncToGenerator(function* () {
			if (!_this55.sender || !_this55.activeServiceWorker || _getServiceWorkerController() !== _this55.activeServiceWorker) return;
			try {
				yield _this55.sender._send("keyChanged", { key }, _this55.serviceWorkerReceiverAvailable ? 800 : 50);
			} catch (_a) {}
		})();
	}
	_isAvailable() {
		return _asyncToGenerator(function* () {
			try {
				if (!indexedDB) return false;
				const db = yield _openDatabase();
				yield _putObject(db, STORAGE_AVAILABLE_KEY, "1");
				yield _deleteObject(db, STORAGE_AVAILABLE_KEY);
				return true;
			} catch (_a) {}
			return false;
		})();
	}
	_withPendingWrite(write) {
		var _this56 = this;
		return _asyncToGenerator(function* () {
			_this56.pendingWrites++;
			try {
				yield write();
			} finally {
				_this56.pendingWrites--;
			}
		})();
	}
	_set(key, value) {
		var _this57 = this;
		return _asyncToGenerator(function* () {
			return _this57._withPendingWrite(_asyncToGenerator(function* () {
				yield _this57._withRetries((db) => _putObject(db, key, value));
				_this57.localCache[key] = value;
				return _this57.notifyServiceWorker(key);
			}));
		})();
	}
	_get(key) {
		var _this58 = this;
		return _asyncToGenerator(function* () {
			const obj = yield _this58._withRetries((db) => getObject(db, key));
			_this58.localCache[key] = obj;
			return obj;
		})();
	}
	_remove(key) {
		var _this59 = this;
		return _asyncToGenerator(function* () {
			return _this59._withPendingWrite(_asyncToGenerator(function* () {
				yield _this59._withRetries((db) => _deleteObject(db, key));
				delete _this59.localCache[key];
				return _this59.notifyServiceWorker(key);
			}));
		})();
	}
	_poll() {
		var _this60 = this;
		return _asyncToGenerator(function* () {
			const result = yield _this60._withRetries((db) => {
				return new DBPromise(getObjectStore(db, false).getAll()).toPromise();
			});
			if (!result) return [];
			if (_this60.pendingWrites !== 0) return [];
			const keys = [];
			const keysInResult = /* @__PURE__ */ new Set();
			if (result.length !== 0) for (const { fbase_key: key, value } of result) {
				keysInResult.add(key);
				if (JSON.stringify(_this60.localCache[key]) !== JSON.stringify(value)) {
					_this60.notifyListeners(key, value);
					keys.push(key);
				}
			}
			for (const localKey of Object.keys(_this60.localCache)) if (_this60.localCache[localKey] && !keysInResult.has(localKey)) {
				_this60.notifyListeners(localKey, null);
				keys.push(localKey);
			}
			return keys;
		})();
	}
	notifyListeners(key, newValue) {
		this.localCache[key] = newValue;
		const listeners = this.listeners[key];
		if (listeners) for (const listener of Array.from(listeners)) listener(newValue);
	}
	startPolling() {
		var _this61 = this;
		this.stopPolling();
		this.pollTimer = setInterval(_asyncToGenerator(function* () {
			return _this61._poll();
		}), _POLLING_INTERVAL_MS);
	}
	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer);
			this.pollTimer = null;
		}
	}
	_addListener(key, listener) {
		if (Object.keys(this.listeners).length === 0) this.startPolling();
		if (!this.listeners[key]) {
			this.listeners[key] = /* @__PURE__ */ new Set();
			this._get(key);
		}
		this.listeners[key].add(listener);
	}
	_removeListener(key, listener) {
		if (this.listeners[key]) {
			this.listeners[key].delete(listener);
			if (this.listeners[key].size === 0) delete this.listeners[key];
		}
		if (Object.keys(this.listeners).length === 0) this.stopPolling();
	}
};
IndexedDBLocalPersistence.type = "LOCAL";
/**
* An implementation of {@link Persistence} of type `LOCAL` using `indexedDB`
* for the underlying storage.
*
* @public
*/
var indexedDBLocalPersistence = IndexedDBLocalPersistence;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function startSignInPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:start", _addTidIfNecessary(auth, request));
}
function finalizeSignInPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
}
function finalizeSignInTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _JSLOAD_CALLBACK = _generateCallbackName("rcb");
var NETWORK_TIMEOUT_DELAY = new Delay(3e4, 6e4);
/**
* Loader for the GReCaptcha library. There should only ever be one of this.
*/
var ReCaptchaLoaderImpl = class {
	constructor() {
		var _a;
		this.hostLanguage = "";
		this.counter = 0;
		/**
		* Check for `render()` method. `window.grecaptcha` will exist if the Enterprise
		* version of the ReCAPTCHA script was loaded by someone else (e.g. App Check) but
		* `window.grecaptcha.render()` will not. Another load will add it.
		*/
		this.librarySeparatelyLoaded = !!((_a = _window().grecaptcha) === null || _a === void 0 ? void 0 : _a.render);
	}
	load(auth, hl = "") {
		_assert(isHostLanguageValid(hl), auth, "argument-error");
		if (this.shouldResolveImmediately(hl) && isV2(_window().grecaptcha)) return Promise.resolve(_window().grecaptcha);
		return new Promise((resolve, reject) => {
			const networkTimeout = _window().setTimeout(() => {
				reject(_createError(auth, "network-request-failed"));
			}, NETWORK_TIMEOUT_DELAY.get());
			_window()[_JSLOAD_CALLBACK] = () => {
				_window().clearTimeout(networkTimeout);
				delete _window()[_JSLOAD_CALLBACK];
				const recaptcha = _window().grecaptcha;
				if (!recaptcha || !isV2(recaptcha)) {
					reject(_createError(auth, "internal-error"));
					return;
				}
				const render = recaptcha.render;
				recaptcha.render = (container, params) => {
					const widgetId = render(container, params);
					this.counter++;
					return widgetId;
				};
				this.hostLanguage = hl;
				resolve(recaptcha);
			};
			_loadJS(`${_recaptchaV2ScriptUrl()}?${querystring({
				onload: _JSLOAD_CALLBACK,
				render: "explicit",
				hl
			})}`).catch(() => {
				clearTimeout(networkTimeout);
				reject(_createError(auth, "internal-error"));
			});
		});
	}
	clearedOneInstance() {
		this.counter--;
	}
	shouldResolveImmediately(hl) {
		var _a;
		return !!((_a = _window().grecaptcha) === null || _a === void 0 ? void 0 : _a.render) && (hl === this.hostLanguage || this.counter > 0 || this.librarySeparatelyLoaded);
	}
};
function isHostLanguageValid(hl) {
	return hl.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(hl);
}
var MockReCaptchaLoaderImpl = class {
	load(auth) {
		return _asyncToGenerator(function* () {
			return new MockReCaptcha(auth);
		})();
	}
	clearedOneInstance() {}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var RECAPTCHA_VERIFIER_TYPE = "recaptcha";
var DEFAULT_PARAMS = {
	theme: "light",
	type: "image"
};
/**
* An {@link https://www.google.com/recaptcha/ | reCAPTCHA}-based application verifier.
*
* @remarks
* `RecaptchaVerifier` does not work in a Node.js environment.
*
* @public
*/
var RecaptchaVerifier = class {
	/**
	* @param authExtern - The corresponding Firebase {@link Auth} instance.
	*
	* @param containerOrId - The reCAPTCHA container parameter.
	*
	* @remarks
	* This has different meaning depending on whether the reCAPTCHA is hidden or visible. For a
	* visible reCAPTCHA the container must be empty. If a string is used, it has to correspond to
	* an element ID. The corresponding element must also must be in the DOM at the time of
	* initialization.
	*
	* @param parameters - The optional reCAPTCHA parameters.
	*
	* @remarks
	* Check the reCAPTCHA docs for a comprehensive list. All parameters are accepted except for
	* the sitekey. Firebase Auth backend provisions a reCAPTCHA for each project and will
	* configure this upon rendering. For an invisible reCAPTCHA, a size key must have the value
	* 'invisible'.
	*/
	constructor(authExtern, containerOrId, parameters = Object.assign({}, DEFAULT_PARAMS)) {
		this.parameters = parameters;
		/**
		* The application verifier type.
		*
		* @remarks
		* For a reCAPTCHA verifier, this is 'recaptcha'.
		*/
		this.type = RECAPTCHA_VERIFIER_TYPE;
		this.destroyed = false;
		this.widgetId = null;
		this.tokenChangeListeners = /* @__PURE__ */ new Set();
		this.renderPromise = null;
		this.recaptcha = null;
		this.auth = _castAuth(authExtern);
		this.isInvisible = this.parameters.size === "invisible";
		_assert(typeof document !== "undefined", this.auth, "operation-not-supported-in-this-environment");
		const container = typeof containerOrId === "string" ? document.getElementById(containerOrId) : containerOrId;
		_assert(container, this.auth, "argument-error");
		this.container = container;
		this.parameters.callback = this.makeTokenCallback(this.parameters.callback);
		this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting ? new MockReCaptchaLoaderImpl() : new ReCaptchaLoaderImpl();
		this.validateStartingState();
	}
	/**
	* Waits for the user to solve the reCAPTCHA and resolves with the reCAPTCHA token.
	*
	* @returns A Promise for the reCAPTCHA token.
	*/
	verify() {
		var _this62 = this;
		return _asyncToGenerator(function* () {
			_this62.assertNotDestroyed();
			const id = yield _this62.render();
			const recaptcha = _this62.getAssertedRecaptcha();
			const response = recaptcha.getResponse(id);
			if (response) return response;
			return new Promise((resolve) => {
				const tokenChange = (token) => {
					if (!token) return;
					_this62.tokenChangeListeners.delete(tokenChange);
					resolve(token);
				};
				_this62.tokenChangeListeners.add(tokenChange);
				if (_this62.isInvisible) recaptcha.execute(id);
			});
		})();
	}
	/**
	* Renders the reCAPTCHA widget on the page.
	*
	* @returns A Promise that resolves with the reCAPTCHA widget ID.
	*/
	render() {
		try {
			this.assertNotDestroyed();
		} catch (e) {
			return Promise.reject(e);
		}
		if (this.renderPromise) return this.renderPromise;
		this.renderPromise = this.makeRenderPromise().catch((e) => {
			this.renderPromise = null;
			throw e;
		});
		return this.renderPromise;
	}
	/** @internal */
	_reset() {
		this.assertNotDestroyed();
		if (this.widgetId !== null) this.getAssertedRecaptcha().reset(this.widgetId);
	}
	/**
	* Clears the reCAPTCHA widget from the page and destroys the instance.
	*/
	clear() {
		this.assertNotDestroyed();
		this.destroyed = true;
		this._recaptchaLoader.clearedOneInstance();
		if (!this.isInvisible) this.container.childNodes.forEach((node) => {
			this.container.removeChild(node);
		});
	}
	validateStartingState() {
		_assert(!this.parameters.sitekey, this.auth, "argument-error");
		_assert(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error");
		_assert(typeof document !== "undefined", this.auth, "operation-not-supported-in-this-environment");
	}
	makeTokenCallback(existing) {
		return (token) => {
			this.tokenChangeListeners.forEach((listener) => listener(token));
			if (typeof existing === "function") existing(token);
			else if (typeof existing === "string") {
				const globalFunc = _window()[existing];
				if (typeof globalFunc === "function") globalFunc(token);
			}
		};
	}
	assertNotDestroyed() {
		_assert(!this.destroyed, this.auth, "internal-error");
	}
	makeRenderPromise() {
		var _this63 = this;
		return _asyncToGenerator(function* () {
			yield _this63.init();
			if (!_this63.widgetId) {
				let container = _this63.container;
				if (!_this63.isInvisible) {
					const guaranteedEmpty = document.createElement("div");
					container.appendChild(guaranteedEmpty);
					container = guaranteedEmpty;
				}
				_this63.widgetId = _this63.getAssertedRecaptcha().render(container, _this63.parameters);
			}
			return _this63.widgetId;
		})();
	}
	init() {
		var _this64 = this;
		return _asyncToGenerator(function* () {
			_assert(_isHttpOrHttps() && !_isWorker(), _this64.auth, "internal-error");
			yield domReady();
			_this64.recaptcha = yield _this64._recaptchaLoader.load(_this64.auth, _this64.auth.languageCode || void 0);
			const siteKey = yield getRecaptchaParams(_this64.auth);
			_assert(siteKey, _this64.auth, "internal-error");
			_this64.parameters.sitekey = siteKey;
		})();
	}
	getAssertedRecaptcha() {
		_assert(this.recaptcha, this.auth, "internal-error");
		return this.recaptcha;
	}
};
function domReady() {
	let resolver = null;
	return new Promise((resolve) => {
		if (document.readyState === "complete") {
			resolve();
			return;
		}
		resolver = () => resolve();
		window.addEventListener("load", resolver);
	}).catch((e) => {
		if (resolver) window.removeEventListener("load", resolver);
		throw e;
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ConfirmationResultImpl = class {
	constructor(verificationId, onConfirmation) {
		this.verificationId = verificationId;
		this.onConfirmation = onConfirmation;
	}
	confirm(verificationCode) {
		const authCredential = PhoneAuthCredential._fromVerification(this.verificationId, verificationCode);
		return this.onConfirmation(authCredential);
	}
};
/**
* Asynchronously signs in using a phone number.
*
* @remarks
* This method sends a code via SMS to the given
* phone number, and returns a {@link ConfirmationResult}. After the user
* provides the code sent to their phone, call {@link ConfirmationResult.confirm}
* with the code to sign the user in.
*
* For abuse prevention, this method requires a {@link ApplicationVerifier}.
* This SDK includes an implementation based on reCAPTCHA v2, {@link RecaptchaVerifier}.
* This function can work on other platforms that do not support the
* {@link RecaptchaVerifier} (like React Native), but you need to use a
* third-party {@link ApplicationVerifier} implementation.
*
* If you've enabled project-level reCAPTCHA Enterprise bot protection in
* Enforce mode, you can omit the {@link ApplicationVerifier}.
*
* This method does not work in a Node.js environment or with {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // 'recaptcha-container' is the ID of an element in the DOM.
* const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
* const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
* // Obtain a verificationCode from the user.
* const credential = await confirmationResult.confirm(verificationCode);
* ```
*
* @param auth - The {@link Auth} instance.
* @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
* @param appVerifier - The {@link ApplicationVerifier}.
*
* @public
*/
function signInWithPhoneNumber(_x164, _x165, _x166) {
	return _signInWithPhoneNumber.apply(this, arguments);
}
function _signInWithPhoneNumber() {
	_signInWithPhoneNumber = _asyncToGenerator(function* (auth, phoneNumber, appVerifier) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const authInternal = _castAuth(auth);
		return new ConfirmationResultImpl(yield _verifyPhoneNumber(authInternal, phoneNumber, getModularInstance(appVerifier)), (cred) => signInWithCredential(authInternal, cred));
	});
	return _signInWithPhoneNumber.apply(this, arguments);
}
/**
* Links the user account with the given phone number.
*
* @remarks
* This method does not work in a Node.js environment.
*
* @param user - The user.
* @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
* @param appVerifier - The {@link ApplicationVerifier}.
*
* @public
*/
function linkWithPhoneNumber(_x167, _x168, _x169) {
	return _linkWithPhoneNumber.apply(this, arguments);
}
function _linkWithPhoneNumber() {
	_linkWithPhoneNumber = _asyncToGenerator(function* (user, phoneNumber, appVerifier) {
		const userInternal = getModularInstance(user);
		yield _assertLinkedStatus(false, userInternal, "phone");
		return new ConfirmationResultImpl(yield _verifyPhoneNumber(userInternal.auth, phoneNumber, getModularInstance(appVerifier)), (cred) => linkWithCredential(userInternal, cred));
	});
	return _linkWithPhoneNumber.apply(this, arguments);
}
/**
* Re-authenticates a user using a fresh phone credential.
*
* @remarks
* Use before operations such as {@link updatePassword} that require tokens from recent sign-in attempts.
*
* This method does not work in a Node.js environment or on any {@link User} signed in by
* {@link Auth} instances created with a {@link @firebase/app#FirebaseServerApp}.
*
* @param user - The user.
* @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
* @param appVerifier - The {@link ApplicationVerifier}.
*
* @public
*/
function reauthenticateWithPhoneNumber(_x170, _x171, _x172) {
	return _reauthenticateWithPhoneNumber.apply(this, arguments);
}
function _reauthenticateWithPhoneNumber() {
	_reauthenticateWithPhoneNumber = _asyncToGenerator(function* (user, phoneNumber, appVerifier) {
		const userInternal = getModularInstance(user);
		if (_isFirebaseServerApp(userInternal.auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth));
		return new ConfirmationResultImpl(yield _verifyPhoneNumber(userInternal.auth, phoneNumber, getModularInstance(appVerifier)), (cred) => reauthenticateWithCredential(userInternal, cred));
	});
	return _reauthenticateWithPhoneNumber.apply(this, arguments);
}
/**
* Returns a verification ID to be used in conjunction with the SMS code that is sent.
*
*/
function _verifyPhoneNumber(_x179, _x180, _x181) {
	return _verifyPhoneNumber2.apply(this, arguments);
}
function _verifyPhoneNumber2() {
	_verifyPhoneNumber2 = _asyncToGenerator(function* (auth, options, verifier) {
		var _a;
		if (!auth._getRecaptchaConfig()) try {
			yield _initializeRecaptchaConfig(auth);
		} catch (error) {
			console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.");
		}
		try {
			let phoneInfoOptions;
			if (typeof options === "string") phoneInfoOptions = { phoneNumber: options };
			else phoneInfoOptions = options;
			if ("session" in phoneInfoOptions) {
				const session = phoneInfoOptions.session;
				if ("phoneNumber" in phoneInfoOptions) {
					_assert(session.type === "enroll", auth, "internal-error");
					return (yield handleRecaptchaFlow(auth, {
						idToken: session.credential,
						phoneEnrollmentInfo: {
							phoneNumber: phoneInfoOptions.phoneNumber,
							clientType: "CLIENT_TYPE_WEB"
						}
					}, "mfaSmsEnrollment", function() {
						var _ref13 = _asyncToGenerator(function* (authInstance, request) {
							if (request.phoneEnrollmentInfo.captchaResponse === FAKE_TOKEN) {
								_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
								return startEnrollPhoneMfa(authInstance, yield injectRecaptchaV2Token(authInstance, request, verifier));
							}
							return startEnrollPhoneMfa(authInstance, request);
						});
						return function startEnrollPhoneMfaActionCallback(_x173, _x174) {
							return _ref13.apply(this, arguments);
						};
					}(), "PHONE_PROVIDER").catch((error) => {
						return Promise.reject(error);
					})).phoneSessionInfo.sessionInfo;
				} else {
					_assert(session.type === "signin", auth, "internal-error");
					const mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;
					_assert(mfaEnrollmentId, auth, "missing-multi-factor-info");
					return (yield handleRecaptchaFlow(auth, {
						mfaPendingCredential: session.credential,
						mfaEnrollmentId,
						phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" }
					}, "mfaSmsSignIn", function() {
						var _ref14 = _asyncToGenerator(function* (authInstance, request) {
							if (request.phoneSignInInfo.captchaResponse === FAKE_TOKEN) {
								_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
								return startSignInPhoneMfa(authInstance, yield injectRecaptchaV2Token(authInstance, request, verifier));
							}
							return startSignInPhoneMfa(authInstance, request);
						});
						return function startSignInPhoneMfaActionCallback(_x175, _x176) {
							return _ref14.apply(this, arguments);
						};
					}(), "PHONE_PROVIDER").catch((error) => {
						return Promise.reject(error);
					})).phoneResponseInfo.sessionInfo;
				}
			} else return (yield handleRecaptchaFlow(auth, {
				phoneNumber: phoneInfoOptions.phoneNumber,
				clientType: "CLIENT_TYPE_WEB"
			}, "sendVerificationCode", function() {
				var _ref15 = _asyncToGenerator(function* (authInstance, request) {
					if (request.captchaResponse === FAKE_TOKEN) {
						_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
						return sendPhoneVerificationCode(authInstance, yield injectRecaptchaV2Token(authInstance, request, verifier));
					}
					return sendPhoneVerificationCode(authInstance, request);
				});
				return function sendPhoneVerificationCodeActionCallback(_x177, _x178) {
					return _ref15.apply(this, arguments);
				};
			}(), "PHONE_PROVIDER").catch((error) => {
				return Promise.reject(error);
			})).sessionInfo;
		} finally {
			verifier === null || verifier === void 0 || verifier._reset();
		}
	});
	return _verifyPhoneNumber2.apply(this, arguments);
}
/**
* Updates the user's phone number.
*
* @remarks
* This method does not work in a Node.js environment or on any {@link User} signed in by
* {@link Auth} instances created with a {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```
* // 'recaptcha-container' is the ID of an element in the DOM.
* const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
* const provider = new PhoneAuthProvider(auth);
* const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
* // Obtain the verificationCode from the user.
* const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
* await updatePhoneNumber(user, phoneCredential);
* ```
*
* @param user - The user.
* @param credential - A credential authenticating the new phone number.
*
* @public
*/
function updatePhoneNumber(_x182, _x183) {
	return _updatePhoneNumber.apply(this, arguments);
}
function _updatePhoneNumber() {
	_updatePhoneNumber = _asyncToGenerator(function* (user, credential) {
		const userInternal = getModularInstance(user);
		if (_isFirebaseServerApp(userInternal.auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth));
		yield _link$1(userInternal, credential);
	});
	return _updatePhoneNumber.apply(this, arguments);
}
function injectRecaptchaV2Token(_x184, _x185, _x186) {
	return _injectRecaptchaV2Token.apply(this, arguments);
}
function _injectRecaptchaV2Token() {
	_injectRecaptchaV2Token = _asyncToGenerator(function* (auth, request, recaptchaV2Verifier) {
		_assert(recaptchaV2Verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error");
		const recaptchaV2Token = yield recaptchaV2Verifier.verify();
		_assert(typeof recaptchaV2Token === "string", auth, "argument-error");
		const newRequest = Object.assign({}, request);
		if ("phoneEnrollmentInfo" in newRequest) {
			const phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
			const captchaResponse = newRequest.phoneEnrollmentInfo.captchaResponse;
			const clientType = newRequest.phoneEnrollmentInfo.clientType;
			const recaptchaVersion = newRequest.phoneEnrollmentInfo.recaptchaVersion;
			Object.assign(newRequest, { "phoneEnrollmentInfo": {
				phoneNumber,
				recaptchaToken: recaptchaV2Token,
				captchaResponse,
				clientType,
				recaptchaVersion
			} });
			return newRequest;
		} else if ("phoneSignInInfo" in newRequest) {
			const captchaResponse = newRequest.phoneSignInInfo.captchaResponse;
			const clientType = newRequest.phoneSignInInfo.clientType;
			const recaptchaVersion = newRequest.phoneSignInInfo.recaptchaVersion;
			Object.assign(newRequest, { "phoneSignInInfo": {
				recaptchaToken: recaptchaV2Token,
				captchaResponse,
				clientType,
				recaptchaVersion
			} });
			return newRequest;
		} else {
			Object.assign(newRequest, { "recaptchaToken": recaptchaV2Token });
			return newRequest;
		}
	});
	return _injectRecaptchaV2Token.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link PhoneAuthCredential}.
*
* @remarks
* `PhoneAuthProvider` does not work in a Node.js environment.
*
* @example
* ```javascript
* // 'recaptcha-container' is the ID of an element in the DOM.
* const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
* const provider = new PhoneAuthProvider(auth);
* const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
* // Obtain the verificationCode from the user.
* const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
* const userCredential = await signInWithCredential(auth, phoneCredential);
* ```
*
* @public
*/
var PhoneAuthProvider = class PhoneAuthProvider {
	/**
	* @param auth - The Firebase {@link Auth} instance in which sign-ins should occur.
	*
	*/
	constructor(auth) {
		/** Always set to {@link ProviderId}.PHONE. */
		this.providerId = PhoneAuthProvider.PROVIDER_ID;
		this.auth = _castAuth(auth);
	}
	/**
	*
	* Starts a phone number authentication flow by sending a verification code to the given phone
	* number.
	*
	* @example
	* ```javascript
	* const provider = new PhoneAuthProvider(auth);
	* const verificationId = await provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
	* const userCredential = await signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* An alternative flow is provided using the `signInWithPhoneNumber` method.
	* ```javascript
	* const confirmationResult = signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const userCredential = confirmationResult.confirm(verificationCode);
	* ```
	*
	* @param phoneInfoOptions - The user's {@link PhoneInfoOptions}. The phone number should be in
	* E.164 format (e.g. +16505550101).
	* @param applicationVerifier - An {@link ApplicationVerifier}, which prevents
	* requests from unauthorized clients. This SDK includes an implementation
	* based on reCAPTCHA v2, {@link RecaptchaVerifier}. If you've enabled
	* reCAPTCHA Enterprise bot protection in Enforce mode, this parameter is
	* optional; in all other configurations, the parameter is required.
	*
	* @returns A Promise for a verification ID that can be passed to
	* {@link PhoneAuthProvider.credential} to identify this flow.
	*/
	verifyPhoneNumber(phoneOptions, applicationVerifier) {
		return _verifyPhoneNumber(this.auth, phoneOptions, getModularInstance(applicationVerifier));
	}
	/**
	* Creates a phone auth credential, given the verification ID from
	* {@link PhoneAuthProvider.verifyPhoneNumber} and the code that was sent to the user's
	* mobile device.
	*
	* @example
	* ```javascript
	* const provider = new PhoneAuthProvider(auth);
	* const verificationId = provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
	* const userCredential = signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* An alternative flow is provided using the `signInWithPhoneNumber` method.
	* ```javascript
	* const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const userCredential = await confirmationResult.confirm(verificationCode);
	* ```
	*
	* @param verificationId - The verification ID returned from {@link PhoneAuthProvider.verifyPhoneNumber}.
	* @param verificationCode - The verification code sent to the user's mobile device.
	*
	* @returns The auth provider credential.
	*/
	static credential(verificationId, verificationCode) {
		return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
	}
	/**
	* Generates an {@link AuthCredential} from a {@link UserCredential}.
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		const credential = userCredential;
		return PhoneAuthProvider.credentialFromTaggedObject(credential);
	}
	/**
	* Returns an {@link AuthCredential} when passed an error.
	*
	* @remarks
	*
	* This method works for errors like
	* `auth/account-exists-with-different-credentials`. This is useful for
	* recovering when attempting to set a user's phone number but the number
	* in question is already tied to another account. For example, the following
	* code tries to update the current user's phone number, and if that
	* fails, links the user with the account associated with that number:
	*
	* ```js
	* const provider = new PhoneAuthProvider(auth);
	* const verificationId = await provider.verifyPhoneNumber(number, verifier);
	* try {
	*   const code = ''; // Prompt the user for the verification code
	*   await updatePhoneNumber(
	*       auth.currentUser,
	*       PhoneAuthProvider.credential(verificationId, code));
	* } catch (e) {
	*   if ((e as FirebaseError)?.code === 'auth/account-exists-with-different-credential') {
	*     const cred = PhoneAuthProvider.credentialFromError(e);
	*     await linkWithCredential(auth.currentUser, cred);
	*   }
	* }
	*
	* // At this point, auth.currentUser.phoneNumber === number.
	* ```
	*
	* @param error - The error to generate a credential from.
	*/
	static credentialFromError(error) {
		return PhoneAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { phoneNumber, temporaryProof } = tokenResponse;
		if (phoneNumber && temporaryProof) return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
		return null;
	}
};
/** Always set to {@link ProviderId}.PHONE. */
PhoneAuthProvider.PROVIDER_ID = "phone";
/** Always set to {@link SignInMethod}.PHONE. */
PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone";
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Chooses a popup/redirect resolver to use. This prefers the override (which
* is directly passed in), and falls back to the property set on the auth
* object. If neither are available, this function errors w/ an argument error.
*/
function _withDefaultResolver(auth, resolverOverride) {
	if (resolverOverride) return _getInstance(resolverOverride);
	_assert(auth._popupRedirectResolver, auth, "argument-error");
	return auth._popupRedirectResolver;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IdpCredential = class extends AuthCredential {
	constructor(params) {
		super("custom", "custom");
		this.params = params;
	}
	_getIdTokenResponse(auth) {
		return signInWithIdp(auth, this._buildIdpRequest());
	}
	_linkToIdToken(auth, idToken) {
		return signInWithIdp(auth, this._buildIdpRequest(idToken));
	}
	_getReauthenticationResolver(auth) {
		return signInWithIdp(auth, this._buildIdpRequest());
	}
	_buildIdpRequest(idToken) {
		const request = {
			requestUri: this.params.requestUri,
			sessionId: this.params.sessionId,
			postBody: this.params.postBody,
			tenantId: this.params.tenantId,
			pendingToken: this.params.pendingToken,
			returnSecureToken: true,
			returnIdpCredential: true
		};
		if (idToken) request.idToken = idToken;
		return request;
	}
};
function _signIn(params) {
	return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
}
function _reauth(params) {
	const { auth, user } = params;
	_assert(user, auth, "internal-error");
	return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
}
function _link(_x187) {
	return _link2.apply(this, arguments);
}
function _link2() {
	_link2 = _asyncToGenerator(function* (params) {
		const { auth, user } = params;
		_assert(user, auth, "internal-error");
		return _link$1(user, new IdpCredential(params), params.bypassAuthState);
	});
	return _link2.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Popup event manager. Handles the popup's entire lifecycle; listens to auth
* events
*/
var AbstractPopupRedirectOperation = class {
	constructor(auth, filter, resolver, user, bypassAuthState = false) {
		this.auth = auth;
		this.resolver = resolver;
		this.user = user;
		this.bypassAuthState = bypassAuthState;
		this.pendingPromise = null;
		this.eventManager = null;
		this.filter = Array.isArray(filter) ? filter : [filter];
	}
	execute() {
		var _this65 = this;
		return new Promise(function() {
			var _ref16 = _asyncToGenerator(function* (resolve, reject) {
				_this65.pendingPromise = {
					resolve,
					reject
				};
				try {
					_this65.eventManager = yield _this65.resolver._initialize(_this65.auth);
					yield _this65.onExecution();
					_this65.eventManager.registerConsumer(_this65);
				} catch (e) {
					_this65.reject(e);
				}
			});
			return function(_x188, _x189) {
				return _ref16.apply(this, arguments);
			};
		}());
	}
	onAuthEvent(event) {
		var _this66 = this;
		return _asyncToGenerator(function* () {
			const { urlResponse, sessionId, postBody, tenantId, error, type } = event;
			if (error) {
				_this66.reject(error);
				return;
			}
			const params = {
				auth: _this66.auth,
				requestUri: urlResponse,
				sessionId,
				tenantId: tenantId || void 0,
				postBody: postBody || void 0,
				user: _this66.user,
				bypassAuthState: _this66.bypassAuthState
			};
			try {
				_this66.resolve(yield _this66.getIdpTask(type)(params));
			} catch (e) {
				_this66.reject(e);
			}
		})();
	}
	onError(error) {
		this.reject(error);
	}
	getIdpTask(type) {
		switch (type) {
			case "signInViaPopup":
			case "signInViaRedirect": return _signIn;
			case "linkViaPopup":
			case "linkViaRedirect": return _link;
			case "reauthViaPopup":
			case "reauthViaRedirect": return _reauth;
			default: _fail(this.auth, "internal-error");
		}
	}
	resolve(cred) {
		debugAssert(this.pendingPromise, "Pending promise was never set");
		this.pendingPromise.resolve(cred);
		this.unregisterAndCleanUp();
	}
	reject(error) {
		debugAssert(this.pendingPromise, "Pending promise was never set");
		this.pendingPromise.reject(error);
		this.unregisterAndCleanUp();
	}
	unregisterAndCleanUp() {
		if (this.eventManager) this.eventManager.unregisterConsumer(this);
		this.pendingPromise = null;
		this.cleanUp();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2e3, 1e4);
/**
* Authenticates a Firebase client using a popup-based OAuth authentication flow.
*
* @remarks
* If succeeds, returns the signed in user along with the provider's credential. If sign in was
* unsuccessful, returns an error object containing additional information about the error.
*
* This method does not work in a Node.js environment or with {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new FacebookAuthProvider();
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Facebook Access Token.
* const credential = provider.credentialFromResult(auth, result);
* const token = credential.accessToken;
* ```
*
* @param auth - The {@link Auth} instance.
* @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
* Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
function signInWithPopup(_x190, _x191, _x192) {
	return _signInWithPopup.apply(this, arguments);
}
function _signInWithPopup() {
	_signInWithPopup = _asyncToGenerator(function* (auth, provider, resolver) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_createError(auth, "operation-not-supported-in-this-environment"));
		const authInternal = _castAuth(auth);
		_assertInstanceOf(auth, provider, FederatedAuthProvider);
		return new PopupOperation(authInternal, "signInViaPopup", provider, _withDefaultResolver(authInternal, resolver)).executeNotNull();
	});
	return _signInWithPopup.apply(this, arguments);
}
/**
* Reauthenticates the current user with the specified {@link OAuthProvider} using a pop-up based
* OAuth flow.
*
* @remarks
* If the reauthentication is successful, the returned result will contain the user and the
* provider's credential.
*
* This method does not work in a Node.js environment or on any {@link User} signed in by
* {@link Auth} instances created with a {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new FacebookAuthProvider();
* const result = await signInWithPopup(auth, provider);
* // Reauthenticate using a popup.
* await reauthenticateWithPopup(result.user, provider);
* ```
*
* @param user - The user.
* @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
* Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
function reauthenticateWithPopup(_x193, _x194, _x195) {
	return _reauthenticateWithPopup.apply(this, arguments);
}
function _reauthenticateWithPopup() {
	_reauthenticateWithPopup = _asyncToGenerator(function* (user, provider, resolver) {
		const userInternal = getModularInstance(user);
		if (_isFirebaseServerApp(userInternal.auth.app)) return Promise.reject(_createError(userInternal.auth, "operation-not-supported-in-this-environment"));
		_assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
		const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
		return new PopupOperation(userInternal.auth, "reauthViaPopup", provider, resolverInternal, userInternal).executeNotNull();
	});
	return _reauthenticateWithPopup.apply(this, arguments);
}
/**
* Links the authenticated provider to the user account using a pop-up based OAuth flow.
*
* @remarks
* If the linking is successful, the returned result will contain the user and the provider's credential.
*
* This method does not work in a Node.js environment.
*
* @example
* ```javascript
* // Sign in using some other provider.
* const result = await signInWithEmailAndPassword(auth, email, password);
* // Link using a popup.
* const provider = new FacebookAuthProvider();
* await linkWithPopup(result.user, provider);
* ```
*
* @param user - The user.
* @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
* Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
function linkWithPopup(_x196, _x197, _x198) {
	return _linkWithPopup.apply(this, arguments);
}
function _linkWithPopup() {
	_linkWithPopup = _asyncToGenerator(function* (user, provider, resolver) {
		const userInternal = getModularInstance(user);
		_assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
		const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
		return new PopupOperation(userInternal.auth, "linkViaPopup", provider, resolverInternal, userInternal).executeNotNull();
	});
	return _linkWithPopup.apply(this, arguments);
}
/**
* Popup event manager. Handles the popup's entire lifecycle; listens to auth
* events
*
*/
var PopupOperation = class PopupOperation extends AbstractPopupRedirectOperation {
	constructor(auth, filter, provider, resolver, user) {
		super(auth, filter, resolver, user);
		this.provider = provider;
		this.authWindow = null;
		this.pollId = null;
		if (PopupOperation.currentPopupAction) PopupOperation.currentPopupAction.cancel();
		PopupOperation.currentPopupAction = this;
	}
	executeNotNull() {
		var _this67 = this;
		return _asyncToGenerator(function* () {
			const result = yield _this67.execute();
			_assert(result, _this67.auth, "internal-error");
			return result;
		})();
	}
	onExecution() {
		var _this68 = this;
		return _asyncToGenerator(function* () {
			debugAssert(_this68.filter.length === 1, "Popup operations only handle one event");
			const eventId = _generateEventId();
			_this68.authWindow = yield _this68.resolver._openPopup(_this68.auth, _this68.provider, _this68.filter[0], eventId);
			_this68.authWindow.associatedEvent = eventId;
			_this68.resolver._originValidation(_this68.auth).catch((e) => {
				_this68.reject(e);
			});
			_this68.resolver._isIframeWebStorageSupported(_this68.auth, (isSupported) => {
				if (!isSupported) _this68.reject(_createError(_this68.auth, "web-storage-unsupported"));
			});
			_this68.pollUserCancellation();
		})();
	}
	get eventId() {
		var _a;
		return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
	}
	cancel() {
		this.reject(_createError(this.auth, "cancelled-popup-request"));
	}
	cleanUp() {
		if (this.authWindow) this.authWindow.close();
		if (this.pollId) window.clearTimeout(this.pollId);
		this.authWindow = null;
		this.pollId = null;
		PopupOperation.currentPopupAction = null;
	}
	pollUserCancellation() {
		const poll = () => {
			var _a, _b;
			if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
				this.pollId = window.setTimeout(() => {
					this.pollId = null;
					this.reject(_createError(this.auth, "popup-closed-by-user"));
				}, 8e3);
				return;
			}
			this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
		};
		poll();
	}
};
PopupOperation.currentPopupAction = null;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PENDING_REDIRECT_KEY = "pendingRedirect";
var redirectOutcomeMap = /* @__PURE__ */ new Map();
var RedirectAction = class extends AbstractPopupRedirectOperation {
	constructor(auth, resolver, bypassAuthState = false) {
		super(auth, [
			"signInViaRedirect",
			"linkViaRedirect",
			"reauthViaRedirect",
			"unknown"
		], resolver, void 0, bypassAuthState);
		this.eventId = null;
	}
	/**
	* Override the execute function; if we already have a redirect result, then
	* just return it.
	*/
	execute() {
		var _superprop_getExecute = () => super.execute, _this69 = this;
		return _asyncToGenerator(function* () {
			let readyOutcome = redirectOutcomeMap.get(_this69.auth._key());
			if (!readyOutcome) {
				try {
					const result = (yield _getAndClearPendingRedirectStatus(_this69.resolver, _this69.auth)) ? yield _superprop_getExecute().call(_this69) : null;
					readyOutcome = () => Promise.resolve(result);
				} catch (e) {
					readyOutcome = () => Promise.reject(e);
				}
				redirectOutcomeMap.set(_this69.auth._key(), readyOutcome);
			}
			if (!_this69.bypassAuthState) redirectOutcomeMap.set(_this69.auth._key(), () => Promise.resolve(null));
			return readyOutcome();
		})();
	}
	onAuthEvent(event) {
		var _superprop_getOnAuthEvent = () => super.onAuthEvent, _this70 = this;
		return _asyncToGenerator(function* () {
			if (event.type === "signInViaRedirect") return _superprop_getOnAuthEvent().call(_this70, event);
			else if (event.type === "unknown") {
				_this70.resolve(null);
				return;
			}
			if (event.eventId) {
				const user = yield _this70.auth._redirectUserForId(event.eventId);
				if (user) {
					_this70.user = user;
					return _superprop_getOnAuthEvent().call(_this70, event);
				} else _this70.resolve(null);
			}
		})();
	}
	onExecution() {
		return _asyncToGenerator(function* () {})();
	}
	cleanUp() {}
};
function _getAndClearPendingRedirectStatus(_x199, _x200) {
	return _getAndClearPendingRedirectStatus2.apply(this, arguments);
}
function _getAndClearPendingRedirectStatus2() {
	_getAndClearPendingRedirectStatus2 = _asyncToGenerator(function* (resolver, auth) {
		const key = pendingRedirectKey(auth);
		const persistence = resolverPersistence(resolver);
		if (!(yield persistence._isAvailable())) return false;
		const hasPendingRedirect = (yield persistence._get(key)) === "true";
		yield persistence._remove(key);
		return hasPendingRedirect;
	});
	return _getAndClearPendingRedirectStatus2.apply(this, arguments);
}
function _setPendingRedirectStatus(_x201, _x202) {
	return _setPendingRedirectStatus2.apply(this, arguments);
}
function _setPendingRedirectStatus2() {
	_setPendingRedirectStatus2 = _asyncToGenerator(function* (resolver, auth) {
		return resolverPersistence(resolver)._set(pendingRedirectKey(auth), "true");
	});
	return _setPendingRedirectStatus2.apply(this, arguments);
}
function _overrideRedirectResult(auth, result) {
	redirectOutcomeMap.set(auth._key(), result);
}
function resolverPersistence(resolver) {
	return _getInstance(resolver._redirectPersistence);
}
function pendingRedirectKey(auth) {
	return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Authenticates a Firebase client using a full-page redirect flow.
*
* @remarks
* To handle the results and errors for this operation, refer to {@link getRedirectResult}.
* Follow the {@link https://firebase.google.com/docs/auth/web/redirect-best-practices
* | best practices} when using {@link signInWithRedirect}.
*
* This method does not work in a Node.js environment or with {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new FacebookAuthProvider();
* // You can add additional scopes to the provider:
* provider.addScope('user_birthday');
* // Start a sign in process for an unauthenticated user.
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Facebook Access Token.
*   const credential = provider.credentialFromResult(auth, result);
*   const token = credential.accessToken;
* }
* // As this API can be used for sign-in, linking and reauthentication,
* // check the operationType to determine what triggered this redirect
* // operation.
* const operationType = result.operationType;
* ```
*
* @param auth - The {@link Auth} instance.
* @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
* Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
function signInWithRedirect(auth, provider, resolver) {
	return _signInWithRedirect(auth, provider, resolver);
}
function _signInWithRedirect(_x203, _x204, _x205) {
	return _signInWithRedirect2.apply(this, arguments);
}
function _signInWithRedirect2() {
	_signInWithRedirect2 = _asyncToGenerator(function* (auth, provider, resolver) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const authInternal = _castAuth(auth);
		_assertInstanceOf(auth, provider, FederatedAuthProvider);
		yield authInternal._initializationPromise;
		const resolverInternal = _withDefaultResolver(authInternal, resolver);
		yield _setPendingRedirectStatus(resolverInternal, authInternal);
		return resolverInternal._openRedirect(authInternal, provider, "signInViaRedirect");
	});
	return _signInWithRedirect2.apply(this, arguments);
}
/**
* Reauthenticates the current user with the specified {@link OAuthProvider} using a full-page redirect flow.
* @remarks
* To handle the results and errors for this operation, refer to {@link getRedirectResult}.
* Follow the {@link https://firebase.google.com/docs/auth/web/redirect-best-practices
* | best practices} when using {@link reauthenticateWithRedirect}.
*
* This method does not work in a Node.js environment or with {@link Auth} instances
* created with a {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new FacebookAuthProvider();
* const result = await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* // Reauthenticate using a redirect.
* await reauthenticateWithRedirect(result.user, provider);
* // This will again trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* ```
*
* @param user - The user.
* @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
* Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
function reauthenticateWithRedirect(user, provider, resolver) {
	return _reauthenticateWithRedirect(user, provider, resolver);
}
function _reauthenticateWithRedirect(_x206, _x207, _x208) {
	return _reauthenticateWithRedirect2.apply(this, arguments);
}
function _reauthenticateWithRedirect2() {
	_reauthenticateWithRedirect2 = _asyncToGenerator(function* (user, provider, resolver) {
		const userInternal = getModularInstance(user);
		_assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
		if (_isFirebaseServerApp(userInternal.auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(userInternal.auth));
		yield userInternal.auth._initializationPromise;
		const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
		yield _setPendingRedirectStatus(resolverInternal, userInternal.auth);
		const eventId = yield prepareUserForRedirect(userInternal);
		return resolverInternal._openRedirect(userInternal.auth, provider, "reauthViaRedirect", eventId);
	});
	return _reauthenticateWithRedirect2.apply(this, arguments);
}
/**
* Links the {@link OAuthProvider} to the user account using a full-page redirect flow.
* @remarks
* To handle the results and errors for this operation, refer to {@link getRedirectResult}.
* Follow the {@link https://firebase.google.com/docs/auth/web/redirect-best-practices
* | best practices} when using {@link linkWithRedirect}.
*
* This method does not work in a Node.js environment or with {@link Auth} instances
* created with a {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // Sign in using some other provider.
* const result = await signInWithEmailAndPassword(auth, email, password);
* // Link using a redirect.
* const provider = new FacebookAuthProvider();
* await linkWithRedirect(result.user, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* ```
*
* @param user - The user.
* @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
* Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
function linkWithRedirect(user, provider, resolver) {
	return _linkWithRedirect(user, provider, resolver);
}
function _linkWithRedirect(_x209, _x210, _x211) {
	return _linkWithRedirect2.apply(this, arguments);
}
function _linkWithRedirect2() {
	_linkWithRedirect2 = _asyncToGenerator(function* (user, provider, resolver) {
		const userInternal = getModularInstance(user);
		_assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
		yield userInternal.auth._initializationPromise;
		const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
		yield _assertLinkedStatus(false, userInternal, provider.providerId);
		yield _setPendingRedirectStatus(resolverInternal, userInternal.auth);
		const eventId = yield prepareUserForRedirect(userInternal);
		return resolverInternal._openRedirect(userInternal.auth, provider, "linkViaRedirect", eventId);
	});
	return _linkWithRedirect2.apply(this, arguments);
}
/**
* Returns a {@link UserCredential} from the redirect-based sign-in flow.
*
* @remarks
* If sign-in succeeded, returns the signed in user. If sign-in was unsuccessful, fails with an
* error. If no redirect operation was called, returns `null`.
*
* This method does not work in a Node.js environment or with {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new FacebookAuthProvider();
* // You can add additional scopes to the provider:
* provider.addScope('user_birthday');
* // Start a sign in process for an unauthenticated user.
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Facebook Access Token.
*   const credential = provider.credentialFromResult(auth, result);
*   const token = credential.accessToken;
* }
* // As this API can be used for sign-in, linking and reauthentication,
* // check the operationType to determine what triggered this redirect
* // operation.
* const operationType = result.operationType;
* ```
*
* @param auth - The {@link Auth} instance.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
function getRedirectResult(_x212, _x213) {
	return _getRedirectResult2.apply(this, arguments);
}
function _getRedirectResult2() {
	_getRedirectResult2 = _asyncToGenerator(function* (auth, resolver) {
		yield _castAuth(auth)._initializationPromise;
		return _getRedirectResult(auth, resolver, false);
	});
	return _getRedirectResult2.apply(this, arguments);
}
function _getRedirectResult(_x214, _x215) {
	return _getRedirectResult3.apply(this, arguments);
}
function _getRedirectResult3() {
	_getRedirectResult3 = _asyncToGenerator(function* (auth, resolverExtern, bypassAuthState = false) {
		if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
		const authInternal = _castAuth(auth);
		const result = yield new RedirectAction(authInternal, _withDefaultResolver(authInternal, resolverExtern), bypassAuthState).execute();
		if (result && !bypassAuthState) {
			delete result.user._redirectEventId;
			yield authInternal._persistUserIfCurrent(result.user);
			yield authInternal._setRedirectUser(null, resolverExtern);
		}
		return result;
	});
	return _getRedirectResult3.apply(this, arguments);
}
function prepareUserForRedirect(_x216) {
	return _prepareUserForRedirect.apply(this, arguments);
}
function _prepareUserForRedirect() {
	_prepareUserForRedirect = _asyncToGenerator(function* (user) {
		const eventId = _generateEventId(`${user.uid}:::`);
		user._redirectEventId = eventId;
		yield user.auth._setRedirectUser(user);
		yield user.auth._persistUserIfCurrent(user);
		return eventId;
	});
	return _prepareUserForRedirect.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EVENT_DUPLICATION_CACHE_DURATION_MS = 600 * 1e3;
var AuthEventManager = class {
	constructor(auth) {
		this.auth = auth;
		this.cachedEventUids = /* @__PURE__ */ new Set();
		this.consumers = /* @__PURE__ */ new Set();
		this.queuedRedirectEvent = null;
		this.hasHandledPotentialRedirect = false;
		this.lastProcessedEventTime = Date.now();
	}
	registerConsumer(authEventConsumer) {
		this.consumers.add(authEventConsumer);
		if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
			this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
			this.saveEventToCache(this.queuedRedirectEvent);
			this.queuedRedirectEvent = null;
		}
	}
	unregisterConsumer(authEventConsumer) {
		this.consumers.delete(authEventConsumer);
	}
	onEvent(event) {
		if (this.hasEventBeenHandled(event)) return false;
		let handled = false;
		this.consumers.forEach((consumer) => {
			if (this.isEventForConsumer(event, consumer)) {
				handled = true;
				this.sendToConsumer(event, consumer);
				this.saveEventToCache(event);
			}
		});
		if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) return handled;
		this.hasHandledPotentialRedirect = true;
		if (!handled) {
			this.queuedRedirectEvent = event;
			handled = true;
		}
		return handled;
	}
	sendToConsumer(event, consumer) {
		var _a;
		if (event.error && !isNullRedirectEvent(event)) {
			const code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split("auth/")[1]) || "internal-error";
			consumer.onError(_createError(this.auth, code));
		} else consumer.onAuthEvent(event);
	}
	isEventForConsumer(event, consumer) {
		const eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
		return consumer.filter.includes(event.type) && eventIdMatches;
	}
	hasEventBeenHandled(event) {
		if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) this.cachedEventUids.clear();
		return this.cachedEventUids.has(eventUid(event));
	}
	saveEventToCache(event) {
		this.cachedEventUids.add(eventUid(event));
		this.lastProcessedEventTime = Date.now();
	}
};
function eventUid(e) {
	return [
		e.type,
		e.eventId,
		e.sessionId,
		e.tenantId
	].filter((v) => v).join("-");
}
function isNullRedirectEvent({ type, error }) {
	return type === "unknown" && (error === null || error === void 0 ? void 0 : error.code) === `auth/no-auth-event`;
}
function isRedirectEvent(event) {
	switch (event.type) {
		case "signInViaRedirect":
		case "linkViaRedirect":
		case "reauthViaRedirect": return true;
		case "unknown": return isNullRedirectEvent(event);
		default: return false;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getProjectConfig(_x217) {
	return _getProjectConfig2.apply(this, arguments);
}
function _getProjectConfig2() {
	_getProjectConfig2 = _asyncToGenerator(function* (auth, request = {}) {
		return _performApiRequest(auth, "GET", "/v1/projects", request);
	});
	return _getProjectConfig2.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
var HTTP_REGEX = /^https?/;
function _validateOrigin(_x218) {
	return _validateOrigin2.apply(this, arguments);
}
function _validateOrigin2() {
	_validateOrigin2 = _asyncToGenerator(function* (auth) {
		if (auth.config.emulator) return;
		const { authorizedDomains } = yield _getProjectConfig(auth);
		for (const domain of authorizedDomains) try {
			if (matchDomain(domain)) return;
		} catch (_a) {}
		_fail(auth, "unauthorized-domain");
	});
	return _validateOrigin2.apply(this, arguments);
}
function matchDomain(expected) {
	const currentUrl = _getCurrentUrl();
	const { protocol, hostname } = new URL(currentUrl);
	if (expected.startsWith("chrome-extension://")) {
		const ceUrl = new URL(expected);
		if (ceUrl.hostname === "" && hostname === "") return protocol === "chrome-extension:" && expected.replace("chrome-extension://", "") === currentUrl.replace("chrome-extension://", "");
		return protocol === "chrome-extension:" && ceUrl.hostname === hostname;
	}
	if (!HTTP_REGEX.test(protocol)) return false;
	if (IP_ADDRESS_REGEX.test(expected)) return hostname === expected;
	const escapedDomainPattern = expected.replace(/\./g, "\\.");
	return new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i").test(hostname);
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var NETWORK_TIMEOUT = new Delay(3e4, 6e4);
/**
* Reset unloaded GApi modules. If gapi.load fails due to a network error,
* it will stop working after a retrial. This is a hack to fix this issue.
*/
function resetUnloadedGapiModules() {
	const beacon = _window().___jsl;
	if (beacon === null || beacon === void 0 ? void 0 : beacon.H) for (const hint of Object.keys(beacon.H)) {
		beacon.H[hint].r = beacon.H[hint].r || [];
		beacon.H[hint].L = beacon.H[hint].L || [];
		beacon.H[hint].r = [...beacon.H[hint].L];
		if (beacon.CP) for (let i = 0; i < beacon.CP.length; i++) beacon.CP[i] = null;
	}
}
function loadGapi(auth) {
	return new Promise((resolve, reject) => {
		var _a, _b, _c;
		function loadGapiIframe() {
			resetUnloadedGapiModules();
			gapi.load("gapi.iframes", {
				callback: () => {
					resolve(gapi.iframes.getContext());
				},
				ontimeout: () => {
					resetUnloadedGapiModules();
					reject(_createError(auth, "network-request-failed"));
				},
				timeout: NETWORK_TIMEOUT.get()
			});
		}
		if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) resolve(gapi.iframes.getContext());
		else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) loadGapiIframe();
		else {
			const cbName = _generateCallbackName("iframefcb");
			_window()[cbName] = () => {
				if (!!gapi.load) loadGapiIframe();
				else reject(_createError(auth, "network-request-failed"));
			};
			return _loadJS(`${_gapiScriptUrl()}?onload=${cbName}`).catch((e) => reject(e));
		}
	}).catch((error) => {
		cachedGApiLoader = null;
		throw error;
	});
}
var cachedGApiLoader = null;
function _loadGapi(auth) {
	cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
	return cachedGApiLoader;
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PING_TIMEOUT = new Delay(5e3, 15e3);
var IFRAME_PATH = "__/auth/iframe";
var EMULATED_IFRAME_PATH = "emulator/auth/iframe";
var IFRAME_ATTRIBUTES = {
	style: {
		position: "absolute",
		top: "-100px",
		width: "1px",
		height: "1px"
	},
	"aria-hidden": "true",
	tabindex: "-1"
};
var EID_FROM_APIHOST = /* @__PURE__ */ new Map([
	["identitytoolkit.googleapis.com", "p"],
	["staging-identitytoolkit.sandbox.googleapis.com", "s"],
	["test-identitytoolkit.sandbox.googleapis.com", "t"]
]);
function getIframeUrl(auth) {
	const config = auth.config;
	_assert(config.authDomain, auth, "auth-domain-config-required");
	const url = config.emulator ? _emulatorUrl(config, EMULATED_IFRAME_PATH) : `https://${auth.config.authDomain}/${IFRAME_PATH}`;
	const params = {
		apiKey: config.apiKey,
		appName: auth.name,
		v: SDK_VERSION
	};
	const eid = EID_FROM_APIHOST.get(auth.config.apiHost);
	if (eid) params.eid = eid;
	const frameworks = auth._getFrameworks();
	if (frameworks.length) params.fw = frameworks.join(",");
	return `${url}?${querystring(params).slice(1)}`;
}
function _openIframe(_x221) {
	return _openIframe2.apply(this, arguments);
}
function _openIframe2() {
	_openIframe2 = _asyncToGenerator(function* (auth) {
		const context = yield _loadGapi(auth);
		const gapi = _window().gapi;
		_assert(gapi, auth, "internal-error");
		return context.open({
			where: document.body,
			url: getIframeUrl(auth),
			messageHandlersFilter: gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
			attributes: IFRAME_ATTRIBUTES,
			dontclear: true
		}, (iframe) => new Promise(function() {
			var _ref17 = _asyncToGenerator(function* (resolve, reject) {
				yield iframe.restyle({ setHideOnLeave: false });
				const networkError = _createError(auth, "network-request-failed");
				const networkErrorTimer = _window().setTimeout(() => {
					reject(networkError);
				}, PING_TIMEOUT.get());
				function clearTimerAndResolve() {
					_window().clearTimeout(networkErrorTimer);
					resolve(iframe);
				}
				iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
					reject(networkError);
				});
			});
			return function(_x219, _x220) {
				return _ref17.apply(this, arguments);
			};
		}()));
	});
	return _openIframe2.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BASE_POPUP_OPTIONS = {
	location: "yes",
	resizable: "yes",
	statusbar: "yes",
	toolbar: "no"
};
var DEFAULT_WIDTH = 500;
var DEFAULT_HEIGHT = 600;
var TARGET_BLANK = "_blank";
var FIREFOX_EMPTY_URL = "http://localhost";
var AuthPopup = class {
	constructor(window) {
		this.window = window;
		this.associatedEvent = null;
	}
	close() {
		if (this.window) try {
			this.window.close();
		} catch (e) {}
	}
};
function _open(auth, url, name, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
	const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
	const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
	let target = "";
	const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
		width: width.toString(),
		height: height.toString(),
		top,
		left
	});
	const ua = getUA().toLowerCase();
	if (name) target = _isChromeIOS(ua) ? TARGET_BLANK : name;
	if (_isFirefox(ua)) {
		url = url || FIREFOX_EMPTY_URL;
		options.scrollbars = "yes";
	}
	const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, "");
	if (_isIOSStandalone(ua) && target !== "_self") {
		openAsNewWindowIOS(url || "", target);
		return new AuthPopup(null);
	}
	const newWin = window.open(url || "", target, optionsString);
	_assert(newWin, auth, "popup-blocked");
	try {
		newWin.focus();
	} catch (e) {}
	return new AuthPopup(newWin);
}
function openAsNewWindowIOS(url, target) {
	const el = document.createElement("a");
	el.href = url;
	el.target = target;
	const click = document.createEvent("MouseEvent");
	click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
	el.dispatchEvent(click);
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* URL for Authentication widget which will initiate the OAuth handshake
*
* @internal
*/
var WIDGET_PATH = "__/auth/handler";
/**
* URL for emulated environment
*
* @internal
*/
var EMULATOR_WIDGET_PATH = "emulator/auth/handler";
/**
* Fragment name for the App Check token that gets passed to the widget
*
* @internal
*/
var FIREBASE_APP_CHECK_FRAGMENT_ID = encodeURIComponent("fac");
function _getRedirectUrl(_x222, _x223, _x224, _x225, _x226, _x227) {
	return _getRedirectUrl2.apply(this, arguments);
}
function _getRedirectUrl2() {
	_getRedirectUrl2 = _asyncToGenerator(function* (auth, provider, authType, redirectUrl, eventId, additionalParams) {
		_assert(auth.config.authDomain, auth, "auth-domain-config-required");
		_assert(auth.config.apiKey, auth, "invalid-api-key");
		const params = {
			apiKey: auth.config.apiKey,
			appName: auth.name,
			authType,
			redirectUrl,
			v: SDK_VERSION,
			eventId
		};
		if (provider instanceof FederatedAuthProvider) {
			provider.setDefaultLanguage(auth.languageCode);
			params.providerId = provider.providerId || "";
			if (!isEmpty(provider.getCustomParameters())) params.customParameters = JSON.stringify(provider.getCustomParameters());
			for (const [key, value] of Object.entries(additionalParams || {})) params[key] = value;
		}
		if (provider instanceof BaseOAuthProvider) {
			const scopes = provider.getScopes().filter((scope) => scope !== "");
			if (scopes.length > 0) params.scopes = scopes.join(",");
		}
		if (auth.tenantId) params.tid = auth.tenantId;
		const paramsDict = params;
		for (const key of Object.keys(paramsDict)) if (paramsDict[key] === void 0) delete paramsDict[key];
		const appCheckToken = yield auth._getAppCheckToken();
		const appCheckTokenFragment = appCheckToken ? `#${FIREBASE_APP_CHECK_FRAGMENT_ID}=${encodeURIComponent(appCheckToken)}` : "";
		return `${getHandlerBase(auth)}?${querystring(paramsDict).slice(1)}${appCheckTokenFragment}`;
	});
	return _getRedirectUrl2.apply(this, arguments);
}
function getHandlerBase({ config }) {
	if (!config.emulator) return `https://${config.authDomain}/${WIDGET_PATH}`;
	return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* The special web storage event
*
*/
var WEB_STORAGE_SUPPORT_KEY = "webStorageSupport";
var BrowserPopupRedirectResolver = class {
	constructor() {
		this.eventManagers = {};
		this.iframes = {};
		this.originValidationPromises = {};
		this._redirectPersistence = browserSessionPersistence;
		this._completeRedirectFn = _getRedirectResult;
		this._overrideRedirectResult = _overrideRedirectResult;
	}
	_openPopup(auth, provider, authType, eventId) {
		var _this71 = this;
		return _asyncToGenerator(function* () {
			var _a;
			debugAssert((_a = _this71.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, "_initialize() not called before _openPopup()");
			return _open(auth, yield _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId), _generateEventId());
		})();
	}
	_openRedirect(auth, provider, authType, eventId) {
		var _this72 = this;
		return _asyncToGenerator(function* () {
			yield _this72._originValidation(auth);
			_setWindowLocation(yield _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId));
			return new Promise(() => {});
		})();
	}
	_initialize(auth) {
		const key = auth._key();
		if (this.eventManagers[key]) {
			const { manager, promise } = this.eventManagers[key];
			if (manager) return Promise.resolve(manager);
			else {
				debugAssert(promise, "If manager is not set, promise should be");
				return promise;
			}
		}
		const promise = this.initAndGetManager(auth);
		this.eventManagers[key] = { promise };
		promise.catch(() => {
			delete this.eventManagers[key];
		});
		return promise;
	}
	initAndGetManager(auth) {
		var _this73 = this;
		return _asyncToGenerator(function* () {
			const iframe = yield _openIframe(auth);
			const manager = new AuthEventManager(auth);
			iframe.register("authEvent", (iframeEvent) => {
				_assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event");
				return { status: manager.onEvent(iframeEvent.authEvent) ? "ACK" : "ERROR" };
			}, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
			_this73.eventManagers[auth._key()] = { manager };
			_this73.iframes[auth._key()] = iframe;
			return manager;
		})();
	}
	_isIframeWebStorageSupported(auth, cb) {
		this.iframes[auth._key()].send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, (result) => {
			var _a;
			const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
			if (isSupported !== void 0) cb(!!isSupported);
			_fail(auth, "internal-error");
		}, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
	}
	_originValidation(auth) {
		const key = auth._key();
		if (!this.originValidationPromises[key]) this.originValidationPromises[key] = _validateOrigin(auth);
		return this.originValidationPromises[key];
	}
	get _shouldInitProactively() {
		return _isMobileBrowser() || _isSafari() || _isIOS();
	}
};
/**
* An implementation of {@link PopupRedirectResolver} suitable for browser
* based applications.
*
* @remarks
* This method does not work in a Node.js environment.
*
* @public
*/
var browserPopupRedirectResolver = BrowserPopupRedirectResolver;
var MultiFactorAssertionImpl = class {
	constructor(factorId) {
		this.factorId = factorId;
	}
	_process(auth, session, displayName) {
		switch (session.type) {
			case "enroll": return this._finalizeEnroll(auth, session.credential, displayName);
			case "signin": return this._finalizeSignIn(auth, session.credential);
			default: return debugFail("unexpected MultiFactorSessionType");
		}
	}
};
/**
* {@inheritdoc PhoneMultiFactorAssertion}
*
* @public
*/
var PhoneMultiFactorAssertionImpl = class PhoneMultiFactorAssertionImpl extends MultiFactorAssertionImpl {
	constructor(credential) {
		super("phone");
		this.credential = credential;
	}
	/** @internal */
	static _fromCredential(credential) {
		return new PhoneMultiFactorAssertionImpl(credential);
	}
	/** @internal */
	_finalizeEnroll(auth, idToken, displayName) {
		return finalizeEnrollPhoneMfa(auth, {
			idToken,
			displayName,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
	/** @internal */
	_finalizeSignIn(auth, mfaPendingCredential) {
		return finalizeSignInPhoneMfa(auth, {
			mfaPendingCredential,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
};
/**
* Provider for generating a {@link PhoneMultiFactorAssertion}.
*
* @public
*/
var PhoneMultiFactorGenerator = class {
	constructor() {}
	/**
	* Provides a {@link PhoneMultiFactorAssertion} to confirm ownership of the phone second factor.
	*
	* @remarks
	* This method does not work in a Node.js environment.
	*
	* @param phoneAuthCredential - A credential provided by {@link PhoneAuthProvider.credential}.
	* @returns A {@link PhoneMultiFactorAssertion} which can be used with
	* {@link MultiFactorResolver.resolveSignIn}
	*/
	static assertion(credential) {
		return PhoneMultiFactorAssertionImpl._fromCredential(credential);
	}
};
/**
* The identifier of the phone second factor: `phone`.
*/
PhoneMultiFactorGenerator.FACTOR_ID = "phone";
/**
* Provider for generating a {@link TotpMultiFactorAssertion}.
*
* @public
*/
var TotpMultiFactorGenerator = class {
	/**
	* Provides a {@link TotpMultiFactorAssertion} to confirm ownership of
	* the TOTP (time-based one-time password) second factor.
	* This assertion is used to complete enrollment in TOTP second factor.
	*
	* @param secret A {@link TotpSecret} containing the shared secret key and other TOTP parameters.
	* @param oneTimePassword One-time password from TOTP App.
	* @returns A {@link TotpMultiFactorAssertion} which can be used with
	* {@link MultiFactorUser.enroll}.
	*/
	static assertionForEnrollment(secret, oneTimePassword) {
		return TotpMultiFactorAssertionImpl._fromSecret(secret, oneTimePassword);
	}
	/**
	* Provides a {@link TotpMultiFactorAssertion} to confirm ownership of the TOTP second factor.
	* This assertion is used to complete signIn with TOTP as the second factor.
	*
	* @param enrollmentId identifies the enrolled TOTP second factor.
	* @param oneTimePassword One-time password from TOTP App.
	* @returns A {@link TotpMultiFactorAssertion} which can be used with
	* {@link MultiFactorResolver.resolveSignIn}.
	*/
	static assertionForSignIn(enrollmentId, oneTimePassword) {
		return TotpMultiFactorAssertionImpl._fromEnrollmentId(enrollmentId, oneTimePassword);
	}
	/**
	* Returns a promise to {@link TotpSecret} which contains the TOTP shared secret key and other parameters.
	* Creates a TOTP secret as part of enrolling a TOTP second factor.
	* Used for generating a QR code URL or inputting into a TOTP app.
	* This method uses the auth instance corresponding to the user in the multiFactorSession.
	*
	* @param session The {@link MultiFactorSession} that the user is part of.
	* @returns A promise to {@link TotpSecret}.
	*/
	static generateSecret(session) {
		return _asyncToGenerator(function* () {
			var _a;
			const mfaSession = session;
			_assert(typeof ((_a = mfaSession.user) === null || _a === void 0 ? void 0 : _a.auth) !== "undefined", "internal-error");
			const response = yield startEnrollTotpMfa(mfaSession.user.auth, {
				idToken: mfaSession.credential,
				totpEnrollmentInfo: {}
			});
			return TotpSecret._fromStartTotpMfaEnrollmentResponse(response, mfaSession.user.auth);
		})();
	}
};
/**
* The identifier of the TOTP second factor: `totp`.
*/
TotpMultiFactorGenerator.FACTOR_ID = "totp";
var TotpMultiFactorAssertionImpl = class TotpMultiFactorAssertionImpl extends MultiFactorAssertionImpl {
	constructor(otp, enrollmentId, secret) {
		super("totp");
		this.otp = otp;
		this.enrollmentId = enrollmentId;
		this.secret = secret;
	}
	/** @internal */
	static _fromSecret(secret, otp) {
		return new TotpMultiFactorAssertionImpl(otp, void 0, secret);
	}
	/** @internal */
	static _fromEnrollmentId(enrollmentId, otp) {
		return new TotpMultiFactorAssertionImpl(otp, enrollmentId);
	}
	/** @internal */
	_finalizeEnroll(auth, idToken, displayName) {
		var _this74 = this;
		return _asyncToGenerator(function* () {
			_assert(typeof _this74.secret !== "undefined", auth, "argument-error");
			return finalizeEnrollTotpMfa(auth, {
				idToken,
				displayName,
				totpVerificationInfo: _this74.secret._makeTotpVerificationInfo(_this74.otp)
			});
		})();
	}
	/** @internal */
	_finalizeSignIn(auth, mfaPendingCredential) {
		var _this75 = this;
		return _asyncToGenerator(function* () {
			_assert(_this75.enrollmentId !== void 0 && _this75.otp !== void 0, auth, "argument-error");
			const totpVerificationInfo = { verificationCode: _this75.otp };
			return finalizeSignInTotpMfa(auth, {
				mfaPendingCredential,
				mfaEnrollmentId: _this75.enrollmentId,
				totpVerificationInfo
			});
		})();
	}
};
/**
* Provider for generating a {@link TotpMultiFactorAssertion}.
*
* Stores the shared secret key and other parameters to generate time-based OTPs.
* Implements methods to retrieve the shared secret key and generate a QR code URL.
* @public
*/
var TotpSecret = class TotpSecret {
	constructor(secretKey, hashingAlgorithm, codeLength, codeIntervalSeconds, enrollmentCompletionDeadline, sessionInfo, auth) {
		this.sessionInfo = sessionInfo;
		this.auth = auth;
		this.secretKey = secretKey;
		this.hashingAlgorithm = hashingAlgorithm;
		this.codeLength = codeLength;
		this.codeIntervalSeconds = codeIntervalSeconds;
		this.enrollmentCompletionDeadline = enrollmentCompletionDeadline;
	}
	/** @internal */
	static _fromStartTotpMfaEnrollmentResponse(response, auth) {
		return new TotpSecret(response.totpSessionInfo.sharedSecretKey, response.totpSessionInfo.hashingAlgorithm, response.totpSessionInfo.verificationCodeLength, response.totpSessionInfo.periodSec, new Date(response.totpSessionInfo.finalizeEnrollmentTime).toUTCString(), response.totpSessionInfo.sessionInfo, auth);
	}
	/** @internal */
	_makeTotpVerificationInfo(otp) {
		return {
			sessionInfo: this.sessionInfo,
			verificationCode: otp
		};
	}
	/**
	* Returns a QR code URL as described in
	* https://github.com/google/google-authenticator/wiki/Key-Uri-Format
	* This can be displayed to the user as a QR code to be scanned into a TOTP app like Google Authenticator.
	* If the optional parameters are unspecified, an accountName of <userEmail> and issuer of <firebaseAppName> are used.
	*
	* @param accountName the name of the account/app along with a user identifier.
	* @param issuer issuer of the TOTP (likely the app name).
	* @returns A QR code URL string.
	*/
	generateQrCodeUrl(accountName, issuer) {
		var _a;
		let useDefaults = false;
		if (_isEmptyString(accountName) || _isEmptyString(issuer)) useDefaults = true;
		if (useDefaults) {
			if (_isEmptyString(accountName)) accountName = ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.email) || "unknownuser";
			if (_isEmptyString(issuer)) issuer = this.auth.name;
		}
		return `otpauth://totp/${issuer}:${accountName}?secret=${this.secretKey}&issuer=${issuer}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`;
	}
};
/** @internal */
function _isEmptyString(input) {
	return typeof input === "undefined" || (input === null || input === void 0 ? void 0 : input.length) === 0;
}
var name = "@firebase/auth";
var version = "1.10.8";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthInterop = class {
	constructor(auth) {
		this.auth = auth;
		this.internalListeners = /* @__PURE__ */ new Map();
	}
	getUid() {
		var _a;
		this.assertAuthConfigured();
		return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
	}
	getToken(forceRefresh) {
		var _this76 = this;
		return _asyncToGenerator(function* () {
			_this76.assertAuthConfigured();
			yield _this76.auth._initializationPromise;
			if (!_this76.auth.currentUser) return null;
			return { accessToken: yield _this76.auth.currentUser.getIdToken(forceRefresh) };
		})();
	}
	addAuthTokenListener(listener) {
		this.assertAuthConfigured();
		if (this.internalListeners.has(listener)) return;
		const unsubscribe = this.auth.onIdTokenChanged((user) => {
			listener((user === null || user === void 0 ? void 0 : user.stsTokenManager.accessToken) || null);
		});
		this.internalListeners.set(listener, unsubscribe);
		this.updateProactiveRefresh();
	}
	removeAuthTokenListener(listener) {
		this.assertAuthConfigured();
		const unsubscribe = this.internalListeners.get(listener);
		if (!unsubscribe) return;
		this.internalListeners.delete(listener);
		unsubscribe();
		this.updateProactiveRefresh();
	}
	assertAuthConfigured() {
		_assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
	}
	updateProactiveRefresh() {
		if (this.internalListeners.size > 0) this.auth._startProactiveRefresh();
		else this.auth._stopProactiveRefresh();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getVersionForPlatform(clientPlatform) {
	switch (clientPlatform) {
		case "Node": return "node";
		case "ReactNative": return "rn";
		case "Worker": return "webworker";
		case "Cordova": return "cordova";
		case "WebExtension": return "web-extension";
		default: return;
	}
}
/** @internal */
function registerAuth(clientPlatform) {
	_registerComponent(new Component("auth", (container, { options: deps }) => {
		const app = container.getProvider("app").getImmediate();
		const heartbeatServiceProvider = container.getProvider("heartbeat");
		const appCheckServiceProvider = container.getProvider("app-check-internal");
		const { apiKey, authDomain } = app.options;
		_assert(apiKey && !apiKey.includes(":"), "invalid-api-key", { appName: app.name });
		const authInstance = new AuthImpl(app, heartbeatServiceProvider, appCheckServiceProvider, {
			apiKey,
			authDomain,
			clientPlatform,
			apiHost: "identitytoolkit.googleapis.com",
			tokenApiHost: "securetoken.googleapis.com",
			apiScheme: "https",
			sdkClientVersion: _getClientVersion(clientPlatform)
		});
		_initializeAuthInstance(authInstance, deps);
		return authInstance;
	}, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
		container.getProvider("auth-internal").initialize();
	}));
	_registerComponent(new Component("auth-internal", (container) => {
		return ((auth) => new AuthInterop(auth))(_castAuth(container.getProvider("auth").getImmediate()));
	}, "PRIVATE").setInstantiationMode("EXPLICIT"));
	registerVersion(name, version, getVersionForPlatform(clientPlatform));
	registerVersion(name, version, "esm2017");
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var authIdTokenMaxAge = getExperimentalSetting("authIdTokenMaxAge") || 300;
var lastPostedIdToken = null;
var mintCookieFactory = (url) => function() {
	var _ref18 = _asyncToGenerator(function* (user) {
		const idTokenResult = user && (yield user.getIdTokenResult());
		const idTokenAge = idTokenResult && ((/* @__PURE__ */ new Date()).getTime() - Date.parse(idTokenResult.issuedAtTime)) / 1e3;
		if (idTokenAge && idTokenAge > authIdTokenMaxAge) return;
		const idToken = idTokenResult === null || idTokenResult === void 0 ? void 0 : idTokenResult.token;
		if (lastPostedIdToken === idToken) return;
		lastPostedIdToken = idToken;
		yield fetch(url, {
			method: idToken ? "POST" : "DELETE",
			headers: idToken ? { "Authorization": `Bearer ${idToken}` } : {}
		});
	});
	return function(_x228) {
		return _ref18.apply(this, arguments);
	};
}();
/**
* Returns the Auth instance associated with the provided {@link @firebase/app#FirebaseApp}.
* If no instance exists, initializes an Auth instance with platform-specific default dependencies.
*
* @param app - The Firebase App.
*
* @public
*/
function getAuth(app = getApp()) {
	const provider = _getProvider(app, "auth");
	if (provider.isInitialized()) return provider.getImmediate();
	const auth = initializeAuth(app, {
		popupRedirectResolver: browserPopupRedirectResolver,
		persistence: [
			indexedDBLocalPersistence,
			browserLocalPersistence,
			browserSessionPersistence
		]
	});
	const authTokenSyncPath = getExperimentalSetting("authTokenSyncURL");
	if (authTokenSyncPath && typeof isSecureContext === "boolean" && isSecureContext) {
		const authTokenSyncUrl = new URL(authTokenSyncPath, location.origin);
		if (location.origin === authTokenSyncUrl.origin) {
			const mintCookie = mintCookieFactory(authTokenSyncUrl.toString());
			beforeAuthStateChanged(auth, mintCookie, () => mintCookie(auth.currentUser));
			onIdTokenChanged(auth, (user) => mintCookie(user));
		}
	}
	const authEmulatorHost = getDefaultEmulatorHost("auth");
	if (authEmulatorHost) connectAuthEmulator(auth, `http://${authEmulatorHost}`);
	return auth;
}
function getScriptParentElement() {
	var _a, _b;
	return (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
}
_setExternalJSProvider({
	loadJS(url) {
		return new Promise((resolve, reject) => {
			const el = document.createElement("script");
			el.setAttribute("src", url);
			el.onload = resolve;
			el.onerror = (e) => {
				const error = _createError("internal-error");
				error.customData = e;
				reject(error);
			};
			el.type = "text/javascript";
			el.charset = "UTF-8";
			getScriptParentElement().appendChild(el);
		});
	},
	gapiScript: "https://apis.google.com/js/api.js",
	recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
	recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render="
});
registerAuth("Browser");
//#endregion
export { onAuthStateChanged as $, checkActionCode as A, verifyBeforeUpdateEmail as At, getIdTokenResult as B, TwitterAuthProvider as C, updateCurrentUser as Ct, browserLocalPersistence as D, updateProfile as Dt, browserCookiePersistence as E, updatePhoneNumber as Et, deleteUser as F, initializeAuth as G, getRedirectResult as H, fetchSignInMethodsForEmail as I, linkWithCredential as J, initializeRecaptchaConfig as K, getAdditionalUserInfo as L, connectAuthEmulator as M, createUserWithEmailAndPassword as N, browserPopupRedirectResolver as O, useDeviceLanguage as Ot, debugErrorMap as P, multiFactor as Q, getAuth as R, TotpSecret as S, unlink as St, beforeAuthStateChanged as T, updatePassword as Tt, inMemoryPersistence as U, getMultiFactorResolver as V, indexedDBLocalPersistence as W, linkWithPopup as X, linkWithPhoneNumber as Y, linkWithRedirect as Z, ProviderId as _, signInWithEmailLink as _t, EmailAuthCredential as a, reauthenticateWithPopup as at, SignInMethod as b, signInWithRedirect as bt, FactorId as c, revokeAccessToken as ct, OAuthCredential as d, sendSignInLinkToEmail as dt, onIdTokenChanged as et, OAuthProvider as f, setPersistence as ft, PhoneMultiFactorGenerator as g, signInWithEmailAndPassword as gt, PhoneAuthProvider as h, signInWithCustomToken as ht, AuthCredential as i, reauthenticateWithPhoneNumber as it, confirmPasswordReset as j, verifyPasswordResetCode as jt, browserSessionPersistence as k, validatePassword as kt, GithubAuthProvider as l, sendEmailVerification as lt, PhoneAuthCredential as m, signInWithCredential as mt, ActionCodeOperation as n, prodErrorMap as nt, EmailAuthProvider as o, reauthenticateWithRedirect as ot, OperationType as p, signInAnonymously as pt, isSignInWithEmailLink as q, ActionCodeURL as r, reauthenticateWithCredential as rt, FacebookAuthProvider as s, reload as st, AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY as t, parseActionCodeURL as tt, GoogleAuthProvider as u, sendPasswordResetEmail as ut, RecaptchaVerifier as v, signInWithPhoneNumber as vt, applyActionCode as w, updateEmail as wt, TotpMultiFactorGenerator as x, signOut as xt, SAMLAuthProvider as y, signInWithPopup as yt, getIdToken as z };
