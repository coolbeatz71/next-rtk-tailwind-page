/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateJobApplicationRequest {
  coverLetter?: string | null;
  resumeUrl?: string | null;
}

export interface CreateJobApplicationResponse {
  jobApplication?: JobApplicationResponseDto;
}

export interface CreateJobRequest {
  title?: string | null;
  description?: string | null;
  requirements?: string | null;
  companyName?: string | null;
  companyWebsite?: string | null;
  location?: string | null;
  workMode?: string | null;
  status?: string | null;
  jobType?: string | null;
  /** @format date-time */
  applicationDeadline?: string | null;
}

export interface CreateJobResponse {
  job?: JobResponseDto;
}

export interface GetAllJobsResponse {
  jobs?: JobResponseDtoPaginatedResult;
}

export interface GetJobResponse {
  job?: JobResponseDto;
}

export interface JobApplicationResponseDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  jobId?: string;
  /** @format uuid */
  applicantId?: string;
  status?: string | null;
  coverLetter?: string | null;
  resumeUrl?: string | null;
  notes?: string | null;
  /** @format date-time */
  applicationDate?: string | null;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface JobResponseDto {
  /** @format uuid */
  id?: string;
  title?: string | null;
  description?: string | null;
  requirements?: string | null;
  companyName?: string | null;
  companyWebsite?: string | null;
  location?: string | null;
  workMode?: string | null;
  status?: string | null;
  jobType?: string | null;
  /** @format date-time */
  applicationDeadline?: string | null;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface JobResponseDtoPaginatedResult {
  /** @format int32 */
  pageIndex?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int64 */
  count?: number;
  items?: JobResponseDto[] | null;
}

export interface LoginRequest {
  email?: string | null;
  password?: string | null;
}

export interface LoginResponse {
  user?: UserResponseDto;
  token?: string | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface RegisterRequest {
  email?: string | null;
  password?: string | null;
  role?: string | null;
}

export interface RegisterResponse {
  user?: UserResponseDto;
  token?: string | null;
}

export interface UpdateJobApplicationStatusRequest {
  status?: string | null;
}

export interface UpdateJobApplicationStatusResponse {
  jobApplication?: JobApplicationResponseDto;
}

export interface UpdateJobStatusRequest {
  status?: string | null;
}

export interface UpdateJobStatusResponse {
  job?: JobResponseDto;
}

export interface UserResponseDto {
  /** @format uuid */
  id?: string;
  email?: string | null;
  role?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Api
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Creates a new user account with the provided email, password, and role. The email must be unique and in a valid format. The password must meet security requirements (minimum 8 characters with uppercase, lowercase, and digit). On success, returns a 201 Created response with user information and JWT token. If the email already exists, returns a 400 Bad Request response. If validation fails, returns a 400 Bad Request with validation errors.
     *
     * @tags Authentication
     * @name RegisterUser
     * @summary Register a new user account in the system.
     * @request POST:/api/v1/auth/register
     * @secure
     * @response `201` `RegisterResponse` Created
     * @response `400` `ProblemDetails` Bad Request
     */
    registerUser: (data: RegisterRequest, params: RequestParams = {}) =>
      this.request<RegisterResponse, ProblemDetails>({
        path: `/api/v1/auth/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Authenticates a user using their email and password credentials. The email must exist in the system and the password must match the stored hash. The user account must also be active to successfully authenticate. On success, returns a 200 OK response with user information and JWT token. If credentials are invalid, returns a 400 Bad Request response.
     *
     * @tags Authentication
     * @name LoginUser
     * @summary Authenticate a user and return a JWT token.
     * @request POST:/api/v1/auth/login
     * @secure
     * @response `200` `LoginResponse` OK
     * @response `400` `ProblemDetails` Bad Request
     */
    loginUser: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<LoginResponse, ProblemDetails>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the status of an existing job application. Only employers and admins can update application status. Valid status values: Submitted, UnderReview, Interviewed, Shortlisted, Rejected, Hired On success, returns a 200 OK response with the updated job application information. If validation fails, returns a 400 Bad Request with validation errors. If the job application is not found, returns a 404 Not Found response. If unauthorized, returns a 401 Unauthorized response. If access denied, returns a 403 Forbidden response.
     *
     * @tags Job Applications
     * @name UpdateJobApplicationStatus
     * @summary Update the status of an existing job application.
     * @request PATCH:/api/v1/job-applications/{id}/status
     * @secure
     * @response `200` `UpdateJobApplicationStatusResponse` OK
     * @response `400` `ProblemDetails` Bad Request
     * @response `401` `ProblemDetails` Unauthorized
     * @response `403` `ProblemDetails` Forbidden
     * @response `404` `ProblemDetails` Not Found
     */
    updateJobApplicationStatus: (
      id: string,
      data: UpdateJobApplicationStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<UpdateJobApplicationStatusResponse, ProblemDetails>({
        path: `/api/v1/job-applications/${id}/status`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new job application for the specified job position. Only accessible by authenticated JobSeekers. The job ID is provided in the URL and the applicant ID is automatically extracted from the JWT token. Validates that: - The job exists and is in Active status - The applicant hasn't already applied for this job - The resume URL is valid Jobs that are Paused, Closed, or Expired cannot accept new applications. On success, returns a 201 Created response with the job application details. If the job is not found, returns a 404 Not Found response. If the job is not accepting applications, returns a 400 Bad Request with explanation. If the user has already applied, returns a 400 Bad Request response. If validation fails, returns a 400 Bad Request with validation errors. If unauthorized, returns a 401 Unauthorized response. If access denied (not a JobSeeker), returns a 403 Forbidden response.
     *
     * @tags Job Applications
     * @name CreateJobApplication
     * @summary Apply for a job position.
     * @request POST:/api/v1/jobs/{jobId}/apply
     * @secure
     * @response `201` `CreateJobApplicationResponse` Created
     * @response `400` `ProblemDetails` Bad Request
     * @response `401` `ProblemDetails` Unauthorized
     * @response `403` `ProblemDetails` Forbidden
     * @response `404` `ProblemDetails` Not Found
     */
    createJobApplication: (
      jobId: string,
      data: CreateJobApplicationRequest,
      params: RequestParams = {},
    ) =>
      this.request<CreateJobApplicationResponse, ProblemDetails>({
        path: `/api/v1/jobs/${jobId}/apply`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the status of an existing job listing. Only employers and admins can update job status. Valid status values: Active, Paused, Closed On success, returns a 200 OK response with the updated job information. If validation fails, returns a 400 Bad Request with validation errors. If the job is not found, returns a 404 Not Found response. If unauthorized, returns a 401 Unauthorized response. If access denied, returns a 403 Forbidden response.
     *
     * @tags Jobs
     * @name UpdateJobStatus
     * @summary Update the status of an existing job listing.
     * @request PATCH:/api/v1/jobs/{id}/status
     * @secure
     * @response `200` `UpdateJobStatusResponse` OK
     * @response `400` `ProblemDetails` Bad Request
     * @response `401` `ProblemDetails` Unauthorized
     * @response `403` `ProblemDetails` Forbidden
     * @response `404` `ProblemDetails` Not Found
     */
    updateJobStatus: (
      id: string,
      data: UpdateJobStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<UpdateJobStatusResponse, ProblemDetails>({
        path: `/api/v1/jobs/${id}/status`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a job listing associated with the provided job ID. The ID must be a valid GUID format. This endpoint is publicly accessible and does not require authentication. On success, returns a 200 OK response with the job details including title, description, company information, location, work mode, job type, and application deadline. If the job is not found, returns a 404 Not Found response. If the ID format is invalid, returns a 400 Bad Request with validation errors.
     *
     * @tags Jobs
     * @name GetJob
     * @summary Retrieve a single job by its unique identifier.
     * @request GET:/api/v1/jobs/{id}
     * @secure
     * @response `200` `GetJobResponse` OK
     * @response `400` `ProblemDetails` Bad Request
     * @response `404` `ProblemDetails` Not Found
     */
    getJob: (id: string, params: RequestParams = {}) =>
      this.request<GetJobResponse, ProblemDetails>({
        path: `/api/v1/jobs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a paginated list of job listings with optional filters for status, job type, work mode, and search terms. This endpoint is publicly accessible and does not require authentication. Available filters: - Status: Active, Paused, Closed, Expired - JobType: FullTime, PartTime, Contract, Internship - WorkMode: Remote, OnSite, Hybrid - Search: Searches in title, description, and company name Pagination parameters: - PageIndex: Zero-based page index (default: 0) - PageSize: Number of items per page (default: 10, max: 100) On success, returns a 200 OK response with paginated job results including total count, current page index, page size, and job details. If validation fails, returns a 400 Bad Request with validation errors.
     *
     * @tags Jobs
     * @name GetAllJobs
     * @summary Retrieve all job listings with optional filtering and pagination.
     * @request GET:/api/v1/jobs
     * @secure
     * @response `200` `GetAllJobsResponse` OK
     * @response `400` `ProblemDetails` Bad Request
     */
    getAllJobs: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        pageIndex?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
        status?: string;
        jobType?: string;
        workMode?: string;
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAllJobsResponse, ProblemDetails>({
        path: `/api/v1/jobs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new job listing with the provided details including title, description, company information, location, work mode, job type, and application deadline. On success, returns a 201 Created response with the created job information. If validation fails, returns a 400 Bad Request with validation errors. If unauthorized, returns a 401 Unauthorized response. If access denied, returns a 403 Forbidden response.
     *
     * @tags Jobs
     * @name CreateJob
     * @summary Create a new job listing in the system.
     * @request POST:/api/v1/jobs
     * @secure
     * @response `201` `CreateJobResponse` Created
     * @response `400` `ProblemDetails` Bad Request
     * @response `401` `ProblemDetails` Unauthorized
     * @response `403` `ProblemDetails` Forbidden
     */
    createJob: (data: CreateJobRequest, params: RequestParams = {}) =>
      this.request<CreateJobResponse, ProblemDetails>({
        path: `/api/v1/jobs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
