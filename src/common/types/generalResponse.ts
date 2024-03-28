export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiLink = {
    href: string;
    method: ApiMethod;
    rel?: string;
}

export type GeneralResponse = {
    meta: {
        apiVersion: string;
        documentation: string;
    }

    _links: {
        [key: string]: ApiLink;
    }
}