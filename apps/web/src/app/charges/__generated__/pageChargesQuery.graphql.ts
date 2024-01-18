/**
<<<<<<< HEAD
 * @generated SignedSource<<eb8bf9f3b0853b5340d0bf7f7be8b7b4>>
=======
 * @generated SignedSource<<8e33a17a13eede5dbfccc89afc79a1fc>>
>>>>>>> a45ca66 (fix(ts): fix typos)
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
<<<<<<< HEAD
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
=======
      readonly node: {
        readonly brCode: string;
        readonly customerEmail: string;
        readonly product: {
>>>>>>> a45ca66 (fix(ts): fix typos)
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
<<<<<<< HEAD
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
=======
  "name": "brCode",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerEmail",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v6 = {
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
},
v7 = [
>>>>>>> a45ca66 (fix(ts): fix typos)
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
<<<<<<< HEAD
];
=======
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
>>>>>>> a45ca66 (fix(ts): fix typos)
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
<<<<<<< HEAD
        "selections": (v1/*: any*/),
=======
        "selections": [
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
                "concreteType": "Charge",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Product",
                    "kind": "LinkedField",
                    "name": "product",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
>>>>>>> a45ca66 (fix(ts): fix typos)
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
<<<<<<< HEAD
        "args": (v2/*: any*/),
=======
        "args": (v7/*: any*/),
>>>>>>> a45ca66 (fix(ts): fix typos)
        "concreteType": "ChargeConnection",
        "kind": "LinkedField",
        "name": "charges",
        "plural": false,
<<<<<<< HEAD
        "selections": (v1/*: any*/),
=======
        "selections": [
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
                "concreteType": "Charge",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Product",
                    "kind": "LinkedField",
                    "name": "product",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
>>>>>>> a45ca66 (fix(ts): fix typos)
        "storageKey": "charges(first:100)"
      },
      {
        "alias": null,
<<<<<<< HEAD
        "args": (v2/*: any*/),
=======
        "args": (v7/*: any*/),
>>>>>>> a45ca66 (fix(ts): fix typos)
        "filters": null,
        "handle": "connection",
        "key": "ChargeList_charges",
        "kind": "LinkedHandle",
        "name": "charges"
      }
    ]
  },
  "params": {
<<<<<<< HEAD
    "cacheID": "73d44e80f255bdcaff61bbca52965dd9",
=======
    "cacheID": "1820a1031476f1c01011fbf8a35acea2",
>>>>>>> a45ca66 (fix(ts): fix typos)
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
<<<<<<< HEAD
    "text": "query pageChargesQuery {\n  charges(first: 100) {\n    edges {\n      cursor\n      node {\n        id\n        brCode\n        customerName\n        customerTaxID\n        customerEmail\n        product {\n          id\n          name\n          displayName\n          description\n          price\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
=======
    "text": "query pageChargesQuery {\n  charges(first: 100) {\n    edges {\n      node {\n        brCode\n        customerEmail\n        product {\n          name\n          price\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
>>>>>>> a45ca66 (fix(ts): fix typos)
  }
};
})();

<<<<<<< HEAD
(node as any).hash = "dc036198533e7e3216a0b5fcdb4550e9";
=======
(node as any).hash = "7d7aac60bdd9bc951889f092e0822d57";
>>>>>>> a45ca66 (fix(ts): fix typos)

export default node;
