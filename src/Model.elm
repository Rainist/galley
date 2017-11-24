module Model exposing (Model, Contents, Results)

type alias Contents =
    { cm: String
    , secret: String
    }

type alias Results =
    { cm: String
    , secret: String
    , env: String
    }

type alias Model =
    { contents: Contents
    , results: Results
    }

