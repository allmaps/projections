import { generateId } from '@allmaps/id'

import sourceProjections from './source/projections.json' with { type: 'json' }

type Projection = {
  id: string
  code: string
  definition: string
  name: string
  epsg: number
}

const projections: Projection[] = []

for (const projection of sourceProjections) {
  const id = await generateId(projection.definition)

  projections.push({
    id: `https://api.allmaps.org/projections/${id}`,
    code: projection.code,
    definition: projection.definition.trim(),
    name: `EPSG:${projection.code} - ${projection.name}`,
    epsg: Number(projection.code)
  })
}

console.log(JSON.stringify(projections, null, 2))
