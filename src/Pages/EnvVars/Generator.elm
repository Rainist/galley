module Pages.EnvVars.Generator exposing (gen)

import Model exposing (Contents, Results)

gen : Contents -> Results
gen {cm, secret} =
    { cm = cm
    , secret = secret
    , env = cm ++ "\n" ++ secret
    }
