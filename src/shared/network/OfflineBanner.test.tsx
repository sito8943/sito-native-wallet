import { render } from "@testing-library/react-native"

import OfflineBanner from "./OfflineBanner"
import useIsOnline from "./useIsOnline"

jest.mock("#shared/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key }),
}))

jest.mock("./useIsOnline", () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockedUseIsOnline = jest.mocked(useIsOnline)

describe("Network > OfflineBanner", () => {
  it("renders the banner when offline", () => {
    mockedUseIsOnline.mockReturnValue(false)

    const { getByText } = render(<OfflineBanner />)

    expect(getByText("common.offline")).toBeTruthy()
  })

  it("renders nothing when online", () => {
    mockedUseIsOnline.mockReturnValue(true)

    const { queryByText } = render(<OfflineBanner />)

    expect(queryByText("common.offline")).toBeNull()
  })
})
