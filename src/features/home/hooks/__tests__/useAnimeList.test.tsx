import { renderHook, waitFor } from "@testing-library/react";
import { useAnimeList } from "../useAnimeList";
import { mockResponseAnimeList } from "./mocks/response";

const mockGetAnimeList = jest.fn();
const mockRefetchGetAnimeList = jest.fn();

jest.mock("@apollo/client", () => {
  const mockModule = jest.requireActual("@apollo/client");

  return {
    ...mockModule,
    useQuery: () => {
      const result = mockGetAnimeList.mockReturnValue({
        data: mockResponseAnimeList,
        isLoading: false,
        refetch: (params: Record<string, any>) => mockRefetchGetAnimeList(params)
      });
      return result();
    }
  };
});

describe("Testing custom hook useAnimeList", () => {
  afterAll(() => {
    jest.clearAllMocks();
  })
  
  it("useAnimeList work correctly", async () => {
    const { result } = renderHook(() => useAnimeList());

    await waitFor(() => {
      return expect(result.current.data).toBe(mockResponseAnimeList);
    })

    expect(mockGetAnimeList).toBeCalledTimes(1);

    result.current.onChangePage(3);
    
    await waitFor(() => {
      return expect(mockRefetchGetAnimeList).toHaveBeenNthCalledWith(1, {
        page: 3,
        perPage: 10
      });
    })
    expect(mockRefetchGetAnimeList).toBeCalledTimes(1);
  });
});
