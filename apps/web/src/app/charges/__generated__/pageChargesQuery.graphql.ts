/**
 * @generated SignedSource<<eb8bf9f3b0853b5340d0bf7f7be8b7b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type pageChargesQuery$variables = Record<PropertyKey, never>;
export type pageChargesQuery$data = {
  readonly charges: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly brCode: string;
        readonly customerEmail: string;
        readonly customerName: string;
        readonly customerTaxID: string;
        readonly id: string;
        readonly product: {
          readonly description: string;
          readonly displayName: string;
          readonly id: string;
          readonly name: string;
          readonly price: number;
        };
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type pageChargesQuery = {
  response: pageChargesQuery$data;
  variables: pageChargesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChargeEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Charge",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "brCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "customerName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "customerTaxID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "customerEmail",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "product",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
                "name": "displayName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "price",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageChargesQuery",
    "selections": [
      {
        "alias": "charges",
        "args": null,
        "concreteType": "ChargeConnection",
        "kind": "LinkedField",
        "name": "__ChargeList_charges_connection",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pageChargesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChargeConnection",
        "kind": "LinkedField",
        "name": "charges",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "charges(first:100)"
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "ChargeList_charges",
        "kind": "LinkedHandle",
        "name": "charges"
      }
    ]
  },
  "params": {
    "cacheID": "73d44e80f255bdcaff61bbca52965dd9",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "charges"
          ]
        }
      ]
    },
    "name": "pageChargesQuery",
    "operationKind": "query",
    "text": "query pageChargesQuery {\n  charges(first: 100) {\n    edges {\n      cursor\n      node {\n        id\n        brCode\n        customerName\n        customerTaxID\n        customerEmail\n        product {\n          id\n          name\n          displayName\n          description\n          price\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dc036198533e7e3216a0b5fcdb4550e9";

export default node;
