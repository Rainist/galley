module Recipe.EnvMapper.Model exposing (Inputs, Model, Results)


type alias ObjectInput =
    { name : String
    , namespace : String
    , content : String
    }


type alias Inputs =
    { cm : ObjectInput
    , secret : ObjectInput
    }


type alias Results =
    { cm : String
    , secret : String
    , env : String
    }


type alias Model =
    { inputs : Inputs
    , results : Results
    }
