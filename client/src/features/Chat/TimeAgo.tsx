import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export interface TimeAgoProps{
  timestamp?:string |null
}

export default function TimeAgo({timestamp}:TimeAgoProps){
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}