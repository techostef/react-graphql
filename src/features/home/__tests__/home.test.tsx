import React from 'react';
import { render, screen } from "@testing-library/react";
import { mockResponseAnimeList } from "../hooks/__tests__/mocks/response";
import Home from '../index';

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


describe("Testing component Home", () => {
  it("Should render correctly", async () => {
    render(<Home />);

    // loading waiting data from REST Api
    expect(screen.getByText("Anime list")).toBeInTheDocument();
    expect(await screen.findByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('anime-list')).not.toBeInTheDocument();

    expect(await screen.findByTestId('anime-list')).toBeInTheDocument();
  })
})