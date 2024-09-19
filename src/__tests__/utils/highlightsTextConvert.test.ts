import { highlightsTextConvert } from '@/utils'

describe('highlightsTextConvert', () => {
  it('should return the correct text for "alert"', () => {
    expect(highlightsTextConvert('alert')).toBe('* Meta longe de ser batida')
  })

  it('should return the correct text for "success"', () => {
    expect(highlightsTextConvert('success')).toBe(
      '* A meta do mês foi batida! Parabéns.'
    )
  })

  it('should return the correct text for "warning"', () => {
    expect(highlightsTextConvert('warning')).toBe('* Falta pouco, vamos lá')
  })

  it('should return the default for unknown input', () => {
    expect(highlightsTextConvert('un')).toBe('* Sem dados no momento')
  })
})
