import { ProviderAnimeItem } from "../../src/features/shared/contexts/useAnimeItem";
import Details from '../../src/features/details'
import MainLayout from '../../src/features/shared/layouts/MainLayouts'

function DetailsPage() {
  return (
    <MainLayout>
      <ProviderAnimeItem>
        <Details />
      </ProviderAnimeItem>
    </MainLayout>
  )
}

export default DetailsPage
