import React, { useState } from 'react'
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonList,
} from '@ionic/react'
import { teks } from '../../data/teks'
import { speciesList } from '../../data/species'
import type { LogEntry } from '../../utils/logbook'

interface Props {
  onSave: (entry: LogEntry) => void
  onCancel: () => void
}

const LogEntryForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [tekIds, setTekIds] = useState<string[]>([])
  const [speciesIds, setSpeciesIds] = useState<string[]>([])

  const handleSubmit = () => {
    if (!date || !title) return
    onSave({
      id: Date.now().toString(),
      date,
      title,
      body,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      tekIds,
      speciesIds,
    })
    setTitle('')
    setBody('')
    setTags('')
    setTekIds([])
    setSpeciesIds([])
  }

  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonInput type="date" value={date} onIonChange={(e) => setDate(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Notes</IonLabel>
          <IonTextarea
            value={body}
            autoGrow
            placeholder="Surface conditions, misting, lessons..."
            onIonChange={(e) => setBody(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Tags (comma separated)</IonLabel>
          <IonInput value={tags} onIonChange={(e) => setTags(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">TEKs Referenced</IonLabel>
          <IonSelect
            multiple
            value={tekIds}
            onIonChange={(e) => setTekIds(e.detail.value as string[])}
          >
            {teks.map((tek) => (
              <IonSelectOption key={tek.id} value={tek.id}>
                {tek.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Species</IonLabel>
          <IonSelect
            multiple
            value={speciesIds}
            onIonChange={(e) => setSpeciesIds(e.detail.value as string[])}
          >
            {speciesList.map((species) => (
              <IonSelectOption key={species.id} value={species.id}>
                {species.commonName}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
      <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
        Save Entry
      </IonButton>
      <IonButton expand="block" fill="clear" onClick={onCancel}>
        Cancel
      </IonButton>
    </IonContent>
  )
}

export default LogEntryForm
