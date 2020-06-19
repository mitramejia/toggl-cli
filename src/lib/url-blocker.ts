import {set} from 'hostile'

const LOCALHOST = '127.0.0.1'
const BANNED = [
  'www.facebook.com',
  'www.instagram.com',
  'www.youtube.com',
]

export const disableUrls = () => {
  BANNED.forEach(url => {
    set(LOCALHOST, url,  err => {
      if (err) throw err
    })
  })
}
