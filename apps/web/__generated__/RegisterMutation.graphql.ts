/**
 * @generated SignedSource<<ab5d68af0e44c45d6b3b1ae80b0498d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserRegisterInput = {
  clientMutationId?: string | null | undefined;
  email: string;
  password: string;
  username: string;
};
export type RegisterMutation$variables = {
  input: UserRegisterInput;
};
export type RegisterMutation$data = {
  readonly userCreate: {
    readonly error: string | null | undefined;
    readonly user: string | null | undefined;
  } | null | undefined;
};
export type RegisterMutation = {
  response: RegisterMutation$data;
  variables: RegisterMutation$variables;
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
    "concreteType": "UserRegisterPayload",
    "kind": "LinkedField",
    "name": "userCreate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "user",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
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
    "name": "RegisterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegisterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "559d1b86004f15df40ab817a581caf8f",
    "id": null,
    "metadata": {},
    "name": "RegisterMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterMutation(\n  $input: UserRegisterInput!\n) {\n  userCreate(input: $input) {\n    user\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "52e00c07bec87fb796f4f4db8fb7b2ea";

export default node;
