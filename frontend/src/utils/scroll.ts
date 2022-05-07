import { animateScroll } from 'react-scroll'

export const scrollToBottomAnimated = (containerId: string) => {
  animateScroll.scrollToBottom({
    containerId,
    duration: 250,
  })
}
