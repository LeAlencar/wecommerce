/**
 * @generated SignedSource<<b8ca7ee98326e081c575f7ecbdd40c03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Product_product$data = {
  readonly description: string;
  readonly displayName: string;
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly " $fragmentType": "Product_product";
};
export type Product_product$key = {
  readonly " $data"?: Product_product$data;
  readonly " $fragmentSpreads": FragmentRefs<"Product_product">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Product_product",
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

(node as any).hash = "27ce7b0fe6bdafc4df5263cd55f8cbfe";

export default node;
