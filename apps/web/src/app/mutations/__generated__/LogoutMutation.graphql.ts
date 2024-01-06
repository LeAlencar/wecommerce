/**
 * @generated SignedSource<<189290a6a426cc49719809c8bb8a7499>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserLogoutInput = {
  clientMutationId?: string | null | undefined;
};
export type LogoutMutation$variables = {
  input: UserLogoutInput;
};
export type LogoutMutation$data = {
  readonly userLogout: {
    readonly error: string | null | undefined;
    readonly success: string | null | undefined;
  } | null | undefined;
};
export type LogoutMutation = {
  response: LogoutMutation$data;
  variables: LogoutMutation$variables;
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
    "concreteType": "UserLogoutPayload",
    "kind": "LinkedField",
    "name": "userLogout",
    "plural": false,
    "selections": [
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
        "kind": "ScalarField",
        "name": "success",
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
    "name": "LogoutMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LogoutMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "10c7bf5d3a85190a2a370f061cc2ed3f",
    "id": null,
    "metadata": {},
    "name": "LogoutMutation",
    "operationKind": "mutation",
    "text": "mutation LogoutMutation(\n  $input: UserLogoutInput!\n) {\n  userLogout(input: $input) {\n    error\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "e7139af2e57720fd4329cbd7fb331921";

export default node;
