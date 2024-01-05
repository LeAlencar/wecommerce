/**
 * @generated SignedSource<<96090b73970a21fbbb5d2af527c218e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductFragment_product$data = {
  readonly description: string;
  readonly displayName: string;
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly " $fragmentType": "ProductFragment_product";
};
export type ProductFragment_product$key = {
  readonly " $data"?: ProductFragment_product$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProductFragment_product">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductFragment_product",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "840df8ea37cd3f818fe0caaf057d36f4";

export default node;
