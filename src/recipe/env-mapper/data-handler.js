import Rx from 'rxjs/Rx'
import { Elm } from '../../Elm/Recipe/EnvMapper/Bridge'
const Bridge = Elm.Recipe.EnvMapper.Bridge

const initialModel = {
  placeholder: {
    namespace: 'my-namespace',
    cm: {
      name: 'new-cm',
      env: 'key=value\nkey2=value2'
    },
    secret: {
      name: 'new-secret',
      env: 'key=value\nkey2=value2'
    }
  }
}

const resultStream = new Rx.Subject().sampleTime(100)

const bridge = Bridge.worker()

function listener(results) {
  resultStream.next(results)
}

function startListening() {
  bridge.ports.echo.subscribe(listener)
}

function sendInput(msg) {
  bridge.ports.listen.send(msg)
}

const onChangeInput = (input) => {
  const transformedModel = _.chain(input).omit('namespace').mapValues(({ name, env }) => (
    { name, content: env, namespace: input.namespace }
  )).value()

  sendInput(transformedModel)
}

startListening(listener)

export { onChangeInput, initialModel, resultStream }