import { type IconProp } from "@fortawesome/fontawesome-svg-core"

import {
  faRotate,
  faTrash,
  faPen,
  faPlus,
  faArrowTrendUp,
  faArrowTrendDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons"

export const APP_ICONS: Record<string, IconProp> = {
  reset: faRotate,
  delete: faTrash,
  edit: faPen,
  add: faPlus,
  in: faArrowTrendUp,
  out: faArrowTrendDown,
  chevronDown: faChevronDown,
  chevronUp: faChevronUp,
}
