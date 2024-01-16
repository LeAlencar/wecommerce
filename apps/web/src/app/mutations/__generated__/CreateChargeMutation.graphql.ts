/**
 * @generated SignedSource<<8a116ec2637deffdae8f202b176966d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChargeCreateInput = {
  clientMutationId?: string | null | undefined;
  customerEmail: string;
  customerName: string;
  customerTaxID: string;
  product: string;
};
export type CreateChargeMutation$variables = {
  input: ChargeCreateInput;
};
export type CreateChargeMutation$data = {
  readonly ChargeCreateMutation: {
    readonly error: string | null | undefined;
    readonly node: {
      readonly brCode: string;
      readonly customerEmail: string;
      readonly customerName: string;
      readonly customerTaxID: string;
      readonly id: string;
    } | null | undefined;
    readonly success: string | null | undefined;
  } | null | undefined;
};
export type CreateChargeMutation = {
  response: CreateChargeMutation$data;
  variables: CreateChargeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ChargeCreatePayload",
    "kind": "LinkedField",
    "name": "ChargeCreateMutation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
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
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateChargeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateChargeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "115df15744f71474f7af34ec93440f25",
    "id": null,
    "metadata": {},
    "name": "CreateChargeMutation",
    "operationKind": "mutation",
    "text": "mutation CreateChargeMutation(\n  $input: ChargeCreateInput!\n) {\n  ChargeCreateMutation(input: $input) {\n    success\n    error\n    node {\n      id\n      brCode\n      customerName\n      customerTaxID\n      customerEmail\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d8f3d0d9370b2b6fd4ffeda3d9d9b250";

export default node;
