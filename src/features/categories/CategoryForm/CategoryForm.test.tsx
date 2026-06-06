import { fireEvent, render, userEvent } from "@testing-library/react-native"

import CategoryForm from "./CategoryForm"

describe("Categories > CategoryForm", () => {
  it("validates input and submits normalized values", async () => {
    const onSubmit = jest.fn()
    const { getByPlaceholderText, getByText, queryByText } = render(
      <CategoryForm submitLabel="Save category" onSubmit={onSubmit} />,
    )

    fireEvent.changeText(getByPlaceholderText("Groceries"), "Eating out")
    fireEvent.changeText(getByPlaceholderText("#2e7d32"), "bad-color")

    await userEvent.press(getByText("Save category"))

    expect(getByText("Enter a valid hex color (e.g. #2e7d32)")).toBeTruthy()
    expect(onSubmit).not.toHaveBeenCalled()

    fireEvent.changeText(getByPlaceholderText("#2e7d32"), "  #123abc  ")

    await userEvent.press(getByText("Income"))
    await userEvent.press(getByText("Save category"))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Eating out",
      color: "#123abc",
      type: 1,
    })
    expect(queryByText("Enter a valid hex color (e.g. #2e7d32)")).toBeNull()
  })
})
