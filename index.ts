import { generateChecksum } from '@allmaps/id'

import sourceProjections from './source/projections.json' with { type: 'json' }

type Projection = {
  id: string
  definition: string
  bbox?: number[]
  name: string
  epsg: number
}

const projections: Projection[] = []

for (const projection of sourceProjections) {
  const id = await generateChecksum({
    name: projection.name,
    definition: projection.definition
  })

  projections.push({
    id: `https://api.allmaps.org/projections/${id}`,
    definition: projection.definition.trim(),
    name: `EPSG:${projection.code} - ${projection.name}`,
    epsg: Number(projection.code),
    bbox: projection.bbox
  })
}

console.log(JSON.stringify(projections, null, 2))
