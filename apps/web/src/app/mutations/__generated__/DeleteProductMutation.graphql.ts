/**
 * @generated SignedSource<<22f3b782a25700c5183f1b33cf0c31a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProductDeleteInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type DeleteProductMutation$variables = {
  connections: ReadonlyArray<string>;
  input: ProductDeleteInput;
};
export type DeleteProductMutation$data = {
  readonly ProductDeleteMutation: {
    readonly error: string | null | undefined;
    readonly productId: string | null | undefined;
    readonly success: string | null | undefined;
  } | null | undefined;
};
export type DeleteProductMutation = {
  response: DeleteProductMutation$data;
  variables: DeleteProductMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "error",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "success",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "productId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteProductMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ProductDeletePayload",
        "kind": "LinkedField",
        "name": "ProductDeleteMutation",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DeleteProductMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ProductDeletePayload",
        "kind": "LinkedField",
        "name": "ProductDeleteMutation",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "productId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ca39a5f2db8a2ca69b3184a11fc5651b",
    "id": null,
    "metadata": {},
    "name": "DeleteProductMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteProductMutation(\n  $input: ProductDeleteInput!\n) {\n  ProductDeleteMutation(input: $input) {\n    error\n    success\n    productId\n  }\n}\n"
  }
};
})();

(node as any).hash = "f6e0d2e582566872b2c5d50638c1085b";

export default node;
