import { LitElement, css, svg } from "lit-element";
import Random from "./random.js";
import { accessoriesTypes } from "./accessories";
import { facialHairTypes } from "./facial-hair";
import { topTypes } from "./top";
import { mouthTypes } from "./mouth";
import { clothesType } from "./clothes";
import { eyeTypes } from "./eyes";
import { eyebrowTypes } from "./eyebrows";
import { noseTypes } from "./nose";


function hash(str) {
  const hash = str
    .split("")
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    );
  return hash >= 0 ? hash : -hash;
}

const hatColors = {
  Black: "#262E33",
  Blue01: "#65C9FF",
  Blue02: "#5199E4",
  Blue03: "#25557C",
  Gray01: "#E6E6E6",
  Gray02: "#929598",
  Heather: "#3C4F5C",
  PastelBlue: "#B1E2FF",
  PastelGreen: "#A7FFC4",
  PastelOrange: "#FFDEB5",
  PastelRed: "#FFAFB9",
  PastelYellow: "#FFFFB1",
  Pink: "#FF488E",
  Red: "#FF5C5C",
  White: "#FFFFFF"
};

const hairColors = {
  Auburn: "#A55728",
  Black: "#2C1B18",
  Blonde: "#B58143",
  BlondeGolden: "#D6B370",
  Brown: "#724133",
  BrownDark: "#4A312C",
  PastelPink: "#F59797",
  Platinum: "#ECDCBF",
  Red: "#C93305",
  SilverGray: "#E8E1E1"
};
const skinColors = {
  Tanned: "#FD9841",
  Yellow: "#F8D25C",
  Pale: "#FFDBB4",
  Light: "#EDB98A",
  Brown: "#D08B5B",
  DarkBrown: "#AE5D29",
  Black: "#614335"
};

function randomOption(random, optionMap) {

  const options = Object.keys(optionMap);
  const index = (random || new Random(1)).nextInt(0, options.length);
  const val = options[index]
  return val
}

class Avataaars extends LitElement {

  static get properties() {
    return {
      top: { type: String },
      accessory: { type: String },
      clothe: { type: String },
      eyebrow: { type: String },
      eye: { type: String },
      facialHair: { type: String },
      mouth: { type: String },
      nose: { type: String },
      skinColor: { type: String },
      hairColor: { type: String },
      facialHairColor: { type: String },
      hatColor: { type: String },
      circleColor: { type: String },
      options: { type: Object },
      identifier: { type: String }
    };
  }

  constructor() {
    super();
    this.options = {};
    this.identifier = null;

    this.top = "Hat";
    this.accessory = "Blank";
    this.clothe = "BlazerSweater";
    this.eyebrow = "Default";
    this.eye = "Default";
    this.facialHair = "BeardLight";
    this.mouth = "Smile";
    this.nose = "Default";

    this.skinColor = "Tanned";
    this.hairColor = "Red";
    this.facialHairColor = "Red";
    this.hatColor = "Blue01";
    this.circleColor = "#6fb8e0";

  }

  set identifier(identifier) {
    if (!identifier){
      return
    }
    const identifierSeed = hash(identifier);
    const random = new Random(identifierSeed);

    this.top = randomOption(random, topTypes);
    this.accessory = randomOption(random, accessoriesTypes);
    this.clothe = randomOption(random, clothesType);
    this.eyebrow = randomOption(random, eyebrowTypes);
    this.eye = randomOption(random, eyeTypes);
    this.facialHair = randomOption(random, facialHairTypes);
    this.mouth = randomOption(random, mouthTypes);
    this.nose = "Default";

    this.skinColor = randomOption(random, skinColors);
    this.hairColor = randomOption(random, hairColors);
    this.facialHairColor = randomOption(random, hairColors);
    this.hatColor = randomOption(random, hatColors);
  }

