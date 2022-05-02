import { useCallback } from 'react'
import { setFavorites } from '../../../modules/spells'
import { useDispatch } from 'react-redux'

export const useRemoveFromFavorites = (selectedSpell: string | null) => {
  const dispatch = useDispatch()

  return useCallback(async () => {
    await fetch(`${process.env.REACT_APP_FAVORITE_SPELLS_API_URL}/${selectedSpell}`, {
      method: 'DELETE',
      body: selectedSpell
    })
    const favorites = await fetch(`${process.env.REACT_APP_FAVORITE_SPELLS_API_URL}`)
    dispatch(setFavorites(await favorites.json() || []))
  }, [dispatch, selectedSpell])
}
