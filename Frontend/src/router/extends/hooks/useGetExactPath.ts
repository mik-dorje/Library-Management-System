import { useContext, useMemo } from 'react'
import { UNSAFE_RouteContext } from 'react-router-dom'

export const useGetExactPath = () => {
  const routeContext = useContext(UNSAFE_RouteContext)

  return useMemo(
    () =>
      routeContext.matches
        .map(({ route: { path } }) => path)
        .filter(Boolean)
        .join('/')
        .replaceAll(/\/\*?\//g, '/'),
    [routeContext.matches]
  )
}
