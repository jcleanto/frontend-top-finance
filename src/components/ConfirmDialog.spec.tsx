import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog Tests", () => {
  const mockHandleClose = jest.fn();
  const mockHandleConfirm = jest.fn();

  test("should have the correct title and description values", async () => {
    render(
      <ConfirmDialog
        title="Test Dialog"
        description="Test Dialog Description"
        handleClose={mockHandleClose}
        handleConfirm={mockHandleConfirm}
        open={true}
      />
    );

    // correct title
    const title = await waitFor(() => screen.getByText('Test Dialog'));
    expect(title).toBeInTheDocument();

    // correct description
    const description = await waitFor(() => screen.getByText('Test Dialog Description'));
    expect(description).toBeInTheDocument();
  });

  test("should trigger handleClose", async () => {
    render(
      <ConfirmDialog
        title="Test Dialog"
        description="Test Dialog Description"
        handleClose={mockHandleClose}
        handleConfirm={mockHandleConfirm}
        open={true}
      />
    );

    const cancelButton = await waitFor(() => screen.getByText(/cancelar/i));
    await act(async () => {
      fireEvent.click(cancelButton);
    })
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("should trigger handleConfirm", async () => {
    render(
      <ConfirmDialog
        title="Test Dialog"
        description="Test Dialog Description"
        handleClose={mockHandleClose}
        handleConfirm={mockHandleConfirm}
        open={true}
      />
    );

    const confirmButton = await waitFor(() => screen.getByText(/confirmar/i));
    await act(async () => {
      fireEvent.click(confirmButton);
    })
    expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
  });
});