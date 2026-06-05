import { render } from "@testing-library/react-native"
import { createElement } from "react"
import { Text } from "react-native"

import Index from "./index"

const mockCreateElement = createElement
const mockText = Text

// Capture the redirect target as text so assertions can read it.
jest.mock("expo-router", () => ({
  Redirect: ({ href }: { href: string }) =>
    mockCreateElement(mockText, null, `redirect:${href}`),
}))

let mockOnboarding: {
  completed: boolean
  isLoading: boolean
  complete: () => void
}
jest.mock("#shared/onboarding", () => ({
  useOnboarding: () => mockOnboarding,
}))

describe("App > Index gate", () => {
  it("renders nothing while the flag is loading", () => {
    mockOnboarding = { completed: false, isLoading: true, complete: jest.fn() }

    const { toJSON } = render(<Index />)

    expect(toJSON()).toBeNull()
  })

  it("redirects to onboarding when not completed", () => {
    mockOnboarding = { completed: false, isLoading: false, complete: jest.fn() }

    const { getByText } = render(<Index />)

    expect(getByText("redirect:/onboarding")).toBeTruthy()
  })

  it("redirects home when already completed", () => {
    mockOnboarding = { completed: true, isLoading: false, complete: jest.fn() }

    const { getByText } = render(<Index />)

    expect(getByText("redirect:/home")).toBeTruthy()
  })
})
