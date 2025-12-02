import React, { useMemo, useState } from 'react'
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonNote,
  IonChip,
} from '@ionic/react'
import { teks } from '../data/teks'
import { speciesList } from '../data/species'
import { recipes } from '../data/recipes'
import { guides } from '../data/guides'
import { conversionReferences } from '../data/conversions'

const ReferencePage: React.FC = () => {
  const [segment, setSegment] = useState<'teks' | 'species' | 'recipes' | 'guides'>('teks')
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState<
    | { type: 'tek'; id: string }
    | { type: 'species'; id: string }
    | { type: 'recipe'; id: string }
    | { type: 'guide'; id: string }
    | null
  >(null)

  const filteredItems = useMemo(() => {
    const text = searchText.toLowerCase()
    switch (segment) {
      case 'species':
        return speciesList.filter((item) =>
          `${item.commonName} ${item.latinName}`.toLowerCase().includes(text),
        )
      case 'recipes':
        return recipes.filter((item) => item.name.toLowerCase().includes(text))
      case 'guides':
        return guides.filter((item) =>
          `${item.title} ${item.category}`.toLowerCase().includes(text),
        )
      default:
        return teks.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(text))
    }
  }, [segment, searchText])

  const tekDetail = selected?.type === 'tek' ? teks.find((t) => t.id === selected.id) : undefined
  const speciesDetail =
    selected?.type === 'species' ? speciesList.find((spec) => spec.id === selected.id) : undefined
  const recipeDetail =
    selected?.type === 'recipe' ? recipes.find((recipe) => recipe.id === selected.id) : undefined
  const guideDetail =
    selected?.type === 'guide' ? guides.find((guide) => guide.id === selected.id) : undefined

  const modalOpen = !!(tekDetail || speciesDetail || recipeDetail || guideDetail)

  const tekName = (id: string) => teks.find((t) => t.id === id)?.name ?? id
  const speciesName = (id: string) =>
    speciesList.find((spec) => spec.id === id)?.commonName ?? id

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Reference</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          className="list-searchbar"
          placeholder="Search teks, species, recipes..."
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value ?? '')}
        />
        <IonSegment
          value={segment}
          onIonChange={(e) => setSegment((e.detail.value as typeof segment) ?? 'teks')}
        >
          <IonSegmentButton value="teks">
            <IonLabel>TEKs</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="species">
            <IonLabel>Species</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="recipes">
            <IonLabel>Recipes</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="guides">
            <IonLabel>Guides</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList>
          {filteredItems.map((item) => (
            <IonItem
              key={(item as { id: string }).id}
              button
              detail
              onClick={() =>
                setSelected(
                  segment === 'teks'
                    ? { type: 'tek', id: (item as { id: string }).id }
                    : segment === 'species'
                      ? { type: 'species', id: (item as { id: string }).id }
                      : segment === 'recipes'
                        ? { type: 'recipe', id: (item as { id: string }).id }
                        : { type: 'guide', id: (item as { id: string }).id },
                )
              }
            >
              <IonLabel>
                <h2>
                  {segment === 'teks' && (item as typeof teks[number]).name}
                  {segment === 'species' && (item as typeof speciesList[number]).commonName}
                  {segment === 'recipes' && (item as typeof recipes[number]).name}
                  {segment === 'guides' && (item as typeof guides[number]).title}
                </h2>
                {segment === 'teks' && <p>{(item as typeof teks[number]).category}</p>}
                {segment === 'species' && (
                  <p>{(item as typeof speciesList[number]).latinName}</p>
                )}
                {segment === 'recipes' && (
                  <IonBadge color="secondary">{(item as typeof recipes[number]).type}</IonBadge>
                )}
                {segment === 'guides' && <p>{(item as typeof guides[number]).category}</p>}
                {segment === 'teks' && (
                  <IonNote>Difficulty: {(item as typeof teks[number]).difficulty}</IonNote>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <section className="ion-padding">
          <h3 className="section-heading">Conversion Quick Notes</h3>
          {conversionReferences.map((ref) => (
            <IonNote key={ref.id} className="ion-margin-bottom" color="medium">
              <p><strong>{ref.label}</strong></p>
              <p>{ref.details}</p>
            </IonNote>
          ))}
        </section>

        <IonModal isOpen={modalOpen} onDidDismiss={() => setSelected(null)} className="custom-modal">
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                {tekDetail?.name ??
                  speciesDetail?.commonName ??
                  recipeDetail?.name ??
                  guideDetail?.title ??
                  'Details'}
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelected(null)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="detail-modal-content">
            {tekDetail && (
              <div>
                <IonChip color="primary">{tekDetail.category}</IonChip>
                <IonChip color="secondary">{tekDetail.difficulty}</IonChip>
                <p className="ion-padding-top">{tekDetail.summary}</p>
                <h4>Steps</h4>
                <ul>
                  {tekDetail.stepsOutline.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <h4>Recommended Species</h4>
                <IonNote>{tekDetail.recommendedSpecies.map(speciesName).join(', ')}</IonNote>
              </div>
            )}
            {speciesDetail && (
              <div>
                <IonChip color="secondary">{speciesDetail.category}</IonChip>
                <p className="ion-padding-top">
                  <strong>{speciesDetail.latinName}</strong>
                </p>
                <p>{speciesDetail.notes}</p>
                <p>
                  Colonization: {speciesDetail.typicalColonizationTempC[0]}–
                  {speciesDetail.typicalColonizationTempC[1]}°C
                </p>
                <p>
                  Fruiting: {speciesDetail.typicalFruitingTempC[0]}–
                  {speciesDetail.typicalFruitingTempC[1]}°C
                </p>
                <p>
                  Humidity: {speciesDetail.typicalRHPercent[0]}–
                  {speciesDetail.typicalRHPercent[1]}%
                </p>
              </div>
            )}
            {recipeDetail && (
              <div>
                <IonChip color="primary">{recipeDetail.type}</IonChip>
                <p className="ion-padding-top">{recipeDetail.notes}</p>
                <h4>Ingredients</h4>
                <ul>
                  {recipeDetail.ingredients.map((ing) => (
                    <li key={ing.name}>
                      {ing.name}: {ing.quantity} {ing.unit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {guideDetail && (
              <div>
                <IonChip color="secondary">{guideDetail.category}</IonChip>
                <p className="ion-padding-top">{guideDetail.summary}</p>
                <h4>Related</h4>
                <IonNote>TEKs: {guideDetail.relatedTekIds.map(tekName).join(', ')}</IonNote>
                <IonNote>Species: {guideDetail.relatedSpeciesIds.map(speciesName).join(', ')}</IonNote>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default ReferencePage
