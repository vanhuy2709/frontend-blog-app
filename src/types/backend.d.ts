export { };

declare global {

  interface IBlog {
    id: number,
    attributes: {
      title: string,
      status: EStatus,
      author: string,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
      locale: string,
      content: string,
      image: {
        data: {
          id: 1,
          attributes: {
            name: string,
            alternativeText: string | null,
            caption: string | null,
            width: number,
            height: number,
            formats: {
              thumbnail: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path: string | null,
                width: number,
                height: number,
                size: number,
                sizeInBytes: number,
                url: string
              }
            },
            hash: string,
            ext: string,
            mime: string,
            size: number,
            url: string,
            previewUrl: string | null,
            provider: string,
            provider_metadata: string | null,
            createdAt: string,
            updatedAt: string
          }
        }
      }
    }
  }

  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: {
      status: number,
      name: string,
      message: string,
      details: {}
    };
    data?: T,
    meta?: {
      pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
      },
    },
  }

  interface IModelPaginate<T> {
    meta: {
      pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
      },
    },
    data: T[],
  }

}