  connectedCallback() {
    super.connectedCallback();

    this.style.setProperty(
      "--avataaar-circle-color",
      this.options.circleColor || this.circleColor
    );
    this.style.setProperty(
      "--avataaar-internal-circle-color",
      this.options.circleColor || this.circleColor
    );
    this.style.setProperty(
      "--avataaar-hair-color",
      hairColors[this.options.hairColor || this.hairColor]
    );
    this.style.setProperty(
      "--avataaar-skin-color",
      skinColors[this.options.skinColor || this.skinColor]
    );
    this.style.setProperty(
      "--avataaar-facial-hair-color",
      hairColors[this.options.facialHairColor || this.facialHairColor]
    );
    this.style.setProperty(
      "--avataaar-hat-color",
      hatColors[this.options.hatColor | this.hatColor]
    );
  }

  static get styles() {
    return css`
        :host {
          display: inline-block;
          width: 50px;
        }
      `;
  }

  render() {
    return svg`
          <svg
        viewBox='0 0 264 280'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlns:xlink='http://www.w3.org/1999/xlink'>
        <desc>Created with getavataaars.com</desc>
        <defs>
          <circle id='path-1' cx='120' cy='120' r='120' />
          <path
            d='M12,160 C12,226.27417 65.72583,280 132,280 C198.27417,280 252,226.27417 252,160 L264,160 L264,-1.42108547e-14 L-3.19744231e-14,-1.42108547e-14 L-3.19744231e-14,160 L12,160 Z'
            id='path-2'
          />
          <path
            d='M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z'
            id='path-silhouette'
          />
        </defs>
        <g
          id='Avataaar'
          stroke='none'
          stroke-width='1'
          fill='none'
          fill-rule='evenodd'>
          <g
            transform='translate(-825.000000, -1100.000000)'
            id='Avataaar/Circle'>
            <g transform='translate(825.000000, 1100.000000)'>
                <g
                  id='Circle'
                  stroke-width='1'
                  fill-rule='evenodd'
                  transform='translate(12.000000, 40.000000)'>
                  <mask id='mask-1' fill='white'>
                    <use xlink:href='#path-1' />
                  </mask>
                  <use
                    id='Circle-Background'
                    fill='#E6E6E6'
                    xlink:href='#path-1'
                  />
                  <g
                    id='Color/Palette/Blue-01'
                    mask='url(#mask-1)'
                    fill='var(--avataaar-internal-circle-color)'>
                    <rect id='🖍Color' x='0' y='0' width='240' height='240' />
                  </g>
                </g>
                <mask id='mask-2' fill='white'>
                  <use xlink:href='#path-2' />
                </mask>
              <g id='Mask' />
              <g
                id='Avataaar'
                stroke-width='1'
                fill-rule='evenodd'
                fill='black'
                mask='url(#mask-2)'>
                <g id='Body' transform='translate(32.000000, 36.000000)'>
                  <mask id='mask-silhouette' fill='white'>
                    <use xlink:href='#path-silhouette' />
                  </mask>
                  <use fill='var(--avataaar-skin-color)' xlink:href='#path-silhouette' />
                  <path
                    d='M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z'
                    id='Neck-Shadow'
                    fillOpacity='0.100000001'
                    fill='#000000'
                    mask='url(#mask-silhouette)'
                  />
                </g>
                ${clothesType[this.clothe]}
                ${eyebrowTypes[this.eyebrow]}
                ${eyeTypes[this.eye]}
                ${mouthTypes[this.mouth]}
                ${noseTypes[this.nose]}
                ${topTypes[this.top]}                
                ${facialHairTypes[this.facialHair]}
                ${accessoriesTypes[this.accessory]}
              </g>
            </g>
          </g>
        </g>
      </svg>
`;
  }
}
// Register the element with the browser
customElements.define("avataaars", Avataaars);

module.exports = {
  random: {
    option: randomOption,
    seed: Random
  },
  Avataaars,
  variations: {
    accessories: Object.keys(accessoriesTypes),
    facialHair: Object.keys(facialHairTypes),
    top: Object.keys(topTypes),
    mouth: Object.keys(mouthTypes),
    clothe: Object.keys(clothesType),
    eye: Object.keys(eyeTypes),
    eyebrow: Object.keys(eyebrowTypes),
    nose: Object.keys(noseTypes)
  },
  colors: {
    hat: Object.keys(hatColors),
    skin: Object.keys(skinColors),
    hair: Object.keys(hairColors),
    facialHair: Object.keys(hairColors)
  }
}