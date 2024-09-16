/**
 * Convert JWT exp in days
 * @param exp - Number to be converted
 * @returns Converted exp in days 
 */

export function jwtExpirationDateConverter (exp: number ): number {
  const currentTime = Math.floor(Date.now()/1000)
  const secondsUntilExpirantion = exp - currentTime
  const secondsInADay = 60*60*24
  const daysUntilExpiration = secondsUntilExpirantion / secondsInADay
  return daysUntilExpiration
}