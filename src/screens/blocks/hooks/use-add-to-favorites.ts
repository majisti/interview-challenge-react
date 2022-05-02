import { useCallback } from 'react'
import { setFavorites } from '../../../modules/spells'
import { useDispatch } from 'react-redux'

export const useAddToFavorites = (selectedSpell: string | null, spellDescription?: { name: string }) => {
  const dispatch = useDispatch()

  return useCallback(async () => {
    await fetch(`${process.env.REACT_APP_FAVORITE_SPELLS_API_URL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        spellId: selectedSpell,
        spellName: spellDescription?.name,
        dateAdded: new Date(),
      }),
    })
    const favorites = await fetch(`${process.env.REACT_APP_FAVORITE_SPELLS_API_URL}`)

    if (favorites.status >= 200 && favorites.status < 300) {
      dispatch(setFavorites(await favorites.json() || []))
    }
  }, [dispatch, selectedSpell, spellDescription?.name])
}
