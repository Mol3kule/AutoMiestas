type ResponseStatus = 500 | 404 | 401 | 400 | 200;

type ApiResponseGeneral = {
    status: ResponseStatus;
};

type ApiResponseWithTranslation = ApiResponseGeneral & {
    translation: string;
};

type ApiResponseWithData = ApiResponseWithTranslation & {
    data: any;
};

export type ApiResponse = ApiResponseGeneral | ApiResponseWithTranslation | ApiResponseWithData;