import React from 'react'
import { IonItem, IonLabel, IonList, IonNote, IonButton } from '@ionic/react'
import type { LogEntry } from '../../utils/logbook'

interface Props {
  entries: LogEntry[]
  onSelect: (entry: LogEntry) => void
  onDelete: (entry: LogEntry) => void
}

const LogEntryList: React.FC<Props> = ({ entries, onSelect, onDelete }) => (
  <IonList>
    {entries.length === 0 && <IonNote className="ion-padding">No log entries yet.</IonNote>}
    {entries.map((entry) => (
      <IonItem key={entry.id} className="logbook-entry" button detail onClick={() => onSelect(entry)}>
        <IonLabel>
          <h2>{entry.title}</h2>
          <p>{entry.date}</p>
          <div className="tags">
            {entry.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </IonLabel>
        <IonButton
          slot="end"
          color="danger"
          fill="clear"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(entry)
          }}
        >
          Delete
        </IonButton>
      </IonItem>
    ))}
  </IonList>
)

export default LogEntryList
