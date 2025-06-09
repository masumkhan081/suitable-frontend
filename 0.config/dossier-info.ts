export const dossierInfo = {
  connectedTenantId: 19801,
  apartmentSharing: {
    id: '12096',
    applicationType: 'ALONE',
    status: 'TO_PROCESS',
    tenants: [
      {
        id: 19801,
        firstName: 'Masum',
        lastName: 'Masum Khan',
        preferredName: '',
        zipCode: '',
        email: 'masumkhan.technext@gmail.com',
        tenantType: 'CREATE',
        status: 'TO_PROCESS',
        honorDeclaration: true,
        lastUpdateDate: '2025-05-27T08:17:25.642824',
        creationDateTime: '2025-05-27T08:07:20.314606',
        clarification: 'to my future landlord',
        documents: [
          {
            id: 61358,
            documentCategory: 'RESIDENCY',
            documentSubCategory: 'TENANT',
            subCategory: 'TENANT',
            documentCategoryStep: 'TENANT_PROOF',
            noDocument: false,
            documentStatus: 'TO_PROCESS',
            documentAnalysisReport: {
              id: 2082,
              analysisStatus: 'UNDEFINED',
              brokenRules: [],
              comment: null
            },
            name: 'https://api-preprod.dossierfacile.fr/api/document/resource/fa4c985a-0e63-4182-98e3-017e85f387a7',
            files: [
              {
                id: 67715,
                path: '',
                preview: 'https://api-preprod.dossierfacile.fr/api/file/preview/67715',
                originalName: 'tenant-profile.pdf',
                size: 1197889,
                numberOfPages: 1,
                contentType: 'application/pdf'
              }
            ]
          },
          {
            id: 61359,
            documentCategory: 'PROFESSIONAL',
            documentSubCategory: 'UNEMPLOYED',
            subCategory: 'UNEMPLOYED',
            documentStatus: 'TO_PROCESS',
            name: 'https://api-preprod.dossierfacile.fr/api/document/resource/a1424981-f66f-4b95-ade5-0b5926e27a30',
            files: [
              {
                id: 67716,
                path: '',
                preview: 'https://api-preprod.dossierfacile.fr/api/file/preview/67716',
                originalName: 'tenant-profile.pdf',
                size: 1197889,
                numberOfPages: 1,
                contentType: 'application/pdf'
              }
            ]
          },
          {
            id: 61360,
            documentCategory: 'FINANCIAL',
            documentSubCategory: 'NO_INCOME',
            subCategory: 'NO_INCOME',
            noDocument: true,
            customText: 'i am currently unemployed',
            monthlySum: 0,
            documentStatus: 'TO_PROCESS',
            name: 'https://api-preprod.dossierfacile.fr/api/document/resource/a7fc17cd-10f3-491e-8872-4cacb2b7dd5d',
            files: []
          },
          {
            id: 61361,
            documentCategory: 'TAX',
            documentSubCategory: 'OTHER_TAX',
            subCategory: 'OTHER_TAX',
            noDocument: true,
            customText: 'test',
            documentStatus: 'TO_PROCESS',
            name: 'https://api-preprod.dossierfacile.fr/api/document/resource/f47f0016-287b-40b2-a8ae-9e50325b5182',
            files: []
          },
          {
            id: 61362,
            documentCategory: 'IDENTIFICATION',
            documentSubCategory: 'OTHER_IDENTIFICATION',
            subCategory: 'OTHER_IDENTIFICATION',
            documentStatus: 'TO_PROCESS',
            name: 'https://api-preprod.dossierfacile.fr/api/document/resource/8b3f3a14-192a-4d86-86ac-719c88587326',
            files: [
              {
                id: 67717,
                path: '',
                preview: 'https://api-preprod.dossierfacile.fr/api/file/preview/67717',
                originalName: 'tenant-profile.pdf',
                size: 1197889,
                numberOfPages: 1,
                contentType: 'application/pdf'
              }
            ]
          }
        ],
        guarantors: [],
        franceConnect: false
      }
    ]
  }
}
