import Rx from "rxjs/Rx";

import { envMapper } from "galley-recipes";

const { generate } = envMapper;

const initialModel = {
  placeholder: {
    namespace: "my-namespace",
    cm: {
      name: "new-cm",
      env: "key=value\nkey2=value2"
    },
    secret: {
      name: "new-secret",
      env: "key=value\nkey2=value2"
    }
  }
};

const resultStream = new Rx.Subject();
const inputStream = new Rx.Subject().sampleTime(100);

function processOutput(output) {
  const { cm, secret, envSnippet, errMsg } = output;

  let result = { cm, secret, env: envSnippet };

  if (errMsg) {
    console.error(errMsg);
    result = { cm: errMsg, secret: errMsg, env: errMsg };
  }

  resultStream.next(result);
}

function trimAll(obj) {
  const keys = Object.keys(obj);

  for (const i in keys) {
    const k = keys[i];
    const val = obj[k];
    if (val) {
      obj[k] = val.trim();
    }
  }

  return obj;
}

inputStream.subscribe(input => {
  const {
    namespace,
    cm: { name: cmName, env: cmEnv },
    secret: { name: secretName, env: secretEnv }
  } = input;

  const output = generate(
    trimAll({ namespace, cmName, cmEnv, secretName, secretEnv })
  );

  processOutput(output);
});

const onChangeInput = input => {
  inputStream.next(input);
};

export { onChangeInput, initialModel, resultStream };
