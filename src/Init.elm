module Init exposing (initialModel, initialContents, cmEnvPH, secretEnvPH)

import Model exposing (Model)
import Pages.EnvVars.Generator exposing (gen)

cmEnvPH =
    "CM_KEY1=cm-val1\nCM_KEY2=cm-val2"

secretEnvPH =
    "SEC_KEY1=sec-val1\nSEC_KEY2=sec-val2"

initialContents =
    { cm = cmEnvPH
    , secret = secretEnvPH
    }

initialModel =
    { contents = initialContents
    , results = gen initialContents
    }
