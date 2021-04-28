declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

export interface PageDataObject {
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
    createDate?: string;
    createByUrn?: string;
    lastEditByUrn: string;
    lastEditDate: string;
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
