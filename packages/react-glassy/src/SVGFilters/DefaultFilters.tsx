import { FILTER_IDS } from '../constants';

export const DefaultFilters = () => (
  <>
    <filter id={FILTER_IDS.CARD_DISTORTION} x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="17" />
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feSpecularLighting
        in="blur"
        surfaceScale="4"
        specularConstant="0.8"
        specularExponent="80"
        lightingColor="white"
      >
        <fePointLight x="-150" y="-150" z="250" />
      </feSpecularLighting>
      <feDisplacementMap
        in="SourceGraphic"
        in2="blur"
        scale="120"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>

    <filter id={FILTER_IDS.PRESET_PULSE} x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="1" seed="7" />
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="blur"
        scale="80"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>

    <filter id={FILTER_IDS.PRESET_FROST} x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="14" />
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feSpecularLighting
        in="blur"
        surfaceScale="6"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feDisplacementMap
        in="SourceGraphic"
        in2="blur"
        scale="60"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>

    <filter id={FILTER_IDS.PRESET_EDGE} x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="99" />
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="blur"
        scale="150"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </>
);
