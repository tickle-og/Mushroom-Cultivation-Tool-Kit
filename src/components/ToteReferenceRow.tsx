import React from 'react'
import { ToteIcon } from './ToteIcon'

const toteReferences = [
  { id: 'shoebox', label: 'Shoebox', volumeQt: 6, dimensions: '10×7×6 in' },
  { id: 'mini-tub', label: '32 qt Mono', volumeQt: 32, dimensions: '22×15×13 in' },
  { id: 'standard-mono', label: '54 qt Mono', volumeQt: 54, dimensions: '24×16×15 in' },
  { id: 'xl-mono', label: '66 qt Mono', volumeQt: 66, dimensions: '30×16×15 in' },
]

export const ToteReferenceRow: React.FC = () => (
  <div className="tote-reference-row">
    {toteReferences.map((tote) => (
      <ToteIcon key={tote.id} label={tote.label} volumeQt={tote.volumeQt} dimensions={tote.dimensions} />
    ))}
  </div>
)
