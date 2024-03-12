import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedTraduction extends Schema.Component {
  collectionName: 'components_shared_traductions';
  info: {
    displayName: 'traduction';
    icon: 'bulletList';
  };
  attributes: {
    key: Attribute.String;
    value: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.traduction': SharedTraduction;
    }
  }
}
