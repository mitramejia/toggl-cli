import {remove, set} from 'hostile'

const LOCALHOST = '127.0.0.1'

export const disableUrls = (bannedUrls: string[]) => {
  bannedUrls.forEach(url => {
    set(LOCALHOST, url, err => {
      if (err) throw err
    })
  })
}

export const enableUrls = (bannedUrls: string[]) => {
  bannedUrls.forEach(url => {
    remove(LOCALHOST, url, err => {
      if (err) throw err
    })
  })
}
