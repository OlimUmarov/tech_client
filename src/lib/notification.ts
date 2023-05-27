import { notifications} from '@mantine/notifications'

export const notifyMessage = (title: string, mesasge: string, color: 'red' | 'blue') => notifications.show({
    title: title,
    message: mesasge,
    color: color,
  })