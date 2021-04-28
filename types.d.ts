declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

interface UserSaveObject {
    createDate?: string;
    createByUrn?: string;
    lastEditByUrn: string;
    lastEditDate: string;
}
export type PageDataObject = UserSaveObject & {
    urn: string;
    names: string[];
    name: string;
    summary: string;
    description?: string;
    descriptionHtml?: string;
    serviceOutput: ServiceOutput;
    operationImpls: OperationImpl[];
    purposeUrns: string[];
    boundToEntityTypeUrn?: string;
    entityTypeUrns: string[];
    combinedItemUrns: string[];
    inactive: boolean;
    deprecated?: Boolean;
    lastEditDateObs?: string;
    lastEditByUrnObs?: string;
    textSet?: string[];
    test?: string;
    pages: Page[];
} 

export interface OperationImpl {
    operation: string;
    method: string;
    pageTemplate: string;
    securityFunctionGroups: any[];
    actionImpls: ActionImpl[];
}

export interface ActionImpl {
    action: string;
    securityFunctionGroups: string[];
}

export interface Page {
    urn: string;
}

export interface ServiceOutput {
    outputContentTypeUrn: string;
    oldContentType: string;
    maxAge: string;
}

export type QueryDataObject = UserSaveObject & {
    urn: string;
    name: string;
    summary: string;
    queryString: string;
    securityFunctionUrns: string[];
    boundToEntityTypeUrn?: string;
    childQueries?: ChildQuery[];
    inactive: boolean;
    queryEngineUrn?: string;
    dataSpaceUrn?: string;
    queryParams?: QueryParam[];
}

export interface ChildQuery {
    urn: string;
    queryString: string;
    dataSpaceUrn: string;
    queryParams?: QueryParam[];
}

export interface QueryParam {
    codeName: string;
    valueTypeUrn:
        | "urn:com:loki:core:model:types:string"
        | "urn:com:loki:core:model:types:bool"
        | "urn:com:loki:core:model:types:integer"
        | "urn:com:loki:core:model:types:date"
        | "urn:com:loki:core:model:types:decimal";
}
