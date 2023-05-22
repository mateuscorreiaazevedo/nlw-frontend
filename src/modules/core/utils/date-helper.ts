import dayjs from 'dayjs'

export const dateHelper = {
  formatDate: (date?: string) => dayjs(date).format('D[ de ]MMMM[, ]YYYY')
}
