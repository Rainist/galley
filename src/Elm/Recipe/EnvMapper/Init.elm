module Recipe.EnvMapper.Init exposing (cmEnvPH, initialInputs, initialModel, secretEnvPH)

import Recipe.EnvMapper.Model exposing (Model)
import Recipe.EnvMapper.Generator exposing (gen)


cmEnvPH =
    { name = "new-cm"
    , namespace = "your-namespace"
    , content = "CM_KEY1=cm-val1\nCM_KEY2=cm-val2"
    }


secretEnvPH =
    { name = "new-secret"
    , namespace = "your-namespace"
    , content = "SEC_KEY1=sec-val1\nSEC_KEY2=sec-val2"
    }


initialInputs =
    { cm = cmEnvPH
    , secret = secretEnvPH
    }


initialModel =
    { inputs = initialInputs
    , results = gen initialInputs
    }
