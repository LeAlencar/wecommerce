/**
 * @generated SignedSource<<2dfccdecb4234837e6b94259f333a934>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type page_checkout$data = {
  readonly description: string;
  readonly displayName: string;
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly " $fragmentType": "page_checkout";
};
export type page_checkout$key = {
  readonly " $data"?: page_checkout$data;
  readonly " $fragmentSpreads": FragmentRefs<"page_checkout">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "page_checkout",
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

(node as any).hash = "5318544f620fd07bf511bc2e399b7585";

export default node;
