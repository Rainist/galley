module Update exposing (Msg(..), update)

import Model exposing (Model)
import Init exposing (initialContents)
import Pages.EnvVars.Generator exposing (gen)

type Msg
    = CMChange String
    | SecChange String

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let newModel =
        case msg of
            CMChange cm ->
                let
                    contents = model.contents
                in
                    { model | contents =
                          { contents | cm = cm }
                    }
            SecChange secret ->
                let
                    contents = model.contents
                in
                    { model | contents =
                          { contents | secret = secret }
                    }
    in
        let
            contents = newModel.contents
        in
            ( { newModel | results = gen contents }
            , Cmd.none )
