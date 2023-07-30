import React from "react"
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../index";
import { IPagination } from "../types";

describe('Testing Component Pagination', () => {
  it("Should render correctly", () => {
    const mockPage: IPagination = {
      currentPage: 1,
      hasNextPage: false,
      lastPage: 500,
      perPage: 10,
      total: 5000
    }

    const mockOnChange = jest.fn();

    render(<Pagination {...mockPage} onChangePage={mockOnChange} />);

    expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();

    fireEvent.click(screen.getByText('4'));

    expect(mockOnChange).toHaveBeenNthCalledWith(1, 4);
    expect(mockOnChange).toBeCalledTimes(1);
  })

  it("Show prev button and next button", () => {
    const mockPage: IPagination = {
      currentPage: 5,
      hasNextPage: false,
      lastPage: 500,
      perPage: 10,
      total: 5000
    }

    const mockOnChange = jest.fn();

    render(<Pagination {...mockPage} onChangePage={mockOnChange} />);
    

    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.queryByText('7')).not.toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('prev-button'));
    fireEvent.click(screen.getByTestId('next-button'));
    
    expect(mockOnChange).toBeCalledTimes(2);
  })
  
  it("Show page when total is less than 10", () => {
    const mockPage: IPagination = {
      currentPage: 1,
      hasNextPage: false,
      lastPage: 1,
      perPage: 10,
      total: 9
    }

    const mockOnChange = jest.fn();

    render(<Pagination {...mockPage} onChangePage={mockOnChange} />);
    

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
  })
})