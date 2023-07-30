import "@testing-library/jest-dom";

const mockRouter = {
  "pathname": "/",
  "route": "/",
  "query": {},
  "asPath": "/",
  "components": {
      "/": {
          "initial": true,
          "props": {
              "pageProps": {}
          }
      },
      "/_app": {
          "styleSheets": []
      }
  },
  "isFallback": false,
  "basePath": "",
  "isReady": true,
  "isPreview": false,
  "isLocaleDomain": false,
  "events": {}
}

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");
  return {
    ...mockModule,
    useRouter: () => (mockRouter)
  }
})