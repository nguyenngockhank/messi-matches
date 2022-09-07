
import { competitionLogoMap } from '../data/competitionLogoMap'

export const competitionLogo = (competition) => `
<span class="comp-container">
    <img class="comp-icon" title="${competition}" src="./img/${competitionLogoMap[competition]}"/>
</span>
`